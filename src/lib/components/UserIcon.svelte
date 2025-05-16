<script>
	import User from "./Icons/User.svelte";

	export let data;
</script>

{#if data}
	<img src={data} alt="icon" class="usericon" />
{:else}
	<User></User>
{/if}

<style lang="scss">
	.usericon {
		aspect-ratio: 1/1;
		width: auto;
		height: 100%;
		border: 1px solid #ddd;
		border-radius: 50%;
	}
</style>
