<script lang="ts">
    import Frame from "$lib/components/Frame.svelte";
	import { azScale } from "$lib/transition";
	import Overall from "./Overall.svelte";
    import House from "./House.svelte";
	import MyHouse from "./MyHouse.svelte";

    let headerTabs: { [key: string]: string } = 
        { overall: "Overall", house: "House", myHouse: "MyHouse"};
	let activeTab = "overall";

    function selectTab(tabName: string) {
        activeTab = tabName;
    }
</script>

<Frame blur-bg {...$$restProps} class={"score-tab-container " + $$restProps.class}>
	{#each Object.keys(headerTabs) as headerId}
		<button class="tab-header" class:active={activeTab === headerId} 
            on:click={() => selectTab(headerId)} style={$$restProps.style}}>
			{headerTabs[headerId]}
		</button>
	{/each}
</Frame>
<div class="scroll">
	 {#if activeTab == "overall"}
        <div class="leaderboard" in:azScale={{ delay: 250 }} out:azScale>
			<Overall></Overall>
        </div>
    {:else if activeTab == "house"}
        <div class="leaderboard" in:azScale={{ delay: 250 }} out:azScale>
            <House></House>
        </div>
    {:else if activeTab == "myHouse"}
        <div class="leaderboard" in:azScale={{ delay: 250 }} out:azScale>
            <MyHouse></MyHouse>
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
		background-color: var(--sc-button);
		color: var(--bg);
	}
	.scroll{
		padding: 1%;
		height: 88%;
		overflow-y: auto;
	}
</style>