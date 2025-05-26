<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import RunCodeStatus from "./RunCodeStatus.svelte";

	export let onRunCode = null;
	export let inputText = "";
	export let result = {
		exit_code: null,
		exit_status: null,
		output: null,
		used_time: null,
	};

	let outputElement: HTMLDivElement;

	$: {
		if (outputElement) {
			outputElement.innerHTML = result.output.replace(/ /g, "&nbsp;") || "";
		}
	}
</script>

<div class="full mainFrame">
	<Button onclick={onRunCode} class="run">▷ รัน</Button>
	<RunCodeStatus {result}></RunCodeStatus>
	<div class="headText header">Input</div>
	<textarea class="input" placeholder="Input here" bind:value={inputText}></textarea>
	<div class="headText header">Output</div>
	<div
		class="output"
		class:readable={result.exit_status != "SUCCESS"}
		placeholder="Output here"
		bind:this={outputElement}
	></div>
</div>

<style lang="scss">
	.headText {
		font-size: 1rem;
	}

	.mainFrame {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.header {
		font-weight: 500;
	}

	textarea,
	.output {
		overflow: auto;
		resize: vertical;
		height: 50%;
		white-space: pre;
	}

	.output:not(.readable) {
		line-height: 18px;
		font-family: initial;
	}
</style>
