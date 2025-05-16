<script lang="ts">
	import { onMount } from "svelte";

	export let toggleSelector;

	let ThisHeaderSelection: HTMLElement;

	onMount(() => {
		if (toggleSelector) {
			toggleSelector.addEventListener("click", () => {
				if (ThisHeaderSelection?.getAttribute("open") === "true") {
					ThisHeaderSelection.setAttribute("open", "false");
				} else {
					ThisHeaderSelection.setAttribute("open", "true");
				}
			});
		}
	});
</script>

<div class="header-selection" bind:this={ThisHeaderSelection}>
	<slot></slot>
</div>

<style lang="scss">
	.header-selection {
		display: flex;
		flex-direction: column;
		gap: 5px;
		overflow: hidden;

		top: 0px;
		left: 0px;
		width: 100%;

		background: var(--bg);
		padding: 10px;

		opacity: 0;
		transition: all 0.2s ease-out;
		overflow: hidden;
		pointer-events: none;

		border-radius: 0px 0px var(--n-border-radius) var(--n-border-radius);
	}

	@for $i from 1 through 20 {
		:global(.header-selection[open="true"] > div:nth-child(#{$i}n)) {
			animation: slide-in 0.2s #{$i * 0.07}s ease-out forwards;
		}
	}

	:global(.header-selection[open="true"]) {
		opacity: 1;
		pointer-events: all;
	}

	:global(.header-selection) {
		:global(> div),
		:global(> :not(div) > div) {
			transition: all 0.2s ease-out;
			opacity: 0;
		}

		:global(> form) {
			display: flex;
			flex-direction: column;
			gap: 5px;
		}
	}
</style>
