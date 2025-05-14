<script lang="ts">
    import RankOrdering from "./RankOrdering.svelte";
    import * as api from "$lib/fetchApi";
    import { onMount } from "svelte";

    let dataHouse: any[] = [];

    onMount(async () => {
        const res = await api.call(`/houseScores?order=ASC`);
        dataHouse = res.data;

    });

</script>


{#each dataHouse as user, i}
    <RankOrdering index={i}>
        <div style="width: 60%; text-align: left;">{user.name.charAt(0).toUpperCase() + user.name.slice(1)}</div>
    	<div>{user.value}</div>
    </RankOrdering>
{/each}


<style lang="scss">
    :global(.TEST){
        width: 60%;
        text-align: left;
    }
</style>