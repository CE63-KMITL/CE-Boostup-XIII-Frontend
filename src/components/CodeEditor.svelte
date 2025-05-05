<script lang="ts">
	/*
	-------------------------------------------------------
	Imports
	-------------------------------------------------------
	*/
	import { initMonaco, Monaco, themes, type monaco } from "$lib/monaco";
	import { onDestroy, onMount } from "svelte";
	import Dropdown from "./Dropdown.svelte";

	/*
	-------------------------------------------------------
	Component State
	-------------------------------------------------------
	*/

	let selectedTheme: string = localStorage.getItem("codeEditorTheme") || "dracula";

	let editor: monaco.editor.IStandaloneCodeEditor;
	let editorElement;

	export let onChange = null;
	export let loadCode = null;
	export let saveCode = null;

	let autoSaveTimeout = null;

	/*
	-------------------------------------------------------
     Component Lifecycle
	-------------------------------------------------------
	*/

	// @ts-ignore
	onMount(async () => {
		let cCompletionProviderRegistration = await initMonaco();

		editor = Monaco.editor.create(editorElement, {
			value: "",
			language: "c",
			theme: selectedTheme,
			automaticLayout: true,
		});

		editor.onDidChangeModelContent(function () {
			if (onChange) {
				onChange(editor.getValue());
			}

			if (autoSaveTimeout) {
				clearTimeout(autoSaveTimeout);
			}

			autoSaveTimeout = setTimeout(
				async () => {
					if (saveCode) {
						await saveCode(editor.getValue());
					}
				},
				Number(localStorage.getItem("autoSaveDelay")) || 10000
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

	onbeforeunload = () => {
		if (saveCode) {
			saveCode(editor.getValue());
		}
	};

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
	<div class="controls">
		<Dropdown
			label="ธีม Code editor"
			options={themes}
			bind:selectedId={selectedTheme}
			on:change={handleThemeChange}
		/>
	</div>

	<div bind:this={editorElement} class="editor"></div>
</div>

<style>
	.editorContainer {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.controls {
		padding: 5px 10px;
		display: flex;
		flex-direction: row;
	}

	.editor {
		width: 100%;
		flex-grow: 1;
		min-height: 0;
		border-radius: 10px;
		overflow: hidden;
	}

	:global(.monaco-highlighted-label) {
		color: white;
	}

	:global(.monaco-editor) {
		padding-block: 10px;
	}
</style>
