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
	import { runListAnimation } from "$lib/animation";
	import { scoreRefreshTrigger } from "../score";
	import Search from "$lib/components/Icons/Search.svelte";

	//-------------------------------------------------------
	// Stores
	//-------------------------------------------------------
	import { selectedHouseStore } from "../score";
	import { userData } from "$lib/auth.local";

	$selectedHouseStore = $userData.house;

	let headerTabs: { [key: string]: string } = { overall: "ทั้งหมด", house: "บ้าน", myHouse: "บ้านของฉัน" };
	let activeTab = "overall";
	let scrollElement;
	let searchText = "";
	let previousSearchText = "";

	//-------------------------------------------------------
	// Data Loading State
	//-------------------------------------------------------
	let page = 1;
	let maxPage: number | null = null;
	let users: (string | Record<string, any>)[] = [];
	let loading = false;
	let loadingMore = false;
	let typeDelay: any = null;

	//-------------------------------------------------------
	// Functions
	//-------------------------------------------------------
	async function selectTab(tabName: string) {
		activeTab = tabName;
		if (tabName === "overall") {
			page = 1;
			maxPage = null;
			users = [];
			loading = false;
		}
		if (maxPage && page > maxPage) return;
		loading = true;
		if (tabName === "overall") {
			await resetAndLoadData();
			previousSearchText = searchText;
		}
	}

	async function loadData() {
		if (loading && !loadingMore) return;
		if (loading && loadingMore) return;

		if (maxPage && page > maxPage && loadingMore) return;
		loading = true;

		let query = "";
		switch (activeTab) {
			case "overall":
				query = `orderByScore=true&searchText=${searchText}`;
				break;
			case "myHouse":
				if ($selectedHouseStore) {
					query = `orderByScore=true&house=${$selectedHouseStore.toLowerCase()}`;
				} else {
					loading = false;
					return;
				}
				break;
		}
		if (loadingMore) users = [...users, "loading"];
		else users = ["loading"];

		const result = await api.call(`/user/search?page=${page}&${query}`, {
			method: "GET",
			withToken: true,
		});
		users = [...users.slice(0, -1)];

		if (result) {
			if (loadingMore) {
				users = [...users, ...result.data];
			} else {
				users = [...result.data];
			}
			maxPage = result.totalPage;

			requestAnimationFrame(async () => {
				const elements = [];

				for (const res of result.data) {
					const element = document.getElementById(res.id);
					elements.push(element);
				}

				await runListAnimation(elements);
			});
		} else {
			users = [...users];
		}

		loading = false;
	}

	async function resetAndLoadData() {
		page = 1;
		maxPage = null;
		users = [];
		loading = false;
		loadingMore = false;
		await loadData();
	}

	async function loadMore() {
		if (loading) return;
		loadingMore = true;
		page++;
		await loadData();
		loadingMore = false;
	}

	//-------------------------------------------------------
	// Lifecycle
	//-------------------------------------------------------
	onMount(async () => {
		pagination(scrollElement, loadMore);
		previousSearchText = searchText;
		await selectTab("overall");
	});

	//-------------------------------------------------------
	// Reactive Statements
	//-------------------------------------------------------
	$: if (activeTab === "myHouse" && $selectedHouseStore) {
		resetAndLoadData();
	}

	$: if ($scoreRefreshTrigger !== null) {
		resetAndLoadData();
		if (activeTab === "overall") {
			previousSearchText = searchText;
		}
	}

	$: {
		if (activeTab === "overall") {
			if (searchText !== previousSearchText) {
				if (typeDelay) {
					clearTimeout(typeDelay);
				}
				typeDelay = setTimeout(async () => {
					await resetAndLoadData();
					previousSearchText = searchText;
				}, 250);
			}
		}
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
		<div class="sc-search-frame" in:azScale={{ delay: 250 }} out:azScale>
			<Search></Search>
			<input
				id="search"
				placeholder="ชื่อ / รหัสนักศึกษา"
				style="
				border: 0px;
				background-color: transparent;
				"
				bind:value={searchText}
			/>
		</div>
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

	.sc-search-frame {
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: var(--sc-bg);
		border: 1px solid var(--outline);
		padding: 0px;
		padding-inline: 10px;
		width: 100%;
		border-radius: 25px;
		top: 0;
		left: 0;
		position: sticky;
		z-index: 1;
	}
</style>
