<script lang="ts">
	/*
	-------------------------------------------------------
	Imports
	-------------------------------------------------------
	*/
	import { initMonaco, Monaco, themes, type monaco } from "$lib/monaco";
	import { onDestroy, onMount } from "svelte";
	import Dropdown from "./Dropdown.svelte";
	import { flip } from "svelte/animate";
	import { fly } from "svelte/transition";
	import { azScale } from "$lib/transition";
	import { cubicOut } from "svelte/easing";

	/*
	-------------------------------------------------------
	Component State
	-------------------------------------------------------
	*/

	let selectedTheme: string = localStorage.getItem("codeEditorTheme") || "dracula";

	let editor: monaco.editor.IStandaloneCodeEditor;
	let editorElement;

	export let loadCode = null;
	export let saveCode = null;
	export let value = "";

	let autoSaveTimeout = null;

	/*
	-------------------------------------------------------
     Component Lifecycle
	-------------------------------------------------------
	*/
	let mounted = false;

	// @ts-ignore
	onMount(async () => {
		mounted = true;
		let cCompletionProviderRegistration = await initMonaco();

		editor = Monaco.editor.create(editorElement, {
			value: value,
			language: "c",
			theme: selectedTheme,
			automaticLayout: true,
			smoothScrolling: true,
		});

		editor.onDidChangeModelContent(function () {
			value = editor.getValue();

			if (autoSaveTimeout) {
				clearTimeout(autoSaveTimeout);
			}

			autoSaveTimeout = setTimeout(
				async () => {
					if (saveCode) {
						await saveCode(editor.getValue());
					}
				},
				Number(localStorage.getItem("autoSaveDelay")) || 500
			);
		});

		if (loadCode) {
			editor.setValue(await loadCode());
		}

		return () => {
			editor?.dispose();
			cCompletionProviderRegistration?.dispose();
		};
	});

	/*
	-------------------------------------------------------
	Reactive Theme Update
	-------------------------------------------------------
	*/
	$: {
		if (editor) {
			Monaco.editor.setTheme(selectedTheme);
		}
	}

	/*
	-------------------------------------------------------
	Event Handlers
	-------------------------------------------------------
	*/
	function handleThemeChange(event: CustomEvent<string>) {
		selectedTheme = event.detail;
		localStorage.setItem("codeEditorTheme", selectedTheme);
	}

	export function setValue(value: string) {
		editor?.setValue(value);
	}
</script>

<div class="editorContainer">
	{#if mounted}
		<div in:fly={{ x: -100, duration: 250, delay: 400, easing: cubicOut }} class="controls">
			<Dropdown
				label="ธีม Code editor"
				options={themes}
				bind:selectedId={selectedTheme}
				on:change={handleThemeChange}
			/>
		</div>

		<div
			in:azScale={{ duration: 300, delay: 500, easing: cubicOut }}
			bind:this={editorElement}
			class="monaco-editor editor"
		></div>
	{/if}
</div>

<style>
	.editorContainer {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.controls {
		padding: 5px 10px;
		display: flex;
		flex-direction: row;
	}

	.editor {
		padding-block: 10px;
		width: 100%;
		flex-grow: 1;
		min-height: 0;
		border-radius: 10px;
		overflow: hidden;
	}

	:global(.monaco-highlighted-label) {
		color: white;
	}
</style>
