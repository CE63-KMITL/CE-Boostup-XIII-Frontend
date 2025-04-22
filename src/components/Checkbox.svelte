<script lang="ts">
	import { onMount } from "svelte";

	export let onclick = null;
	export let onSelect = null;
	export let onUnselect = null;

	export let color = "var(--text)";
	export let selected = false;

	let thisElement: HTMLDivElement;
	let thisCheckbox: HTMLInputElement;

	onMount(() => {
		thisElement.addEventListener("click", () => {
			thisCheckbox.checked = !thisCheckbox.checked;

			if (thisCheckbox.checked) {
				if (onSelect) onSelect();
			} else {
				if (onUnselect) onUnselect();
			}

			if (onclick) onclick();
		});

		if (selected) thisElement.click();
	});
</script>

<div class="checkbox-container" style="--color : {color};" {...$$restProps} bind:this={thisElement}>
	<input type="checkbox" bind:this={thisCheckbox} />
	<span><slot></slot></span>
</div>

<style lang="scss">
	.checkbox-container {
		display: flex;
		flex-direction: row;
		gap: 5px;
		cursor: pointer;
		user-select: none;

		input {
			position: absolute;
			left: -9999px;
			&:checked + span {
				background-color: color-mix(in srgb, var(--color) 10%, transparent 100%);
				outline: 1px solid var(--color);

				&:before {
					box-shadow: inset 0 0 0 0.1em var(--bg);
					background: var(--color);
					outline: 2px solid var(--color);
				}
			}
		}

		span {
			display: flex;
			align-items: center;
			padding-inline: 10px;
			padding-block: 5px;
			border-radius: 99em;
			transition: 0.25s ease;
			outline: 0px solid transparent;
			color: var(--color);

			&:hover {
				background: var(--hover-list-bg);
				outline: 1px solid var(--color);
			}

			&:before {
				display: flex;
				flex-shrink: 0;
				content: "";
				background-color: var(--bg);
				width: 1em;
				height: 1em;
				border-radius: 1px;
				margin-right: 0.375em;
				transition: 0.25s ease;
				box-shadow: inset 0 0 0 0.125em var(--color);
				outline: 0px solid transparent;
			}
		}
	}

	input {
		pointer-events: none;
	}
</style>
