import { useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";

import DropdownOptions from "@/components/DropdownOptions";

import { CategoryCards, HomeContainer, MapContainer, MenuContainer, OpenCloseMenu } from "./styles";
import { MenuEntity } from "@/components/DropdownOptions/types";
import { useFetchData } from "@/hooks/useFetchData";

export default function Home() {
	const [isOpen, setIsOpen] = useState(true);
	const [city, setCity] = useState<MenuEntity | null>(null);

	const toggleOpen = () => setIsOpen((isOpen) => !isOpen);

	const { data } = useFetchData<MenuEntity[]>(`${import.meta.env.VITE_API_URL}/cidades/nome`);

	return (
		<HomeContainer>
			<MapContainer></MapContainer>
			<MenuContainer $isOpen={isOpen.toString()}>
				<OpenCloseMenu $isOpen={isOpen.toString()} onClick={toggleOpen}>
					<MdKeyboardArrowUp className="icon" />
				</OpenCloseMenu>
				<div className="search-wrapper">
					<DropdownOptions
						placeholder="Nome da cidade"
						items={data ?? []}
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

