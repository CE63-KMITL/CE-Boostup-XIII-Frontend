<script lang="ts">
    import RankOrdering from "./RankOrdering.svelte";
    import * as api from "$lib/fetchApi";
    import { onMount } from "svelte";
    import UserIcon from "$lib/components/UserIcon.svelte";

    let dataMyHouse: any[] = [];
    let optionDropdown: any[] = [];
    let selectedOptionDropdown: string = "Barbarian";

    onMount(async () => {
        const house = await api.call(`/houseScores?order=ASC`);
        optionDropdown = house.data;
    });

    $: if (selectedOptionDropdown) {
        (async() => {
            const myHouse = await api.call(`/house/${selectedOptionDropdown.toLowerCase()}`)
            dataMyHouse = myHouse.users;
        })();
    }
</script>

<div class="myHouseLeaderboard">
    <select id="dropdown" bind:value={selectedOptionDropdown}>
        {#each optionDropdown as option}
            <option>{option.name.charAt(0).toUpperCase() + option.name.slice(1)}</option>
        {/each}
    </select>
</div>

{#each dataMyHouse as user, i}
    <RankOrdering index={i}>
        <UserIcon data={user.icon}></UserIcon>
        <div>{user.name}</div>
        <div>{user.studentId}</div>
        <div>{user.score}</div>
    </RankOrdering>
{/each}

<style lang="scss">
    .myHouseLeaderboard {
        display: flex;
        flex-direction: column;
        align-items: center;

        #dropdown {
            background-color: var(--list-bg);
            width: 40%;
            border: 0.5px solid var(--outline);
            border-radius: 20px;
            padding: 7px;
        }
    }

    

</style>