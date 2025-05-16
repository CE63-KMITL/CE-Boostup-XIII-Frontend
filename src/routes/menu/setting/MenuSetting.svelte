<script lang="ts">
	import { onMount } from "svelte";
	import Checkbox from "../../../lib/components/Checkbox.svelte";

	let dark;

	function changeTheme() {
		const url = new URL(window.location.href);
		dark = !dark;
		url.searchParams.set("dark", dark.toString());
		window.history.pushState({}, "", url.toString());

		localStorage.setItem("dark", url.searchParams.get("dark"));
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

<div class="container">
	<Checkbox onclick={changeTheme} selected={localStorage.getItem("dark") === "true"}>
		{#if !dark}
			Enable Dark Mode
		{:else}
			Disable Dark Mode
		{/if}
	</Checkbox>
</div>

<style lang="scss">
	.container {
		width: 100%;
		height: 80%;
		background-color: var(--bg-50);
		border-radius: 20px;
		box-shadow: 0 4px 24px var(--list-shadow);
		margin-top: 50px;
		margin-bottom: 30px;
		margin-left: 5%;
		margin-right: 5%;
		padding: 24px 16px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		max-width: 90%;
		min-width: 10%;
		box-sizing: border-box;

		:global([dark]) & {
			background-color: var(--bg-50);
			box-shadow: 0 4px 24px var(--list-shadow);
		}
	}
</style>
