<script lang="ts">
	import LoadingList from "$lib/components/LoadingList.svelte";
	import RankOrdering from "./RankOrdering.svelte";

	export let data;
</script>

{#each data as user, i}
	{#if user == "loading"}
		<LoadingList></LoadingList>
	{:else}
		<RankOrdering index={i} id={user.id}>
			<div>{user.name}</div>
			<div>{user.studentId}</div>
			<div>{user.house}</div>
			<div>{user.score}</div>
		</RankOrdering>
	{/if}
{/each}

<style lang="scss">
	:global(.OverallSize) {
		display: flex;
		background-color: var(--sc-bg);
	}
</style>
