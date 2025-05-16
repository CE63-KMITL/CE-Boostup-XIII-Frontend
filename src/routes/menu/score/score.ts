import { pushState } from "$app/navigation";
import { writable, get } from "svelte/store";
import { updatePage } from "../pageManager";
import * as api from "$lib/fetchApi";

export const selectedIDStudent = writable<string | null>(null);
export const searchParams = writable<{ page: number }>({
	page: 1,
});

export const popup = writable(null);

// -------------------------------------------------------
// ใช้ของผมเองค้าบบบ
// -------------------------------------------------------
export const selectData = writable<{
	row: number | null;
	data: {
		id: string | null;
		studentId: string | null;
		icon: string | null;
		house: string | null;
		role: string | null;
		email: string | null;
		name: string | null;
		score: number | null;
		rank: number | null;
		houseRank: number | null;
		houseScore: number | null;
		createdAt: string | null;
		updatedAt: string | null;
	};
} | null>(null);
export const houseList = writable([]);
export const scoreRefreshTrigger = writable(0);

export async function refreshHouseList() {
	console.log("🚦 เริ่ม refreshHouseList()");
	const selectedData = get(selectData);
	try {
		const data = await api.call(`/user/score-data/${selectedData.data.id}`, {
			withToken: true,
		});

		console.log(selectedData.data);

		selectData.set({
			row: selectedData.row,
			data: data,
		});

		console.log("📦 ข้อมูลใหม่ที่โหลด2:", data);
	} catch (error) {
		console.error("❌ Error fetching house list:", error);
	}
}
// -------------------------------------------------------

export function getStudentURL(id) {
	return `/menu?page=score&studentId=${id}`;
}

export function goToStudentURL(id) {
	const scurl = new URL(window.location.href);
	scurl.searchParams.set("studentId", id);
	pushState(scurl, null);
	updatePage("score");
}

//-------------------------------------------------------
// House Store
//-------------------------------------------------------
export const selectedHouseStore = writable<string>("Barbarian");
