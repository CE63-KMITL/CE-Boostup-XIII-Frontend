<script lang="ts">
	export let min = 0;
	export let max = 100;
	export let step = 10;

	export let minValue = 50;
	export let maxValue = 100;

	let lastMin = minValue;
	let lastMax = maxValue;

	$: {
		if (lastMin !== minValue) {
			lastMin = minValue;
			if (minValue > maxValue) {
				maxValue = minValue;
			}
		}
		if (lastMax !== maxValue) {
			lastMax = maxValue;
			if (maxValue < minValue) {
				minValue = maxValue;
			}
		}
	}
</script>

<!-- 
------------------------------------------------------
HTML Structure
-------------------------------------------------------
-->
<div class="component">
	<div class="range_container">
		<div class="bg">
			<div
				class="range"
				style="position: absolute; left: {((minValue - min) / (max - min)) * 100}%; width: {((maxValue -
					minValue) /
					(max - min)) *
					100}%"
			></div>
		</div>
		<div class="sliders_control">
			<input id="fromSlider" type="range" bind:value={minValue} {min} {max} {step} />
			<input id="toSlider" type="range" bind:value={maxValue} {min} {max} {step} />
		</div>
	</div>
</div>

<!-- 
------------------------------------------------------
Styles
-------------------------------------------------------
-->
<style lang="scss">
	.component {
		padding: 10px;

		.range_container {
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 7px;
			justify-content: center;
			align-items: center;
			position: relative;

			.bg {
				background: var(--outline);
				display: flex;
				flex-direction: column;
				align-items: center;
				height: 100%;
				width: 100%;
				border-radius: 999px;

				.range {
					background: var(--theme);
					height: 100%;
					border-radius: 999px; // Added for consistency if range is shorter than bg
				}
			}

			.sliders_control {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				height: 100%;
				width: 100%;
				top: 0;
				position: absolute;

				input[type="range"] {
					appearance: none;
					-webkit-appearance: none;
					-moz-appearance: none; // For Firefox, to attempt to style the track further if needed
					pointer-events: none; // Make the input track non-interactive
					height: 0px; // Track is invisible
					width: 100%;
					position: absolute;
					background-color: transparent;
					border: 0;
					padding: 0px;
					margin: 0; // Ensure no default margins
				}

				input[type="range"]::-webkit-slider-thumb {
					appearance: none;
					-webkit-appearance: none;
					pointer-events: all; // Thumb is interactive
					width: 15px;
					height: 15px;
					border-radius: 50%;
					cursor: pointer;
					background: var(--theme);
					// The thumb will be vertically centered on the conceptual track line
				}

				input[type="range"]::-moz-range-thumb {
					appearance: none; // Usually not strictly needed for -moz-range-thumb styling itself
					pointer-events: all; // Thumb is interactive
					width: 15px;
					height: 15px;
					border-radius: 50%;
					cursor: pointer;
					background: var(--theme);
					border: none; // Remove default border for Firefox thumbs
				}

				// Hover effects for thumbs
				input[type="range"]::-webkit-slider-thumb:hover,
				input[type="range"]::-moz-range-thumb:hover {
					filter: brightness(1.15);
				}

				// Active effects for thumbs
				input[type="range"]::-webkit-slider-thumb:active,
				input[type="range"]::-moz-range-thumb:active {
					box-shadow:
						inset 0 0 3px #387bbe,
						0 0 9px #387bbe;
				}
			}
		}
	}
</style>
