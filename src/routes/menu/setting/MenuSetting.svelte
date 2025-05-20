<script lang="ts">
	import { onMount } from "svelte";
	import Checkbox from "../../../lib/components/Checkbox.svelte";
	import Frame from "$lib/components/Frame.svelte";
	import Fullscreen from "$lib/components/Fullscreen.svelte";

	let dark;

	function changeTheme() {
		dark = !dark;

		localStorage.setItem("dark", dark);
		if (localStorage.getItem("dark") === "true") {
			document.documentElement.setAttribute("dark", "");
		} else {
			document.documentElement.removeAttribute("dark");
		}
	}

	onMount(() => {
		dark = localStorage.getItem("dark") === "true";
	});
</script>

<div class="full component">
	<Frame blur-bg class="setting-containter full" margin={true}>
		<Checkbox onclick={changeTheme} selected={localStorage.getItem("dark") === "true"}>
			{#if !dark}
				Enable Dark Mode
			{:else}
				Disable Dark Mode
			{/if}
		</Checkbox>
	</Frame>
</div>

<style lang="scss">
	:global(.setting-containter) {
		padding: 10px;
		width: 90%;
		align-self: center;
	}
</style>
