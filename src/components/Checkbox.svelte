<script lang="ts">
	import { onMount } from "svelte";

	export let value;

	let thisElement: HTMLDivElement;
	let thisCheckbox: HTMLInputElement;

	onMount(() => {
		thisElement.addEventListener("click", () => {
			thisCheckbox.checked = !thisCheckbox.checked;
		});
	});
</script>

<div class="checkbox-container" {...$$restProps} bind:this={thisElement}>
	<input type="checkbox" data-value={value} bind:this={thisCheckbox} />
	<slot></slot>
</div>

<style lang="scss">
	.checkbox-container {
		display: flex;
		flex-direction: row;
		gap: 5px;
	}

	input {
		pointer-events: none;
	}
</style>
