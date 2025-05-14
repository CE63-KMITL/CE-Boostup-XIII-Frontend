<script lang="ts">
	import PopUp from "$lib/components/PopUp.svelte";
	import "../app.css";
	let { children } = $props();

	import { onMount } from "svelte";

	onMount(() => {});
</script>

<PopUp />
{@render children()}
