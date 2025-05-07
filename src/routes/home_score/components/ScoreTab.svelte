<script lang="ts">
    import Frame from "../../../components/Frame.svelte";

    export let headers = {};
	export let activeTab: string;

    function selectTab(tabName: string) {
        activeTab = tabName;
    }
</script>

<Frame blur-bg {...$$restProps} class={"tab-container " + $$restProps.class}>
    <div class="tab-headers">
		{#each Object.keys(headers) as headerId}
			<button class="tab-header" class:active={activeTab === headerId} 
                on:click={() => selectTab(headerId)} style={$$restProps.style}}>
				{headers[headerId]}
			</button>
		{/each}
	</div>
</Frame>

<style lang="scss">
    :global(div.tab-container) {
		display: flex;
		flex-direction: column;
		width: 100%;
		border: 1px solid var(--outline);
		border-radius: 20px;
		overflow: hidden;
		padding: 0;
	}

    .tab-headers {
		display: flex;
		width: 100%;
		flex-shrink: 0;
		flex-wrap: wrap;
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
</style>