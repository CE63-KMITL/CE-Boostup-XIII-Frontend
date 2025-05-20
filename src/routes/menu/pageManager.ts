import { pushState } from "$app/navigation";
import { get, writable } from "svelte/store";

export const items = writable({ code: "ทำโจทย์", problem: "โจทย์", score: "คะแนน" });
export const names = { profile: "โปรไฟล์", setting: "ตั้งค่า" };
export const mobile = writable(false);

export let currentPage = writable("");

export const updatePage = (name, setState = true, clear = false) => {
	if (name == currentPage) return;
	let url = new URL(window.location.href);
	if (clear) {
		url.searchParams.forEach((value, key) => url.searchParams.delete(key));
	}
	url.searchParams.set("page", name);
	currentPage.set(name);
	if (setState) pushState(url, null);
	document.title = get(items)[get(currentPage)] ?? names[get(currentPage)] ?? "CE BOOST UP XIII";
};
