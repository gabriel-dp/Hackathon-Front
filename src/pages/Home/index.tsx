import { useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";

import { Event, TouristSpot } from "@/types/types";
import { useFetchData } from "@/hooks/useFetchData";
import DropdownOptions from "@/components/DropdownOptions";
import { MenuEntity } from "@/components/DropdownOptions/types";

import { CategoryCards, HomeContainer, MapContainer, MenuContainer, OpenCloseMenu } from "./styles";
import EventCard from "@/components/EventCard";

export default function Home() {
	const [isOpen, setIsOpen] = useState(false);
	const [city, setCity] = useState<MenuEntity | null>(null);

	const { data: dataCity, status: statusCity } = useFetchData<MenuEntity[]>(
		`${import.meta.env.VITE_API_URL}/cidades/nome`
	);
	const { data: dataSpots, status: statusSpots } = useFetchData<TouristSpot[]>(
		`${import.meta.env.VITE_API_URL}/pontos`
	);
	const { data: dataEvents, status: statusEvents } = useFetchData<Event[]>(
		`${import.meta.env.VITE_API_URL}/eventos/${city ? city.id : ""}`
	);

	const toggleOpen = () => setIsOpen((isOpen) => !isOpen);

	return (
		<HomeContainer>
			<MapContainer></MapContainer>
			<MenuContainer $isOpen={isOpen.toString()}>
				<OpenCloseMenu $isOpen={isOpen.toString()} onClick={toggleOpen}>
					<MdKeyboardArrowUp className="icon" />
				</OpenCloseMenu>
				<div className="search-wrapper">
					<DropdownOptions
						placeholder="Nome da cidade..."
						items={dataCity ?? []}
						loading={statusCity != "success"}
						selected={city}
						setSelected={setCity}
						textInput
						direction={isOpen ? "bottom" : "top"}
					/>
				</div>
				{isOpen && (
					<>
						<CategoryCards className="events">
							<p className="title">Eventos</p>
							{dataEvents != null && dataEvents.length > 0 ? (
								<div className="carrousel">
									{statusEvents != "loading" &&
										dataEvents?.map((event) => (
											<EventCard
												key={event.id}
												name={event.name}
												city={event.city}
												imageUrl={event.imageUrl}
												dateStart={event.dateStart}
												dateEnd={event.dateEnd}
											/>
										))}
								</div>
							) : (
								<p className="empty">Não há eventos agendados</p>
							)}
						</CategoryCards>
						<CategoryCards className="tourist">
							<p className="title">Pontos Turísticos</p>
							{dataSpots != null && dataSpots.length > 0 ? (
								<div className="carrousel">
									{statusSpots != "loading" &&
										dataSpots?.map((spot) => (
											<EventCard key={spot.id} name={spot.name} city={spot.city} imageUrl={spot.imageUrl} />
										))}
								</div>
							) : (
								<p className="empty">Não há pontos turísticos registrados</p>
							)}
						</CategoryCards>
					</>
				)}
			</MenuContainer>
		</HomeContainer>
	);
}

