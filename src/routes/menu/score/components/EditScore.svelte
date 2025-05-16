<script lang="ts">
    import * as api from "$lib/fetchApi";
    import { showPopup } from "$lib/components/PopUp.svelte";
    import { refreshHouseList, scoreRefreshTrigger, selectData } from "../score";
    import { onMount } from "svelte";
    import { get } from "svelte/store";

    export let getMethod: string;
    export let getData: {
        userId: string;
        amount: number;
        message: string;
    };

    let alreadyCalled = false;

    async function handleScore() {
        if (alreadyCalled) { return; }
        alreadyCalled = true;

        if (getMethod === "+") {
            await api.call(`/user/score/add` , {
                method: "POST",
                data: getData,
                withToken: true
            });
            showPopup("เพิ่มคะแนนเรียบร้อยแล้วค่าา~ ヾ(≧▽≦*)o ");
        } else if (getMethod === "-") {
                await api.call(`/user/score/subtract` , {
                method: "POST",
                data: getData,
                withToken: true
            });
            showPopup("ลบคะแนนเรียบร้อยแล้วค่าา~ `(*>﹏<*)′ ");
        }

        // Update list and selectData Jaaa
        await refreshHouseList();
        scoreRefreshTrigger.update((n) => n + 1);
        
        // call selectData to update his/her profile left side
 
    }

    onMount(() => {
        handleScore();
        console.log("🚀 EditScore ถูกโหลดแล้ว!");
    });

</script>