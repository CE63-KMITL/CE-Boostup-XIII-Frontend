<script lang="ts">
    import RankOrdering from "./RankOrdering.svelte";
    import * as api from "$lib/fetchApi";
    import { onMount } from "svelte";

    // MyHouse - get ข้อมูลของคนในบ้าน /house/ชื่อบ้าน
	// let houseScore = api.call(`/house/barbarian`);

    let dataMyHouse: any[] = [];
    let optionDropdown: any[] = [];
    let selectedOptionDropdown: string = "Barbarian";
    // const optionDropdown: { value: string; }[] = [
    // { value: 'Barbarian' }, { value: 'Rogue' }, { value: 'Sorcerer' },{ value: 'Bard' }, 
    // { value: 'Monk' }, { value: 'Paladin' }, { value: 'Wizard' }, { value: 'Priest' }, 
    // { value: 'Ranger' }, { value: 'Warlock' }, { value: 'Samurai' },
    // ];

    // let dataMyHouse = [
    // { name: "Veerapat Pirultham", studnetId: "67010852", score: 720 },
    // { name: "Nattapong Suksiri", studnetId: "67010853", score: 700 },
    // { name: "Kamonchai Lekbun", studnetId: "67010854", score: 680 },
    // { name: "Somsak Pradchaphet", studnetId: "67010855", score: 650 },
    // { name: "Patsorn Chaiyawan", studnetId: "67010856", score: 640 },
    // ];

    onMount(async () => {
        const house = await api.call(`/houseScores?order=ASC`);
        optionDropdown = house.data;

        const myHouse = await api.call(`/house/${selectedOptionDropdown.toLowerCase()}`)
        dataMyHouse = myHouse.users;

    });

</script>

<div class="myHouseLeaderboard">
    <select id="dropdown" bind:value={selectedOptionDropdown}>
        {#each optionDropdown as option}
            <option>{option.name.charAt(0).toUpperCase() + option.name.slice(1)}</option>
        {/each}
    </select>
    <!-- <p>{selectedOptionDropdown.toLowerCase()}</p> -->
</div>

{#each dataMyHouse as user, i}
    <RankOrdering index={i}>
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