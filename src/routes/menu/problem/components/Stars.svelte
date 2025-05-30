<script lang="ts">
	import Star from "$lib/components/Icons/Star.svelte";
	import StarTransparent from "$lib/components/Icons/StarTransparent.svelte";

	export let difficulty = 0;
</script>

<div class="difficulty">
	{#each Array(Math.floor(difficulty)) as _}
		<Star />
	{/each}
	{#each Array(5 - difficulty) as _}
		<StarTransparent />
	{/each}
</div>

<style lang="scss">
	.difficulty {
		color: var(--theme);
		font-size: 2rem;
		letter-spacing: 2px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 5px;
	}
</style>
