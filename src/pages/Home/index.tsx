import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowUp, MdPerson, MdLocationOn } from "react-icons/md";

import { useFetchData } from "@/hooks/useFetchData";
import { City, Event, Spot } from "@/types/types";
import { MenuEntity, convertToMenuEntity } from "@/components/DropdownOptions/types";
import DropdownOptions from "@/components/DropdownOptions";
import TouristCard from "@/components/TouristCard";
import Map from "@/components/Map";
import { getGeolocationCoords, isDistanceLowerThan } from "@/utils/location";
import useLocalStorage from "@/hooks/useLocalStorage";

import config from "@/data/config.json";

import { CategoryCards, HomeContainer, LocationButton, MenuContainer, OpenCloseMenu, UserButton } from "./styles";

const generateHeaderUser = (userToken: string) => ({
	method: "POST",
	headers: {
		token: userToken,
	},
});

export default function Home() {
	const [auth] = useLocalStorage("auth", { token: null });
	const [isOpen, setIsOpen] = useState(false);
	const [selectedCity, setSelectedCity] = useState<MenuEntity | null>(null);
	const [center, setCenter] = useState<[number, number]>(config.defaultPosition as [number, number]);
	const [location, setLocation] = useState<[number, number] | null>(null);
	const zoom = config.defaultZoom;

	const { data: dataCities, status: statusCities } = useFetchData<City[]>(
		`${import.meta.env.VITE_API_URL}/cidades/nome`
	);
	const { data: dataSpots, status: statusSpots } = useFetchData<Spot[]>(
		`${import.meta.env.VITE_API_URL}/pontos/${selectedCity ? `cidade/${selectedCity.id}` : ""}`
	);
	const { data: dataEvents, status: statusEvents } = useFetchData<Event[]>(
		`${import.meta.env.VITE_API_URL}/eventos/${selectedCity ? `cidade/${selectedCity.id}` : ""}`
	);

	const toggleOpen = () => setIsOpen((isOpen) => !isOpen);

	useEffect(() => {
		if (dataCities && selectedCity) {
			const city = dataCities.find((city) => city.id == selectedCity.id);
			if (city) setCenter([city.coords.lat, city.coords.lon]);
		}
	}, [selectedCity, dataCities]);

	async function handleButtonClick() {
		const coords = await getGeolocationCoords();
		if (coords.length === 2) {
			setLocation(coords);
		} else {
			console.error("GEOLOCATION UNAVALIABLE");
			return;
		}
	}

	useEffect(() => {
		if (location && dataSpots) {
			setCenter(location);
			if (auth.token) {
				dataSpots.forEach((spot) => {
					if (isDistanceLowerThan(location, [spot.coords.lat, spot.coords.lon], 0.0025)) {
						console.log(location, [spot.coords.lat, spot.coords.lon]);
						fetch(`${import.meta.env.VITE_API_URL}/pontos/registrar/${spot.id}`, generateHeaderUser(auth.token))
							.then((response) => {
								if (!response.ok) {
									throw new Error(`Request failed with status: ${response.status}`);
								}
								if (response.status == 201) window.alert(`Parabéns por visitar ${spot.name}`);
							})
							.catch((error) => {
								console.log(error);
							});
					}
				});
			}
		}
	}, [location, dataSpots, auth]);

	return (
		<HomeContainer>
			<Map center={center} zoom={zoom} cities={dataCities ?? []} spots={dataSpots ?? []} />
			<UserButton>
				<Link to="/user">
					<MdPerson className="icon" />
				</Link>
			</UserButton>
			<LocationButton onClick={handleButtonClick}>
				<MdLocationOn className="icon" />
			</LocationButton>
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

