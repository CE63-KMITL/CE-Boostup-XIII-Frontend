import { get, writable } from "svelte/store";
import { Role } from "./enum/role";

export const userData = writable({
	role: null,
	icon: null,
	name: null,
});

export function IsRole(role: Role) {
	const currentData = get(userData);

	if (currentData.role == role || currentData.role == Role.DEV) {
		return true;
	}
	return false;
}
