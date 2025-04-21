<script lang="ts">
	export let hoverColor = "255, 255, 255, 0.1";

	$$restProps.style += `--hoverColor: rgba(${hoverColor});`;

	//--------------------------------------------------------

	let This_Button: HTMLElement;
	let clickedTimeout;

	import { onMount } from "svelte";
	// button click animation
	onMount(() => {
		if (This_Button) {
			This_Button.addEventListener("click", () => {
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

<button {...$$restProps} bind:this={This_Button}>
	<slot></slot>
</button>

<style lang="scss">
	button {
		width: 100%;
		padding: 12px;
		background: var(--theme-text);
		color: white;
		border: none;
		border-radius: 5px;
		font-size: 1rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;

		&:hover {
			background: #a78459;
		}
	}
</style>
