import { useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";

import { City, Event, Spot } from "@/types/types";
import { useFetchData } from "@/hooks/useFetchData";
import DropdownOptions from "@/components/DropdownOptions";
import { MenuEntity, convertToMenuEntity } from "@/components/DropdownOptions/types";

import { CategoryCards, HomeContainer, MenuContainer, OpenCloseMenu } from "./styles";
import TouristCard from "@/components/TouristCard";
import Map from "@/components/Map";

export default function Home() {
	const [isOpen, setIsOpen] = useState(false);
	const [city, setCity] = useState<MenuEntity | null>(null);

	const { data: dataCities, status: statusCities } = useFetchData<City[]>(
		`${import.meta.env.VITE_API_URL}/cidades/nome`
	);
	const { data: dataSpots, status: statusSpots } = useFetchData<Spot[]>(`${import.meta.env.VITE_API_URL}/pontos`);
	const { data: dataEvents, status: statusEvents } = useFetchData<Event[]>(
		`${import.meta.env.VITE_API_URL}/eventos/${city ? `cidade/${city.id}` : ""}`
	);

	const toggleOpen = () => setIsOpen((isOpen) => !isOpen);

	const citiesMenu = dataCities?.map((city) => convertToMenuEntity(city, city.name));

	return (
		<HomeContainer>
			<Map />
			<MenuContainer $isOpen={isOpen.toString()}>
				<OpenCloseMenu $isOpen={isOpen.toString()} onClick={toggleOpen}>
					<MdKeyboardArrowUp className="icon" />
				</OpenCloseMenu>
				<div className="content">
					<div className="search-wrapper">
						<DropdownOptions
							placeholder="Nome da cidade..."
							items={citiesMenu ?? []}
							loading={statusCities != "success"}
							selected={city}
							setSelected={setCity}
							textInput
							direction={isOpen ? "bottom" : "top"}
						/>
					</div>
					<div className="content-wrapper">
						{isOpen && (
							<>
								<CategoryCards className="events">
									<p className="title">Eventos</p>
									{dataEvents != null && dataEvents.length > 0 ? (
										<div className="carrousel">
											{statusEvents != "loading" &&
												dataEvents?.map((event) => (
													<TouristCard
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
													<TouristCard key={spot.id} name={spot.name} city={spot.city} imageUrl={spot.imageUrl} />
												))}
										</div>
									) : (
										<p className="empty">Não há pontos turísticos registrados</p>
									)}
								</CategoryCards>
							</>
						)}
					</div>
				</div>
			</MenuContainer>
		</HomeContainer>
	);
}

