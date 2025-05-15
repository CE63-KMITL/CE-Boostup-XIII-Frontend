<script lang="ts">
	//-------------------------------------------------------
	// Imports
	//-------------------------------------------------------
	import Frame from "$lib/components/Frame.svelte";
	import { azScale } from "$lib/transition";
	import Overall from "./Overall.svelte";
	import House from "./House.svelte";
	import MyHouse from "./MyHouse.svelte";
	import { pagination } from "$lib/paginaion";
	import { onMount } from "svelte";
	import * as api from "$lib/fetchApi";
	import { runProblemListAnimation } from "$lib/animation";

	//-------------------------------------------------------
	// Stores
	//-------------------------------------------------------
	import { selectedHouseStore } from "../score";

	let headerTabs: { [key: string]: string } = { overall: "Overall", house: "House", myHouse: "MyHouse" };
	let activeTab = "overall";
	let scrollElement;

	async function selectTab(tabName: string) {
		activeTab = tabName;

		page = 1;
		maxPage = null;
		users = [];
		loading = false;
		await loadData();
	}

	async function loadData() {
		if (loading) return;
		if (maxPage && page > maxPage) return;
		loading = true;

		let query = "";
		switch (activeTab) {
			case "overall":
				query = "orderByScore=true";
				break;
			case "myHouse":
				let houseValue = "";
				selectedHouseStore.subscribe((value) => {
					houseValue = value;
				})();
				query = `orderByScore=true&house=${houseValue.toLowerCase()}`;
				break;
		}

		users = [...users, "loading"];
		const result = await api.call(`/user/search?page=${page}&${query}`, {
			method: "GET",
			withToken: true,
		});
		users = [...users.slice(0, -1)];
		console.log(result);

		if (result) {
			users = [...users, ...result.data];
			maxPage = result.totalPage;

			requestAnimationFrame(async () => {
				const elements = [];

				for (const res of result.data) {
					const element = document.getElementById(res.id);
					elements.push(element);
				}

				await runProblemListAnimation(elements);
			});
		} else {
			users = [...users];
		}

		loading = false;
	}

	let page = 1;
	let maxPage = null;
	let users = [];
	let loading = false;

	async function loadMore() {
		if (loading) return;
		page++;
		await loadData();
	}

	onMount(() => {
		pagination(scrollElement, loadMore);
		loadData();
	});

	$: if (activeTab === "myHouse" && $selectedHouseStore) {
		page = 1;
		maxPage = null;
		users = [];
		loading = false;
		loadData();
	}
</script>

<Frame blur-bg {...$$restProps} class={"score-tab-container " + $$restProps.class}>
	{#each Object.keys(headerTabs) as headerId}
		<button
			class="tab-header"
			class:active={activeTab === headerId}
			on:click={() => selectTab(headerId)}
			style="{$$restProps.style}}"
		>
			{headerTabs[headerId]}
		</button>
	{/each}
</Frame>
<div class="scroll" bind:this={scrollElement}>
	{#if activeTab == "overall"}
		<div in:azScale={{ delay: 250 }} out:azScale>
			<Overall data={users}></Overall>
		</div>
	{:else if activeTab == "house"}
		<div in:azScale={{ delay: 250 }} out:azScale>
			<House></House>
		</div>
	{:else if activeTab == "myHouse"}
		<div in:azScale={{ delay: 250 }} out:azScale>
			<MyHouse dataMyHouse={users}></MyHouse>
		</div>
	{/if}
</div>

<style lang="scss">
	:global(div.score-tab-container) {
		display: flex;
		flex-direction: row;
		width: 97.2%;
		border-radius: 20px;
		overflow: hidden;
		padding: 0;
	}

	.tab-header {
		width: 100%;
		height: 100%;
		flex-grow: 1;
		padding: 10px;
		background-color: var(--bg);
		color: var(--text);
		cursor: pointer;
		font-weight: 600;
		transition: background-color 0.3s ease;
	}

	.tab-header:hover {
		background-color: var(--hover-list-bg);
	}

	.tab-header.active {
		background-color: var(--sc-tab);
		color: var(--sc-text-tab);
	}
	.scroll {
		padding: 1%;
		height: 100%;
		overflow-y: auto;
		overflow-x: hidden;
	}
</style>
