import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { useMapEvents } from "react-leaflet";

import { City, Spot } from "@/types/types";
import config from "@/data/config.json";
import churchIcon from "@/assets/icon/church.svg";
import treeIcon from "@/assets/icon/tree.svg";
import foodIcon from "@/assets/icon/food.svg";
import cityIcon from "@/assets/icon/city.svg";
import jarIcon from "@/assets/icon/jar.svg";
import bedIcon from "@/assets/icon/bed.svg";

interface ICON {
	church: L.Icon;
	tree: L.Icon;
	food: L.Icon;
	city: L.Icon;
	jar: L.Icon;
	bed: L.Icon;
}

interface MAP {
	Alimentação: string;
	Natureza: string;
	Religioso: string;
	Atração: string;
	Hospedagem: string;
}

const map: MAP = {
	Alimentação: "food",
	Natureza: "tree",
	Religioso: "church",
	Atração: "jar",
	Hospedagem: "bed",
};

const icon: ICON = {
	church: new L.Icon({
		iconUrl: churchIcon,
		iconSize: new L.Point(40, 40),
		className: "leaflet-div-icon",
	}),
	tree: new L.Icon({
		iconUrl: treeIcon,
		iconSize: new L.Point(40, 40),
		className: "leaflet-div-icon",
	}),
	food: new L.Icon({
		iconUrl: foodIcon,
		iconSize: new L.Point(40, 40),
		className: "leaflet-div-icon",
	}),
	jar: new L.Icon({
		iconUrl: jarIcon,
		iconSize: new L.Point(40, 40),
		className: "leaflet-div-icon",
	}),
	city: new L.Icon({
		iconUrl: cityIcon,
		iconSize: new L.Point(60, 60),
		className: "leaflet-div-icon",
	}),
	bed: new L.Icon({
		iconUrl: bedIcon,
		iconSize: new L.Point(40, 40),
		className: "leaflet-div-icon",
	}),
};

interface ZoomProviderI {
	setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
}

function ZoomProvider(props: ZoomProviderI) {
	const mapEvents = useMapEvents({
		zoomend: () => {
			props.setZoomLevel(mapEvents.getZoom());
		},
	});
	return null;
}

interface SetCenterI {
	center: [number, number];
}

function SetCenter(props: SetCenterI) {
	const map = useMap();
	useEffect(() => {
		map.setView(props.center, config.cityZoom + 1);
	}, [props.center, map]);
	return null;
}

interface SetZoomI {
	zoom: number;
}

function SetZoom(props: SetZoomI) {
	const map = useMap();
	useEffect(() => {
		map.setZoom(props.zoom);
	}, [props.zoom, map]);
	return null;
}

interface MapI {
	center: [number, number];
	zoom: number;
	cities: City[];
	spots: Spot[];
}

export default function Map(props: MapI) {
	const [zoomLevel, setZoomLevel] = useState(props.zoom);

	return (
		<MapContainer center={props.center} zoom={props.zoom}>
			<SetCenter center={props.center} />
			<SetZoom zoom={props.zoom} />
			<ZoomProvider setZoomLevel={setZoomLevel} />
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{zoomLevel < config.cityZoom
				? props.cities.map((city) => (
						<Marker key={city.id} position={[city.coords.lat, city.coords.lon]} icon={icon["city"]}>
							<Popup>{city.name}</Popup>
						</Marker>
				  ))
				: props.spots.map((spot) => (
						<Marker
							key={spot.id}
							position={[spot.coords.lat, spot.coords.lon]}
							icon={icon[map[spot.type as keyof MAP] as keyof ICON]}>
							<Popup>{spot.name}</Popup>
						</Marker>
				  ))}
		</MapContainer>
	);
}
