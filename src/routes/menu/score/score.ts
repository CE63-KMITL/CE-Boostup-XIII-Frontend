import { pushState } from "$app/navigation";
import { writable, get } from "svelte/store";
import { updatePage } from "../pageManager";
import * as api from "$lib/fetchApi";

export const selectedIDStudent = writable<string | null>(null);
export const searchParams = writable<{ page: number}>({
    page: 1
});

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
        score: string | null;
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
        const data = await api.call(`/user/${selectedData.data.id}`, {
            withToken: true
        });

        // console.log("✅ ได้ข้อมูล:", res);
        // console.log("🧪 res:", res);
        // console.log("🧪 typeof res:", typeof res);
        // console.log("🧪 isObject:", typeof res === "object" && res !== null && !Array.isArray(res));

        // const data = await res.json();

        console.log("📦 json data:", data);

        selectData.set({
            row: selectedData.row,
            data: data
        });

        houseList.set(data);

        // Update for selectData to sync
        if (selectedData) {
            const update = data.find(h => h.id === selectedData.data.id)

            console.log("🔍 หา update house ใน data:", update);

            if (update) {
                selectData.set(update);
                console.log("✅ set selectData เป็น update เรียบร้อย");
            }
        }

        console.log("🏠 houseList ที่โหลดใหม่:", data);
        console.log("🔥 selectData ปัจจุบัน:", get(selectData));
        console.log("🏁 refreshHouseList() จบแล้ว");
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
export const selectedHouseStore = writable<string>('Barbarian');