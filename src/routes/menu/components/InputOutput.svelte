<script lang="ts">
	import Button from "../../../components/Button.svelte";

	export let onRunCode = null;
	export let inputText = "";
	export let outputText = "";

	let outputElement: HTMLDivElement;

	$: {
		if (outputElement) {
			outputElement.innerText = outputText;
		}
	}
</script>

<div class="full mainFrame">
	<Button onclick={onRunCode} class="run">▷ รัน</Button>
	<div class="headText header">Input</div>
	<textarea class="input" placeholder="Input here" bind:value={inputText}></textarea>
	<div class="headText header">Output</div>
	<div class="output" placeholder="Output here" bind:this={outputElement}></div>
</div>

<style lang="scss">
	.mainFrame {
		display: flex;
		flex-direction: column;
		gap: 10px;
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
		line-height: 12px;
	}
</style>
