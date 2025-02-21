<script lang="ts">
	export let style: Record<string, string> = {};
	export let className = "";
	export let hoverColor = "255, 255, 255, 0.1";

	export { className as class };

	const formatToHTMLStyleFromObject = (styleObj: Record<string, string>) => {
		return Object.entries(styleObj)
			.map(([key, value]) => `${key}: ${value};`)
			.join(" ");
	};

	$: styleHTML = formatToHTMLStyleFromObject(style);

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

				This_Button.style.transform = "scale(0.9)";
				clickedTimeout = setTimeout(() => {
					This_Button.style.transform = "";
				}, 100);
			});
		}
	});
</script>

<button
	style={`--hoverColor: rgba(${hoverColor}); ${styleHTML}`}
	class={`animation ${className}`}
	on:click
	bind:this={This_Button}
>
	<slot></slot>
	<div class="full animation button-filter"></div>
</button>

<style lang="scss">
	button {
		border: 1px solid var(--outline);
		background: var(--button-bg);
		border-radius: 10px;
		padding: 5px;
		user-select: none;
		position: relative;
		overflow: hidden;
	}

	button:hover {
		// transform: scale(1.02);

		.button-filter {
			opacity: 1;
		}
	}

	.button-filter {
		opacity: 0;
		position: absolute;
		background-color: var(--hoverColor);
	}

	/* -global- */
	// @keyframes -global-click {
	// 	0% {
	// 		transform: scale(1);
	// 	}
	// 	50% {
	// 		transform: scale(0.9);
	// 	}
	// 	100% {
	// 		transform: scale(1);
	// 	}
	// }
</style>
