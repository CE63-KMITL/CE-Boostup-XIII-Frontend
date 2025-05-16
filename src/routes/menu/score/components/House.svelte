<script lang="ts">
    import RankOrdering from "./RankOrdering.svelte";
    import * as api from "$lib/fetchApi";
    import { onMount } from "svelte";

    let dataHouse: any[] = [];

    function handleUserClick(event: CustomEvent<{ user: any }>) {
        const clickedUser = event.detail.user;
        console.log(clickedUser);
    }

    onMount(async () => {
        const res = await api.call(`/houseScores?order=ASC`);
        dataHouse = res.data;
    });

</script>

{#each dataHouse as house, i}
    <RankOrdering index={i} user={house} id={house.id} on:select={handleUserClick}>
        <div style="width: 40%; text-align: left;">{house.name.charAt(0).toUpperCase() + house.name.slice(1)}</div>
    	<div style="text-align: right;   padding-inline-end: 3%;" >{house.value}</div>
    </RankOrdering>
{/each}


<style lang="scss">
    :global(.nameHouse){
        width: 40%;
        text-align: left;
      
    }
</style>