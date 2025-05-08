<script lang="ts">
	export let hoverColor = "255, 255, 255, 0.1";
	export let filter = true;

	if (!$$restProps.style) $$restProps.style = "";
	$$restProps.style += `--hoverColor: rgba(${hoverColor});`;

	//--------------------------------------------------------

	let This_Button: HTMLElement;
	let clickedTimeout;
	export let onclick = null;

	import { onMount } from "svelte";
	// button click animation
	onMount(() => {
		if (This_Button) {
			This_Button.addEventListener("click", (e) => {
				if (onclick) onclick(e);

				if (clickedTimeout) {
					clearTimeout(clickedTimeout);
				}

				This_Button.style.transform = "scale(0.95)";
				clickedTimeout = setTimeout(() => {
					This_Button.style.transform = "";
				}, 100);
			});
		}
	});
</script>

<button {...$$restProps} class:filter bind:this={This_Button} on:click>
	<slot></slot>
</button>

<style lang="scss">
	button {
		width: 100%;
		padding: 12px;
		background: var(--button-bg);
		color: var(--button-bg-text);
		border: none;
		border-radius: 5px;
		font-size: 1rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.filter:hover {
		filter: brightness(1.15);
	}
</style>
