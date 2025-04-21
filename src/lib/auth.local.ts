import { Role } from "./enum/role";

export function IsRole(role: Role, data) {
	if (data.role == role || data.role == Role.DEV) {
		return true;
	}
	return false;
}
