<script lang="ts">
    import * as api from "$lib/fetchApi";
    import { showPopup } from "$lib/components/PopUp.svelte";

    export let getMethod: string;
    export let getData: {
        userId: string;
        amount: number;
        message: string;
    };

    async function callAddScore() {
        const scoreAdd = await api.call(`/user/score/add` , {
            method: "POST",
            data: getData,
            withToken: true
        });
        showPopup("เพิ่มคะแนนเรียบร้อยแล้วค่าา~ ヾ(≧▽≦*)o ");
    }

    async function callAddSubstract() {
        const scoreSubstract = await api.call(`/user/score/subtract` , {
            method: "POST",
            data: {getData},
            withToken: true
        });
        showPopup("ลบคะแนนเรียบร้อยแล้วค่าา~ `(*>﹏<*)′ ");
    }

    $: if (getMethod === "+") {
        callAddScore();
    } else if (getMethod === "-") {
        callAddSubstract();
    }
</script>