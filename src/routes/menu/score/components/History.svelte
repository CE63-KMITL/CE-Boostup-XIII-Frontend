<script lang="ts">
    import * as api from "$lib/fetchApi";
    import { onMount } from "svelte";
    import { userData } from "$lib/auth.local";

    let dataScoreHistory: any[] = []; 

    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString("th-TH",{ day: "2-digit", month: "2-digit" });
    }

    onMount(async () => {
        const scoreHistory = await api.call(`/user/score/${$userData.id}`);
        dataScoreHistory = scoreHistory.scoreLogs;

    });

</script>

{#each dataScoreHistory as data}
    <div class="sc-history-score-main">
        {#if data.amount < 0}
            <div style="color: var(--sc-minus);">{data.amount}</div>
        {:else if data.amount > 0}
            <div style="color: var(--sc-plus);">+{data.amount}</div>
        {/if}
        <div>{data.message}</div>
        <div id="sc-right-history">
            <span>{data.modifiedBy.name}</span>
            <span style="color: var(--sc-orangedark);" >{formatDate(data.date)}</span>
        </div>
    </div>
{/each}

<style lang="scss">
    .sc-history-score-main {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border: 1px solid var(--outline);
        margin-bottom: 10px;
        padding: 10px;
		border-radius: 10px;
        width: 100%;
        height: auto;

        #sc-right-history {
            display: flex;
            flex-direction: column;
            align-items: end;
        }
    }
</style>