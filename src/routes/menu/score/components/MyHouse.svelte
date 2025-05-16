<script lang="ts">
    import RankOrdering from "./RankOrdering.svelte";
    import * as api from "$lib/fetchApi";
    import { onMount } from "svelte";
    import UserIcon from "$lib/components/UserIcon.svelte";
    import { selectedHouseStore } from "../score";
    import { selectData } from "../score";

    export let dataMyHouse: any[] = [];

    let optionDropdown: any[] = [];

	let selectedMyHouseData;

    function handleHouseClick(event) {
        selectedMyHouseData = event.detail;
		selectData.set(event.detail);
        console.log(selectedMyHouseData);
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
    <RankOrdering index={i} id={user.id} user={user} on:select={handleHouseClick}>
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
