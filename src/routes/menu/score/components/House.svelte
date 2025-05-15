<script lang="ts">
    import RankOrdering from "./RankOrdering.svelte";
    import * as api from "$lib/fetchApi";
    import { onMount } from "svelte";

    let dataHouse: any[] = [];

    function handleUserClick(event: CustomEvent<{ user: any }>) {
        const clickedUser = event.detail.user;
        console.log(clickedUser);
    }

    function imageHousePath(filename: string): string {
        return `/house/${filename}.png`;
    }

    onMount(async () => {
        const res = await api.call(`/houseScores?order=ASC`);
        dataHouse = res.data;
    });

</script>

{#each dataHouse as house, i}
    <RankOrdering index={i} id={house.id} user={house} on:select={handleUserClick}>
        <div><img 
            src={imageHousePath(house.name)} 
            alt="House Icon" 
            class="houseIcon"/></div>
        <div 
            class="houseName">
            {house.name.charAt(0).toUpperCase() + 
            house.name.slice(1)}</div>
    	<div 
            style="
                text-align: right; 
                padding-inline-end: 3%;" >
            {house.value}</div>
    </RankOrdering>
{/each}

<style lang="scss">
    .houseName {
        min-width: 65%; 
        width: 100px; 
        text-align: left; 
        margin-left: 20px;
    }

</style>