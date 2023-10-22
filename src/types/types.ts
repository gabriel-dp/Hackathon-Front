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

export interface Spot extends Entity {
	name: string;
	coords: Coords;
	imageUrl: string;
	city: string;
	type: string;
}

export interface Achievment extends Entity {
	name: string;
	description: string;
	finishDate: string;
	isComplete: boolean;
	isConsumed: boolean;
}

export interface User {
	username: string;
	achievments: Achievment[];
}

