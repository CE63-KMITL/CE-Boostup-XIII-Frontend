import { pushState } from "$app/navigation";
import { writable } from "svelte/store";
import { updatePage } from "../pageManager";

export const selectedIDStudent = writable<string | null>(null);
export const searchParams = writable<{ page: number}>({
    page: 1
});

export const selectData = writable<{
    row: number;
    data: {
        id: string | null;
        studentId: string | null;
        icon: string | null;
        house: string | null;
        role: string | null;
        email: string | null;
        name: string | null;
        score: string | null;
        createdAt: string | null;
        updatedAt: string | null;
    };
} | null >(null);

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
export const selectedHouseStore = writable<string>('Barbarian');