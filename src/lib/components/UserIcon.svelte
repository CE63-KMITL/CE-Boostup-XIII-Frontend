<script lang="ts">
	import User from "./Icons/User.svelte";
	export let data;
	export let name;

	function handleError() {
		data = "NONE";
	}
</script>

<div class="usericon">
	{#if data}
		<img src={data} alt={name ? name.slice(0, 4) + ".." : "UNNAMED"} onerror={handleError} />
	{:else}
		<User></User>
	{/if}
</div>

<style lang="scss">
	.usericon {
		aspect-ratio: 1/1;
		width: auto;
		height: 100%;
		border-radius: 50%;
		border: 1px solid var(--outline);
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;

		img {
			width: auto;
			height: 100%;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
