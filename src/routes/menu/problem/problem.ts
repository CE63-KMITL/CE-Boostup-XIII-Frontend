import { pushState } from "$app/navigation";
import { writable } from "svelte/store";
import { updatePage } from "../pageManager";

/*
-------------------------------------------------------
Problem Store
-------------------------------------------------------
*/
export const selectedProblemId = writable<string | null>(null);
export const searchParams = writable({
	searchText: "",
	idReverse: false,
	tag: [],
	difficulty: null,
	minDifficulty: 0.5,
	maxDifficulty: 5,
	difficultySortBy: "ASC",
	status: null,
	page: 1,
	staff: false,
});

export function getToProblemURL(id) {
	return `/menu?page=code&problemId=${id}`;
}

export function getToCreateProblemURL(id) {
	return `/menu?page=create_problem&problemId=${id}`;
}

export function goToProblemURL(id) {
	const url = new URL(window.location.href);
	url.searchParams.set("problemId", id);
	pushState(url, null);
	updatePage("code");
}

export function goToCreateProblemURL(id) {
	const url = new URL(window.location.href);
	url.searchParams.set("problemId", id);
	pushState(url, null);
	updatePage("create_problem");
}
