export interface Problem {
	id: string;
	title: string;
	author: { name: string };
	description?: string;
	tags: string[];
	difficulty: 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
	status: "Done" | "In Progress" | "Not Started";
}

export const tagsColors: { [key: string]: string } = {
	"Basic I/O": "#a98a58",
	"If - else": "#d4b57c",
	Loop: "#8fbc8f",
	Array: "#9370db",
	Pattern: "#8b5f65",
};

export const statusColors: { [key: string]: string } = {
	"Not Started": "var(--status-not-started)",
	"In Progress": "var(--status-in-progress)",
	Done: "var(--status-done)",
};

export const statusText: { [key: string]: string } = {
	"Not Started": "ยังไม่ได้ลองทำ",
	"In Progress": "ลองทำแล้ว",
	Done: "ผ่านแล้ว",
};

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
	difficultyMin: 0,
	difficultyMax: 5,
	difficultySortBy: "ASC",
	status: null,
	page: 1,
});
