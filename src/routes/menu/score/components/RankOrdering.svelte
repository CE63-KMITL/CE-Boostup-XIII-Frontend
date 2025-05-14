<script lang="ts">
	import List from "$lib/components/List.svelte";
	import BadgeGold from "$lib/components/Icons/Badge_Gold.svelte";
	import BadgeSilver from "$lib/components/Icons/Badge_Silver.svelte";
	import BadgeBronze from "$lib/components/Icons/Badge_Bronze.svelte";
	import { createEventDispatcher } from "svelte";

	// let index: number = $$restProps?.index;
	export let index: number;
	export let id: string;
	export let user: any;

	// for sent event back Ja
	const dispatch = createEventDispatcher();

	// set event with user data
	function handleClick() { dispatch("select", {user}); }
</script>

<List class="listScores {index < 3 ? 'top' : ''}>" id={id}
	onclick={handleClick}>
	<div class:image={index <= 2}>
		{#if index == 0}
			<BadgeGold></BadgeGold>
		{:else if index == 1}
			<BadgeSilver></BadgeSilver>
		{:else if index == 2}
			<BadgeBronze></BadgeBronze>
		{:else}
			{String(+index + 1).padStart(2, "0")}
		{/if}
	</div>
	<slot></slot>
</List>

<style lang="scss">
	:global(.listScores) {
		display: flex;
		justify-content: space-between;
		margin-top: 12px;
		padding: 10px;
		height: 50px;
		background-color: var(--bg);
		:global(> div) {
			text-align: center;
			white-space: nowrap;

			&:nth-child(1) {
				width: 5%;
				min-width: 10%;
				max-width: 10%;
				z-index: 3;
			}
			&:nth-child(3) {
				width: 15%;
				min-width: 150px;
				min-width: 35%;
				text-overflow: ellipsis;
				overflow: hidden;
			}
			&:nth-child(4) {
				width: 15%;
			}
			&:nth-child(5) {
				width: 16%;
			}
			&:nth-child(6) {
				width: 8%;
			}
		}
	}

	.image {
		margin-top: -25px;
		display: flex;
		justify-content: center;
	}
</style>
