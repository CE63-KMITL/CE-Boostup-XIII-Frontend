<script lang="ts">
	import LoadingList from "$lib/components/LoadingList.svelte";
	import RankOrdering from "./RankOrdering.svelte";
	import UserIcon from "$lib/components/UserIcon.svelte";
	import { selectData } from "../score";

	export let data;

	let selectedUserData: { row: number; data: any } | null = null;

	function handleSelect(event) {
		selectedUserData = event.detail;
		selectData.set(event.detail);
	}
</script>

{#each data as user, i}
	{#if user == "loading"}
		<LoadingList></LoadingList>
	{:else}
		<RankOrdering index={i} {user} on:select={handleSelect} />
	{/if}
{/each}