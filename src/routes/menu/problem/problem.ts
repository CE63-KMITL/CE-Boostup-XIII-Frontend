import { writable } from "svelte/store";

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
