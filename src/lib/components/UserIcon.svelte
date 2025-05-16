<script lang="ts">
	import User from "./Icons/User.svelte";
	export let data;
</script>

{#if data}
	<img class="profile-image" src={data} alt="Profile" />
{:else}
	<User></User>
{/if}
