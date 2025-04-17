<script lang="ts">
	import { onMount } from "svelte";

	export let toggleSelector;

	let ThisHeaderSelection: HTMLElement;

	onMount(() => {
		const selectorList: any = [];

		for (const selector of ThisHeaderSelection.children) {
			console.log(selector.tagName);
			switch (selector.tagName) {
				case "FORM":
					selectorList.push(...selector.children);
					break;

				default:
					selectorList.push(selector);
					break;
			}
		}

		console.log(selectorList);

		async function show() {
			ThisHeaderSelection.setAttribute("open", "true");
			for (var i = 0; i < selectorList.length; i++) {
				const selector = selectorList[i];
				selector.style.animation = `slide-in 0.2s ${(i + 1) * 0.1}s ease-out forwards`;
			}
		}

		async function hide() {
			ThisHeaderSelection.setAttribute("open", "false");
			for (const selector of selectorList) {
				selector.style.animation = "";
			}
		}

		hide();

		console.log(toggleSelector);
		if (toggleSelector) {
			toggleSelector.addEventListener("click", () => {
				if (ThisHeaderSelection?.getAttribute("open") === "true") {
					hide();
				} else {
					show();
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

	@keyframes -global-slide-in {
		0% {
			margin-left: 10px;
			opacity: 0;
		}

		100% {
			margin-left: 0px;
			opacity: 1;
		}
	}
</style>
