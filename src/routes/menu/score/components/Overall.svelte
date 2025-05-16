<script lang="ts">
	import LoadingList from "$lib/components/LoadingList.svelte";
	import RankOrdering from "./RankOrdering.svelte";
	import UserIcon from "$lib/components/UserIcon.svelte";
	import { selectData } from "../score";

	export let data;

	let selectedUserData: { row: number; data: any } | null = null;
	$: console.log(selectedUserData);

	function handleSelect(event) {
		selectedUserData = event.detail;
		selectData.set(event.detail);
	}
</script>

{#each data as user, i}
	{#if user == "loading"}
		<LoadingList></LoadingList>
	{:else}
		<RankOrdering index={i} id={user.id} {user} on:select={handleSelect}>
			<div class="usericon"><UserIcon data={user?.icon} /></div>
			<div>{user.name}</div>
			<div>{user.studentId}</div>
			<div>{user.house}</div>
			<div>{user.score}</div>
		</RankOrdering>
	{/if}
{/each}

<style>
	.usericon {
		width: 40px;
		height: 40px;
		aspect-ratio: 1/1;
	}
</style>
