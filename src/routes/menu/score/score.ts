import { pushState } from "$app/navigation";
import { writable } from "svelte/store";
import { updatePage } from "../pageManager";

export const selectedIDStudent = writable<string | null>(null);
export const searchParams = writable<{ page: number}>({
    page: 1
});

export function getStudentURL(id) {
    return `/menu?page=score&studentId=${id}`;
}

export function goToStudentURL(id) {
    const scurl = new URL(window.location.href);
    scurl.searchParams.set("studentId", id);
    pushState(scurl, null);
    updatePage("score");
}