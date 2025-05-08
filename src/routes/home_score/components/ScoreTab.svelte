<script lang="ts">
    import Frame from "$lib/components/Frame.svelte";
	import Overall from "./Overall.svelte";
	import type { OverallData } from "./Overall.svelte";
    import type { House } from "./House.svelte";
    import type { MyHouse } from "./MyHouse.svelte";
    
	let dataOverall: OverallData[] = [
    { name: "Veerapat Pirultham", id: "67010852", house: "bard", score: 700 },
    { name: "Nattapong Suksiri", id: "67010853", house: "mage", score: 680 },
    { name: "Kamonchai Lekbun", id: "67010854", house: "rogue", score: 660 },
    { name: "Somsak Pradchaphet", id: "67010855", house: "warrior", score: 640 },
    { name: "Patsorn Chaiyawan", id: "67010846", house: "healer", score: 620 },
    { name: "Patsorn Chaiyawan", id: "67010856", house: "healer", score: 620 },
    { name: "Patsorn Chaiyawan", id: "67010856", house: "healer", score: 620 },
    { name: "Patsorn Chaiyawan", id: "67010856", house: "healer", score: 620 },
    { name: "Patsorn Chaiyawan", id: "67010856", house: "healer", score: 620 },
    { name: "Patsorn Chaiyawan", id: "67010856", house: "healer", score: 620 },
    { name: "Patsorn Chaiyawan", id: "67010856", house: "healer", score: 620 },
    ];
    let dataHouse: House[] = [
    { house: "bard", score: 2750 },
    { house: "mage", score: 2600 },
    { house: "rogue", score: 2480 },
    { house: "warrior", score: 2405 },
    { house: "healer", score: 2380 },
    ];
    let dataMyHouse: MyHouse[] = [
    { name: "Veerapat Pirultham", id: "67010852", score: 720 },
    { name: "Nattapong Suksiri", id: "67010853", score: 700 },
    { name: "Kamonchai Lekbun", id: "67010854", score: 680 },
    { name: "Somsak Pradchaphet", id: "67010855", score: 650 },
    { name: "Patsorn Chaiyawan", id: "67010856", score: 640 },
    ];

    let headerTabs: { [key: string]: string } = 
        { overall: "Overall", house: "House", myHouse: "MyHouse"};
	let activeTab = "overall";

    function selectTab(tabName: string) {
        activeTab = tabName;
    }
</script>

<Frame blur-bg {...$$restProps} class={"tab-container " + $$restProps.class}>
	{#each Object.keys(headerTabs) as headerId}
		<button class="tab-header" class:active={activeTab === headerId} 
            on:click={() => selectTab(headerId)} style={$$restProps.style}}>
			{headerTabs[headerId]}
		</button>
	{/each}
</Frame>
<div class="scroll">
	 {#if activeTab == "overall"}
        <div class="leaderboard">
            {#each dataOverall as user, i}
				<Overall index={i} data={user} />
			{/each}
        </div>
    {:else if activeTab == "house"}
        <div class="leaderboard">
            houseeeeeeeeeeeeee
        </div>
    {:else if activeTab == "myHouse"}
        <div class="leaderboard">
            myhouseeeeeeeeeeeeee
        </div>
    {/if}
</div>

<style lang="scss">
    :global(div.tab-container) {
		display: flex;
		flex-direction: row;
		width: 100%;
		border-radius: 20px;
	}

	.tab-header {
		flex-grow: 1;
		padding: 10px;
		border: none;
		background-color: var(--list-bg);
		color: var(--text);
		cursor: pointer;
		font-size: 1em;
		font-weight: 600;
		transition: background-color 0.3s ease;
		border-bottom: 2px solid transparent;
		z-index: 1;
	}

    .tab-header:hover {
		background-color: var(--hover-list-bg);
	}

	.tab-header.active {
		background-color: var(--sc-button);
		color: var(--bg)
	}
	.scroll{
		padding: 1%;
		height: 90%;
		overflow-y: auto;
	}
</style>