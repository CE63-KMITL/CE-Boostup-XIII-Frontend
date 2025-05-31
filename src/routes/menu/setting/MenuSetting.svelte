<script lang="ts">
	import { onMount } from "svelte";
	import Checkbox from "../../../lib/components/Checkbox.svelte";
	import Frame from "$lib/components/Frame.svelte";
	import Fullscreen from "$lib/components/Fullscreen.svelte";

	let dark;
	let performance_mode;
	let vscode_editor;

	function changeTheme() {
		dark = !dark;

		localStorage.setItem("dark", dark);
		if (localStorage.getItem("dark") === "true") {
			document.documentElement.setAttribute("dark", "");
		} else {
			document.documentElement.removeAttribute("dark");
		}
	}

	function changePerformanceMode() {
		performance_mode = !performance_mode;

		localStorage.setItem("performance_mode", performance_mode);
		if (localStorage.getItem("performance_mode") === "true") {
			document.documentElement.setAttribute("performance_mode", "");
		} else {
			document.documentElement.removeAttribute("performance_mode");
		}
	}

	function changeEditor() {
		vscode_editor = !vscode_editor;

		localStorage.setItem("vscode_editor", vscode_editor);
	}

	onMount(() => {
		dark = localStorage.getItem("dark") === "true";
		performance_mode = localStorage.getItem("performance_mode") === "true";
		vscode_editor = localStorage.getItem("vscode_editor") != "false";
	});
</script>

<div class="full component">
	<Frame blur-bg class="setting-containter full" margin={true}>
		<Checkbox onclick={changeTheme} selected={localStorage.getItem("dark") === "true"}>Enable Dark Mode</Checkbox>
		<Checkbox onclick={changeEditor} selected={localStorage.getItem("vscode_editor") === "true"}>
			Enable VSCode Editor
		</Checkbox>
		<Checkbox onclick={changePerformanceMode} selected={localStorage.getItem("performance_mode") === "true"}>
			Enable Performance Mode
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
