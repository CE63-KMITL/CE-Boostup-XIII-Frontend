<script lang="ts">
	import { fly } from "svelte/transition";
	import Button from "$lib/components/Button.svelte";
	import type { RunCodeResult } from "$lib/enum/runCode";
	import RunCodeStatus from "./RunCodeStatus.svelte";
	import Checkbox from "$lib/components/Checkbox.svelte";

	export let testCases: { input: string; isHiddenTestcase: boolean; result: RunCodeResult }[] = [];
	export let runAll = null;
	export let staff = false;
	export let removeTestCase = null;
</script>

<div class="testcases-list">
	<Button class="run-all" onclick={runAll}>{staff ? "▷ รันทั้งหมด" : "▷ ส่งโลด"}</Button>
	{#each testCases as testCase, index (testCase)}
		<div
			in:fly|global={{ x: 200, duration: 300, delay: 250 }}
			out:fly={{ x: 200, duration: 300 }}
			class="testcase-item"
		>
			<RunCodeStatus result={testCase?.result}></RunCodeStatus>
			<div class="testcaseHeader">
				<div class="testcase-label">Test case {index + 1}</div>
			</div>
			{#if staff}
				<Checkbox
					selected={testCase.isHiddenTestcase}
					onclick={() => {
						testCase.isHiddenTestcase = !testCase.isHiddenTestcase;
					}}
				>
					Hidden testcase
				</Checkbox>
			{/if}
			{#if !testCase.isHiddenTestcase || staff}
				<div class="testcase-details" class:isHiddenTestcase={testCase.isHiddenTestcase}>
					<div class="testcase-input">Input</div>
					<textarea class="input" bind:value={testCase.input}></textarea>
					<div class="testcase-output">Output</div>
					<textarea class="output" disabled>{testCase?.result?.output}</textarea>
				</div>
			{/if}
			<Button
				color="var(--bg)"
				hoverColor="var(--status-not-started)"
				textColor="var(--status-not-started)"
				outline="var(--status-not-started)"
				onclick={() => {
					if (removeTestCase) removeTestCase(index);
				}}>ลบ</Button
			>
		</div>
	{/each}
</div>

<style lang="scss">
	:global(.run-all) {
		position: sticky;
		top: 0;
	}
	.output {
		height: 200px;
	}
	textarea {
		resize: vertical;
	}
	.testcaseHeader {
		display: flex;
		align-items: center;
		gap: var(--n-gap);
	}
	.testcases-list {
		display: flex;
		flex-direction: column;
		gap: var(--n-gap);
	}
	/*
	-------------------------------------------------------
	Testcase Item Styles
	-------------------------------------------------------
	*/
	.testcase-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		background-color: var(--list-bg);
		border: 1px solid var(--outline);
		border-radius: var(--n-border-radius);
		padding: 10px;
		gap: var(--n-gap);
		width: 100%;
		box-sizing: border-box;
		flex-shrink: 0;
		overflow: isHiddenTestcase;
	}

	.testcase-item:last-child {
		margin-bottom: 10px;
	}

	.testcase-details {
		display: flex;
		flex-direction: column;
		gap: 5px;
		flex-grow: 1;
		overflow: isHiddenTestcase;
		width: 100%;
	}

	.testcase-label {
		font-weight: bold;
		color: var(--text);
	}

	.testcase-input,
	.testcase-output {
		font-size: 0.9em;
		color: var(--description);
		word-break: break-all;
	}
</style>
