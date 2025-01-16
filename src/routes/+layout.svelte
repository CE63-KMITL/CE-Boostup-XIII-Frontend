<script lang="ts">
	import "../app.css";
	let { children } = $props();

	import { onMount } from "svelte";

	onMount(() => {
		const URL_Params = new URLSearchParams(window.location.search);

		if (URL_Params.get("dark")) {
			localStorage.setItem("dark", URL_Params.get("dark"));
		}

		if (localStorage.getItem("dark") === "true") {
			document.documentElement.setAttribute("dark", "");
		} else {
			document.documentElement.removeAttribute("dark");
		}
	});
</script>

{@render children()}
