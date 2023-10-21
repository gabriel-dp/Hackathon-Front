import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdCheck } from "react-icons/md";

import { stringIncludes, stringMatches } from "@/utils/strings";
import Searchbar from "@/components/Searchbar";

import { MenuEntity } from "./types";
import { DropdownContainer, DropdownHeader, DropdownContent, DropdownItem } from "./styles";

interface DropdownOptionsI {
	placeholder: string;
	items: MenuEntity[];
	selected: MenuEntity | null;
	setSelected: React.Dispatch<React.SetStateAction<MenuEntity | null>>;
	loading: boolean;
	textInput?: boolean;
	direction: string;
}

export default function DropdownOptions(props: DropdownOptionsI) {
	const [search, setSearch] = useState("");
	const [matchSearch, setMatchSearch] = useState<MenuEntity[]>(props.textInput ? [] : props.items);
	const [isOpen, setIsOpen] = useState(false);

	// Switches open/close menu state
	const toggleOpen = () => setIsOpen(!isOpen);

	// Triggers when click the clear input option
	const handleClearClick = () => {
		props.setSelected(null);
		if (props.textInput) {
			if (search == "") setIsOpen(false);
			setSearch("");
		}
	};

	// Triggers when click on a item
	const handleItemClick = (item: MenuEntity) => {
		props.setSelected(item);
		if (props.textInput) setSearch(item.text);
		setIsOpen(false);
	};

	// Controls which items will appear as options
	useEffect(() => {
		if (props.textInput) {
			// Opens menu when user is typing
			if (search != "" && (props.selected == null || !stringMatches(search, props.selected.text))) {
				setIsOpen(true);
			}

			// Clear selection if user edit when element was selected
			if (props.selected != null && !stringMatches(search, props.selected.text)) {
				props.setSelected(null);
			}

			setMatchSearch(props.items.filter((item) => stringIncludes(item.text, search)));
		}
	}, [search, props]);

	// Controls outside clicks
	const dropdownRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<DropdownContainer ref={dropdownRef}>
			<DropdownHeader onClick={toggleOpen} loading={props.loading.toString()}>
				{props.textInput ? (
					<Searchbar placeholder={props.placeholder} value={search} setValue={setSearch} />
				) : (
					<p>{props.selected ? props.selected.text : props.placeholder}</p>
				)}
				<div className="icon">
					{props.selected ? <MdCheck /> : isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
				</div>
			</DropdownHeader>
			{isOpen && (
				<DropdownContent direction={props.direction}>
					<DropdownItem className="clear" onClick={handleClearClick}>
						<p>-- Cancelar --</p>
					</DropdownItem>
					{matchSearch.map((item) => (
						<DropdownItem key={item.id} onClick={() => handleItemClick(item)}>
							<p>{item.text}</p>
						</DropdownItem>
					))}
				</DropdownContent>
			)}
		</DropdownContainer>
	);
}

