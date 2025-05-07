<script lang="ts">
	import Frame from "./Frame.svelte";

	export let headers = {};
	export let activeTab: string;

	function selectTab(tabName: string) {
		activeTab = tabName;
	}
</script>

<Frame blur-bg {...$$restProps} class={"tab-container " + $$restProps.class}>
	<div class="tab-headers">
		{#each Object.keys(headers) as headerId}
			<button class="tab-header" class:active={activeTab === headerId} on:click={() => selectTab(headerId)} style={$$restProps.style}}>
				{headers[headerId]}
			</button>
		{/each}
	</div>
	<div class="tab-content">
		<slot></slot>
	</div>
</Frame>

<style lang="scss">
	/*
	-------------------------------------------------------
	Tab Container Styles
	-------------------------------------------------------
	*/
	:global(div.tab-container) {
		display: flex;
		flex-direction: column;
		width: 100%;
		border: 1px solid var(--outline);
		border-radius: var(--n-border-radius);
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
		transition: background-color 0.2s ease;
		border-bottom: 2px solid transparent;
		outline: 1px solid var(--outline);
		z-index: 1;
	}

	.tab-header:hover {
		background-color: var(--hover-list-bg);
	}

	.tab-header.active {
		background-color: var(--selected-list-bg);
		border-bottom-color: var(--selected-list-outline);
	}

	.tab-content {
		flex-grow: 1;
		overflow-y: auto;
		padding: 10px;
		border-top: none;
		box-sizing: border-box;
	}
</style>
