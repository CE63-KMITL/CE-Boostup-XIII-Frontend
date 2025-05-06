import { pushState } from "$app/navigation";
import { get, writable } from "svelte/store";

export const items = writable({ code: "ทำโจทย์", problem: "โจทย์", score: "คะแนน" });

export let currentPage = writable("problem");

export const updatePage = (name) => {
	if (name == currentPage) return;
	let url = new URL(window.location.href);
	url.searchParams.set("page", name);
	currentPage.set(name);
	pushState(url, null);
	document.title = get(items)[get(currentPage)];
};
