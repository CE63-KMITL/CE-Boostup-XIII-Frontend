<script lang="ts">
	import "../app.css";
	let { children } = $props();

	import { onMount } from "svelte";

	onMount(() => {});
</script>

{@render children()}
