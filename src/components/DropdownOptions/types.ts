import { Id, Entity } from "@/types/entity";

export interface MenuEntity {
	id: Id;
	text: string;
}

export function convertToMenuEntity<T extends Entity>(entity: T, text: string): MenuEntity {
	return { id: entity.id, text: text };
}
