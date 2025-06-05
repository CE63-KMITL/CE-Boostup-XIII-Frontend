<script lang="ts">
	import RankOrdering from "./RankOrdering.svelte";
	import * as api from "$lib/fetchApi";
	import { onMount, onDestroy } from "svelte";
	import BadgeBronze from "$lib/components/Icons/Badge_Bronze.svelte";
	import BadgeGold from "$lib/components/Icons/Badge_Gold.svelte";
	import BadgeSilver from "$lib/components/Icons/Badge_Silver.svelte";
	import List from "$lib/components/List.svelte";

	//-------------------------------------------------------
	// State Variables
	//-------------------------------------------------------
	let dataHouse: any[] = [];
	let selectedHouseData;
	let res;
	let intervalId: any;
	let maxScoreCalculated: number = 0;

	//-------------------------------------------------------
	// Event Handlers
	//-------------------------------------------------------
	function handleHouseClick(event) {
		selectedHouseData = event.detail;
	}

	//-------------------------------------------------------
	// Utility Functions
	//-------------------------------------------------------
	function imageHousePath(filename: string): string {
		return `/house-transparent/${filename}.png`;
	}

	async function fetchHouseScores() {
		try {
			res = await api.call(`/houseScores?orderBy=DESC`, { withToken: true });
		} catch (error) {
			console.error("Failed to fetch house scores:", error);
		}
	}

	function calculatePercentageWidth(currentScore: number, max: number, index: number): number {
		if (index === 0) return 100;
		if (max === 0) return 0;
		const percentage = (currentScore / max) * 100;
		return percentage;
	}

	//-------------------------------------------------------
	// Lifecycle Hooks
	//-------------------------------------------------------
	onMount(async () => {
		await fetchHouseScores();
		intervalId = setInterval(fetchHouseScores, 2000);
	});

	onDestroy(() => {
		if (intervalId) {
			clearInterval(intervalId);
		}
	});

	//-------------------------------------------------------
	// Reactive Statements
	//-------------------------------------------------------
	$: {
		if (res && Array.isArray(res.data)) {
			dataHouse = res.data;
			if (dataHouse.length > 0 && dataHouse[0]) {
				maxScoreCalculated = dataHouse[0].value;
			} else {
				maxScoreCalculated = 0;
			}
		} else {
			dataHouse = [];
			maxScoreCalculated = 0;
		}
	}
</script>

{#each dataHouse as house, index}
	<List class="house-list" on:select={handleHouseClick}>
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

		<img src={imageHousePath(house.name)} alt="House Icon" class="houseIcon" />
		<div class="info-container">
			<div class="houseName">
				{house.name.charAt(0).toUpperCase() + house.name.slice(1)}
			</div>
			<div class="score-container">
				<div
					class="score-bar"
					style="width: {calculatePercentageWidth(house.value, maxScoreCalculated, index)}%;"
				></div>
			</div>
		</div>
		<div class="score-value">{house.value}</div>
	</List>
{/each}

<style lang="scss">
	:global(.house-list) {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 12px;
		padding: 10px;
		height: 50px;
		background-color: var(--bg);
		align-items: center;
	}

	.houseName {
		width: 100px;
		text-align: left;
	}

	.score-container {
		position: relative;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding-inline-end: 3%;
		height: 20px;
	}

	.score-bar {
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		height: 60%;
		border-radius: 4px;
		z-index: 0;
		background-color: var(--status-done);
	}

	.score-value {
		position: relative;
		z-index: 1;
	}

	.houseIcon {
		display: flex;
		justify-content: center;
		transform: scale(1);
		margin-left: 20px;
		height: calc(100% + 20px);
	}

	.info-container {
		width: fill-available;
	}
</style>
