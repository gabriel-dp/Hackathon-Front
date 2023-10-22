import { MdCalendarMonth, MdAccessTime } from "react-icons/md";

import { CardContainer } from "./styles";
import { formatDateToDDMMYYYY, formatDateToHHmm } from "@/utils/dates";

interface CardI {
	name: string;
	imageUrl: string;
	city: string;
	dateStart?: string;
	dateEnd?: string;
}

export default function TouristCard(props: CardI) {
	return (
		<CardContainer>
			<div className="image-wrapper">
				<img src={props.imageUrl} />
			</div>
			<div className="description-wrapper">
				<p className="title">{props.name}</p>
				<p className="city">{props.city}</p>
				{props.dateStart && props.dateEnd && (
					<>
						<div className="details">
							<p>Início</p>
							<div>
								<MdCalendarMonth className="icon" />
								<p>{formatDateToDDMMYYYY(new Date(props.dateStart))}</p>
							</div>
							<div>
								<MdAccessTime className="icon" />
								<p>{formatDateToHHmm(new Date(props.dateStart))}</p>
							</div>
						</div>
						<div className="details">
							<p>Fim</p>
							<div>
								<MdCalendarMonth className="icon" />
								<p>{formatDateToDDMMYYYY(new Date(props.dateEnd))}</p>
							</div>
							<div>
								<MdAccessTime className="icon" />
								<p>{formatDateToHHmm(new Date(props.dateEnd))}</p>
							</div>
						</div>
					</>
				)}
			</div>
		</CardContainer>
	);
}

