<script lang="ts">
	import "../app.css";
	let { children } = $props();

	import { onMount } from "svelte";

	onMount(() => {});
</script>

{@render children()}

<style lang="scss">
	:global(.list) {
		width: 100%;
		display: flex;
		flex-direction: row;
		overflow-y: auto;
		overflow-x: hidden;
		gap: 5px;
	}

	:global(.wrap),
	:global(.wrap-hidden) {
		display: flex;
		flex-direction: row;
		overflow-y: auto;
		overflow-x: hidden;
		flex-wrap: wrap;
		overflow: hidden;
	}

	:global(.wrap-hidden) {
		height: 100%;
	}

	:global(.list > div) {
		height: 100%;
		display: flex;
	}

	:global(.center) {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
