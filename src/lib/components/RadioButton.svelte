<script lang="ts">
	import { onMount } from "svelte";

	export let onclick = null;
	export let color = "var(--text)";
	export let selected = false;

	let thisElement: HTMLDivElement;
	let thisCheckbox: HTMLInputElement;
	let textContentElement: HTMLDivElement;

	onMount(() => {
		thisElement.addEventListener("click", () => {
			onclick?.();
		});
	});

	$: if (thisElement && textContentElement) {
		thisElement.title = textContentElement.textContent?.trim() || "";
	}
</script>

<div class="radio-container" style="--color : {color};" {...$$restProps} bind:this={thisElement}>
	<input type="checkbox" bind:this={thisCheckbox} bind:checked={selected} />
	<span>
		<div class="text-content" bind:this={textContentElement}><slot></slot></div>
	</span>
</div>

<style lang="scss">
	.radio-container {
		display: flex;
		flex-direction: row;
		cursor: pointer;

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
			overflow: hidden;

			&:hover {
				background: var(--hover-list-bg);
				outline: 1px solid var(--color);
			}

			&:before {
				display: inline-block;
				flex-shrink: 0;
				content: "";
				background-color: var(--bg);
				width: 1em;
				height: 1em;
				border-radius: 50%;
				margin-right: 0.375em;
				transition: 0.25s ease;
				box-shadow: inset 0 0 0 0.125em var(--color);
				outline: 0px solid transparent;
			}

			.text-content {
				flex: 1;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				color: var(--color);
			}
		}
	}
</style>
