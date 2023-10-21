import { useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";

import DropdownOptions from "@/components/DropdownOptions";
import dataCity from "@/data/cidades.json";

import { CategoryCards, HomeContainer, MapContainer, MenuContainer, OpenCloseMenu } from "./styles";
import { MenuEntity, convertToMenuEntity } from "@/components/DropdownOptions/types";

export default function Home() {
	const [isOpen, setIsOpen] = useState(true);
	const [city, setCity] = useState<MenuEntity | null>(null);

	const toggleOpen = () => setIsOpen((isOpen) => !isOpen);

	const cities = dataCity.cidades.map((city) => convertToMenuEntity(city, city.name));

	return (
		<HomeContainer>
			<MapContainer></MapContainer>
			<MenuContainer isOpen={isOpen.toString()}>
				<OpenCloseMenu isOpen={isOpen.toString()} onClick={toggleOpen}>
					<MdKeyboardArrowUp className="icon" />
				</OpenCloseMenu>
				<div className="search-wrapper">
					<DropdownOptions
						placeholder="Nome da cidade"
						items={cities}
						loading={false}
						selected={city}
						setSelected={setCity}
						textInput
						direction={isOpen ? "bottom" : "top"}
					/>
				</div>
				{isOpen && (
					<CategoryCards className="events">
						<p className="title">Eventos</p>
						<div className="carrousel"></div>
					</CategoryCards>
				)}
			</MenuContainer>
		</HomeContainer>
	);
}

