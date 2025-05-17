import { get, writable } from "svelte/store";
import { Role } from "./enum/role";

export const userData = writable({
	id: null,
	role: null,
	icon: null,
	name: null,
	studentId: null,
	score: null,
	house: null,
	rank: null,
	houseRank: null,
	houseScore: null,
	email: null,
});

export function IsRole(role: Role) {
	const currentData = get(userData);

	if (currentData.role == role || currentData.role == Role.DEV) {
		return true;
	}
	return false;
}
