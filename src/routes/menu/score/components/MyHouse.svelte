<script lang="ts">
    import RankOrdering from "./RankOrdering.svelte";
    import * as api from "$lib/fetchApi";
    import { onMount } from "svelte";
    import UserIcon from "$lib/components/UserIcon.svelte";
    import { userData } from "$lib/auth.local";
    import { selectedHouseStore } from "../score";

    export let dataMyHouse: any[] = [];
	// let dataMyHouse = [
	// 	{ icon: null, name: "Veerapat Pirultham", studentId: "67010852", house: "barbarian", score: 2700 },
	// 	{ icon: null, name: "Veerapat Pirultham", studentId: "67010852", house: "sorcerer", score: 1700 },
	// 	{ icon: null, name: "Veerapat Pirultham", studentId: "67010852", house: "rogue", score: 700 },
	// 	{ icon: null, name: "Veerapat Pirultham", studentId: "67010852", house: "wizard", score: 100 },
	// 	{ icon: null, name: "Veerapat Pirultham", studentId: "67010852", house: "bard", score: 30 },
	// 	{ icon: null, name: "Veerapat Pirultham", studentId: "67010852", house: "paladin", score: 1 },
	// 	{ icon: null, name: "Veerapat Pirultham", studentId: "67010852", house: "monk", score: 20 },
	// 	{ icon: null, name: "Veerapat Pirultham", studentId: "67010852", house: "samurai", score: 3300 },
	// 	{ icon: null, name: "Veerapat Pirultham", studentId: "67010852", house: "ranger", score: 7400 },
    // ];


    let optionDropdown: any[] = [];
    // let selectedOptionDropdown: string = "Barbarian";
    // let selectedOptionDropdown: string = $userData.house.charAt(0).toUpperCase() + $userData.house.slice(1);

    function handleUserClick(event: CustomEvent<{ user: any }>) {
        const clickedUser = event.detail.user;
        console.log(clickedUser);
    }

	onMount(async () => {
		const house = await api.call(`/houseScores?order=ASC`);
		optionDropdown = house.data;
	});
</script>

<div class="myHouseLeaderboard">
	<select id="dropdown" bind:value={$selectedHouseStore}>
		{#each optionDropdown as option}
			<option>{option.name.charAt(0).toUpperCase() + option.name.slice(1)}</option>
		{/each}
	</select>
</div>

{#each dataMyHouse as user, i}
    <RankOrdering index={i} id={user.id} user={user} on:select={handleUserClick}>
		<div><UserIcon data={user.icon}></UserIcon></div>
        <div>{user.name}</div>
        <div>{user.studentId}</div>
        <div style="text-align: right; padding-inline-end: 2%;">{user.score}</div>
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
