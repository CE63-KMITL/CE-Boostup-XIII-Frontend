<script lang="ts">
	import User from "./Icons/User.svelte";
	export let data;
	export let name;

	function handleError() {
		data = "ERROR";
	}
</script>

<div class="usericon">
	{#if data == "ERROR"}
		{#if name}
			<div class="usericon">
				{name ? name.slice(0, 1) : ""}
			</div>
		{:else}
			<User></User>
		{/if}
	{:else if data}
		<img src={data} alt="" onerror={handleError} />
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
		border: 1.5px solid var(--grayed);
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
