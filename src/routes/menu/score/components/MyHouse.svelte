<script lang="ts">
	import RankOrdering from "./RankOrdering.svelte";
	import * as api from "$lib/fetchApi";
	import { onMount } from "svelte";
	import UserIcon from "$lib/components/UserIcon.svelte";
	import { selectedHouseStore } from "../score";
	import { selectData } from "../score";
	import LoadingList from "$lib/components/LoadingList.svelte";
	import { IsRole, userData } from "$lib/auth.local";
	import { Role } from "$lib/enum/role";

	export let dataMyHouse: any[] = [];

	let optionDropdown: any[] = [];

	let selectedMyHouseData;

	function handleHouseClick(event) {
		selectedMyHouseData = event.detail;
		selectData.set(event.detail);
	}

	onMount(async () => {
		const house = await api.call(`/houseScores?orderBy=ASC`, { withToken: true });
		optionDropdown = house.data;
	});
</script>

{#if IsRole(Role.STAFF)}
	<div class="myHouseLeaderboard">
		<select id="dropdown" bind:value={$selectedHouseStore}>
			{#each optionDropdown as option}
				<option>{option.name.charAt(0).toUpperCase() + option.name.slice(1)}</option>
			{/each}
		</select>
	</div>
{/if}

{#each dataMyHouse as user, i}
	{#if user == "loading"}
		<LoadingList></LoadingList>
	{:else}
		<RankOrdering index={i} id={user.id} {user} on:select={handleHouseClick}>
			<div><UserIcon name={user.name} data={user.icon}></UserIcon></div>
			<div>{user.name}</div>
			<div>{user.studentId}</div>
			<div style="text-align: right; padding-inline-end: 2%;">{user.score}</div>
		</RankOrdering>
	{/if}
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
