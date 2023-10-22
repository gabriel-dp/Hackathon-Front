import { Entity } from "./entity";

export interface Coords {
	lat: number;
	lon: number;
}

export interface Event extends Entity {
	name: string;
	dateStart: string;
	dateEnd: string;
	imageUrl: string;
	city: string;
}

export interface City extends Entity {
	name: string;
	coords: Coords;
}

export interface TouristSpot extends Entity {
	name: string;
	coords: Coords;
	imageUrl: string;
	city: string;
}

