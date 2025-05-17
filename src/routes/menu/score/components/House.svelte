<script lang="ts">
	import RankOrdering from "./RankOrdering.svelte";
	import * as api from "$lib/fetchApi";
	import { onMount } from "svelte";

	let dataHouse: any[] = [];
	let selectedHouseData;
	let res;

	function handleHouseClick(event) {
		selectedHouseData = event.detail;
	}
	function imageHousePath(filename: string): string {
		return `/house-transparent/${filename}.png`;
	}

	onMount(async () => {
		res = await api.call(`/houseScores?orderBy=DESC`);
		dataHouse = res.data;
	});

	$: if (res) {
		dataHouse = res.data;
	}
</script>

{#each dataHouse as house, i}
	<RankOrdering index={i} id={house.id} user={house} on:select={handleHouseClick}>
		<div><img src={imageHousePath(house.name)} alt="House Icon" class="houseIcon" /></div>
		<div class="houseName">
			{house.name.charAt(0).toUpperCase() + house.name.slice(1)}
		</div>
		<div
			style="
                text-align: right; 
                padding-inline-end: 3%;"
		>
			{house.value}
		</div>
	</RankOrdering>
{/each}

<style lang="scss">
	.houseName {
		width: 100px;
		text-align: left;
		margin-left: 20px;
	}
</style>
