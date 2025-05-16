<script lang="ts">
	import List from "$lib/components/List.svelte";
	import BadgeGold from "$lib/components/Icons/Badge_Gold.svelte";
	import BadgeSilver from "$lib/components/Icons/Badge_Silver.svelte";
	import BadgeBronze from "$lib/components/Icons/Badge_Bronze.svelte";
	import { createEventDispatcher } from "svelte";
	import { azScale } from "$lib/transition";
	import { refreshHouseList } from "../score";
	import { IsRole, userData } from "$lib/auth.local";
	import { Role } from "$lib/enum/role";

	//let index: number = $$restProps?.index;
	export let index: number;
	export let id: string;
	export let user: any;

	// for sent event back Ja
	const dispatch = createEventDispatcher();

	// set event with user data
	function handleClick() {
		if (!IsRole(Role.STAFF) || user.role == "staff") return;

		dispatch("select", {
			row: index,
			data: user,
		});

		refreshHouseList();
	}
</script>

<List class="listScores {index < 3 ? 'top' : ''} {user.role == 'staff' ? 'staff' : ''}" {id} onclick={handleClick}>
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
		flex-direction: row;
		justify-content: space-between;
		margin-top: 12px;
		padding: 10px;
		height: 50px;
		background-color: var(--bg);
		align-items: center;
		// opacity: 0;

		:global(> div) {
			text-align: center;
			white-space: nowrap;

			&:nth-child(1) {
				width: 5%;
				min-width: 10%;
				max-width: 10%;
			}
			&:nth-child(2) {
				width: 5%;
				min-width: 40px;
				max-width: 10%;
			}
			&:nth-child(3) {
				width: 32%;
				text-overflow: ellipsis;
				overflow: hidden;
				text-align: left;
				padding-inline-start: 2%;
			}
			&:nth-child(4) {
				width: 15%;
			}
			&:nth-child(5) {
				width: 16%;
			}
			&:nth-child(6) {
				width: 8%;
				text-align: right;
				padding-inline-end: 2%;
			}
		}
	}

	:global(div.listScores.staff) {
		outline: 1px solid var(--used-time);
		background: color-mix(in srgb, var(--used-time), var(--bg) 80%) !important;
	}

	.image {
		margin-top: -10px;
		display: flex;
		justify-content: center;
	}

	:global(.houseIcon) {
		display: flex;
		justify-content: center;
		transform: scale(1);
		margin-top: -15px;
		margin-left: 20px;
	}
</style>
