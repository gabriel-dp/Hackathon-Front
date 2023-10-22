import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowUp, MdPerson } from "react-icons/md";

import { useFetchData } from "@/hooks/useFetchData";
import { City, Event, Spot } from "@/types/types";
import { MenuEntity, convertToMenuEntity } from "@/components/DropdownOptions/types";
import DropdownOptions from "@/components/DropdownOptions";
import TouristCard from "@/components/TouristCard";
import Map from "@/components/Map";

import { CategoryCards, HomeContainer, MenuContainer, OpenCloseMenu, UserButton } from "./styles";

export default function Home() {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedCity, setSelectedCity] = useState<MenuEntity | null>(null);
	const [center, setCenter] = useState<[number, number]>([-21.138599142642562, -44.26019280483018]);

	const { data: dataCities, status: statusCities } = useFetchData<City[]>(
		`${import.meta.env.VITE_API_URL}/cidades/nome`
	);
	const { data: dataSpots, status: statusSpots } = useFetchData<Spot[]>(
		`${import.meta.env.VITE_API_URL}/pontos/${selectedCity ? `cidade/${selectedCity.id}` : ""}`
	);
	const { data: dataEvents, status: statusEvents } = useFetchData<Event[]>(
		`${import.meta.env.VITE_API_URL}/eventos/${selectedCity ? `cidade/${selectedCity.id}` : ""}`
	);

	useEffect(() => {
		if (dataCities && selectedCity) {
			const city = dataCities.find((city) => city.id == selectedCity.id);
			if (city) setCenter([city.coords.lat, city.coords.lon]);
		}
	}, [selectedCity, dataCities]);

	const toggleOpen = () => setIsOpen((isOpen) => !isOpen);

	return (
		<HomeContainer>
			<Map center={center} cities={dataCities ?? []} spots={dataSpots ?? []} />
			<UserButton>
				<Link to="/user">
					<MdPerson className="icon" />
				</Link>
			</UserButton>
			<MenuContainer $isOpen={isOpen.toString()}>
				<OpenCloseMenu $isOpen={isOpen.toString()} onClick={toggleOpen}>
					<MdKeyboardArrowUp className="icon" />
				</OpenCloseMenu>
				<div className="content">
					<div className="search-wrapper">
						<DropdownOptions
							placeholder="Nome da cidade..."
							items={dataCities ? dataCities.map((city) => convertToMenuEntity(city, city.name)) : []}
							loading={statusCities != "success"}
							selected={selectedCity}
							setSelected={setSelectedCity}
							textInput
							direction={isOpen ? "bottom" : "top"}
						/>
					</div>
					<div className="content-wrapper">
						{isOpen && (
							<>
								<CategoryCards className="tourist">
									<p className="title">Pontos Turísticos</p>
									{dataSpots != null && dataSpots.length > 0 ? (
										<div className="carrousel">
											{statusSpots != "loading" &&
												dataSpots.map((spot) => (
													<TouristCard key={spot.id} name={spot.name} city={spot.city} imageUrl={spot.imageUrl} />
												))}
										</div>
									) : (
										<p className="empty">Não há pontos turísticos registrados</p>
									)}
								</CategoryCards>
								<CategoryCards className="events">
									<p className="title">Eventos</p>
									{dataEvents != null && dataEvents.length > 0 ? (
										<div className="carrousel">
											{statusEvents != "loading" &&
												dataEvents.map((event) => (
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
							</>
						)}
					</div>
				</div>
			</MenuContainer>
		</HomeContainer>
	);
}

