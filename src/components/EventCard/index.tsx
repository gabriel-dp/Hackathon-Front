import { MdCalendarMonth, MdAccessTime } from "react-icons/md";

import { CardContainer } from "./styles";
import { formatDateToDDMMYYYY, formatDateToHHmm } from "@/utils/dates";

interface CardI {
	title: string;
	city: string;
	image: string;
	date?: Date;
}

export default function EventCard(props: CardI) {
	return (
		<CardContainer>
			<div className="image-wrapper">
				<img src={props.image} />
			</div>
			<div className="description-wrapper">
				<p className="title">{props.title}</p>
				<p className="city">{props.city}</p>
				{props.date && (
					<div className="details">
						<div>
							<MdCalendarMonth className="icon" />
							<p>{formatDateToDDMMYYYY(props.date)}</p>
						</div>
						<div>
							<MdAccessTime className="icon" />
							<p>{formatDateToHHmm(props.date)}</p>
						</div>
					</div>
				)}
			</div>
		</CardContainer>
	);
}

