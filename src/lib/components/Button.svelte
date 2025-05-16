<script lang="ts">
	export let color = "var(--button-bg)";
	export let textColor = "var(--button-text)";
	export let outline = "transparent";
	export let hoverColor = "";

	export let filter = true;

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

<button
	{...$$restProps}
	class:filter
	class:hoverColor={hoverColor != ""}
	bind:this={This_Button}
	on:click
	style="--color : {color}; --text-color : {textColor}; --outline-color : {outline}; --hover-color : {hoverColor}"
>
	<slot></slot>
</button>

<style lang="scss">
	button {
		width: 100%;
		padding: 12px;
		background: var(--color);
		color: var(--text-color);
		border: none;
		border-radius: var(--n-border-radius);
		font-size: 1rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		outline: 1px solid var(--outline-color);
	}

	.filter:hover {
		filter: brightness(1.15);
	}

	.hoverColor:hover {
		background: color-mix(in srgb, var(--hover-color), var(--bg) 70%);
	}
</style>
