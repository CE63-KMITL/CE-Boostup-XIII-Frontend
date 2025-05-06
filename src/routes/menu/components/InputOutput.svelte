<script lang="ts">
	import Button from "../../../components/Button.svelte";
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
			outputElement.innerText = result.output || "";
		}
	}
</script>

<div class="full mainFrame">
	<Button onclick={onRunCode} class="run">▷ รัน</Button>
	<div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center">
		<div style="display: flex; flex-direction: row; align-items: center; gap:10px; font-size: 1rem">
			<RunCodeStatus status={result.exit_status}></RunCodeStatus>
			{result.exit_status}
		</div>

		<div class="status-container">
			<div class="status">
				เวลาที่ใช้ : <div class="used-time">
					{result.used_time == null ? "-" : `${result.used_time} ms`}
				</div>
			</div>
			<div class="status">
				exit code: <div class="exit-code">{result.exit_code == null ? "-" : result.exit_code}</div>
			</div>
		</div>
	</div>

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
	.status-container {
		display: flex;
		gap: 10px;

		div {
			font-size: 1rem;
		}
	}

	.headText {
		font-size: 1rem;
	}

	.used-time,
	.exit-code {
		font-weight: 500;
		padding: 3px;
		background: var(--bg);
		border-radius: var(--n-border-radius);
		outline: 1px solid var(--outline);
	}

	.exit-code {
		color: var(--exit-code);
	}

	.used-time {
		color: var(--used-time);
	}

	.status {
		display: flex;
		text-align: end;
		flex-direction: row;
		gap: 5px;
		align-items: center;
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
		line-height: 12px;
		font-family: initial;
	}
</style>
