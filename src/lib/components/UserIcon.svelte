<script lang="ts">
	import User from "./Icons/User.svelte";
	export let data;
</script>

{#if data}
	<img class="profile-image" src={data} alt="Profile" />
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
