<script lang="ts">
	import List from "$lib/components/List.svelte";
	import BadgeGold from "$lib/components/Icons/Badge_Gold.svelte";
	import BadgeSilver from "$lib/components/Icons/Badge_Silver.svelte";
	import BadgeBronze from "$lib/components/Icons/Badge_Bronze.svelte";
	import { createEventDispatcher } from "svelte";
	import { refreshHouseList } from "../score";
	import { IsRole, userData } from "$lib/auth.local";
	import { Role } from "$lib/enum/role";
	import UserIcon from "$lib/components/UserIcon.svelte";
	import Star from "$lib/components/Icons/Star.svelte";

	//let index: number = $$restProps?.index;
	export let index: number;
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

<List
	class="listScores {index < 3 ? 'top' : ''} {user.role == 'staff' ? 'staff' : ''} {user.house == '' ||
	user.house == null
		? 'noHouse'
		: ''}"
	id={user.id}
	onclick={handleClick}
>
	<div class="ranking" class:image={index <= 2}>
		{#if index == 0}
			<BadgeGold></BadgeGold>
		{:else if index == 1}
			<BadgeSilver></BadgeSilver>
		{:else if index == 2}
			<BadgeBronze></BadgeBronze>
		{:else}
			{String(+index + 1).padStart(3, "0")}
		{/if}
	</div>

	<div class="usericon"><UserIcon name={user.name} data={user?.icon} /></div>

	<div class="rank-info">
		<div class="rank-info-top">
			<div class="name">{user.name}</div>
			<div class="studentId">{user.studentId}</div>
			<div class="house">{user.house}</div>
		</div>

		<div class="rank-info-bottom">
			{JSON.stringify(user?.passed)}
			{#if user?.passed}
				{#each Object.entries(user.passed) as [stageKey, stageValue]}
					<div class="passed-star">
						<b>
							{stageKey}
						</b>
						<Star /> :
						{stageValue}
					</div>
				{/each}
			{/if}
		</div>
	</div>

	<div class="score">{user.score}</div>
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
		opacity: 0;

		.rank-info {
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 100%;
		}

		.rank-info > div {
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}

		.ranking {
			width: 5%;
			min-width: 10%;
			max-width: 10%;
		}
		.usericon {
			min-width: 40px;
			max-width: 10%;
			width: 40px;
			height: 40px;
			aspect-ratio: 1/1;
		}
		.name {
			width: 32%;
			text-overflow: ellipsis;
			overflow: hidden;
			text-align: left;
			padding-inline-start: 2%;
		}
		.studentId {
			width: 15%;
			min-width: 100px;
		}
		.house {
			width: 16%;
		}
		.score {
			width: 8%;
			text-align: right;
			padding-inline-end: 2%;
		}

		:global(.rank-info-top div) {
			text-align: center;
			white-space: nowrap;
		}

		.passed-star {
			display: flex;
			gap: 5px;
			align-items: center;
			justify-content: center;
			flex-direction: row;
			height: 50%;
			border-radius: var(--n-border-radius);
			outline: 1px solid var(--theme);
		}
	}

	:global(div.listScores.staff) {
		outline: 1px solid var(--used-time);
		background: color-mix(in srgb, var(--used-time), var(--bg) 80%) !important;
	}

	:global(div.listScores.noHouse:not(.staff)) {
		outline: 1px solid var(--grayed);
		background: color-mix(in srgb, var(--grayed), var(--bg) 80%) !important;
	}

	.image {
		margin-top: -10px;
		display: flex;
		justify-content: center;
	}
</style>
