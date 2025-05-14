<script lang="ts">
	import { fade, fly } from "svelte/transition";
	import Button from "$lib/components/Button.svelte";
	import { RunCodeExitStatusEnum, type RunCodeResult } from "$lib/enum/runCode";
	import RunCodeStatus from "./RunCodeStatus.svelte";
	import Checkbox from "$lib/components/Checkbox.svelte";

	export let testCases: {
		input: string;
		isHiddenTestcase: boolean;
		expectOutput: string;
		result: RunCodeResult;
	}[] = [];
	export let runAll = null;
	export let editMode = false;
	export let removeTestCase = null;
</script>

<div class="testcases-list">
	<Button class="run-all" onclick={runAll}>{editMode ? "▷ รันทั้งหมด" : "▷ ส่ง"}</Button>
	{#each testCases as testCase, index (testCase)}
		<div
			in:fly|global={{ x: 200, duration: 300, delay: 250 }}
			out:fly={{ x: 200, duration: 300 }}
			class="testcase-item"
		>
			{#if !editMode}
				<div class="testcase-status-container">
					<div
						class:show={testCase?.result?.isPass == true}
						class="testcase-status"
						style="--color: var(--status-done)"
					>
						ผ่านแล้ว ( •̀ ω •́ )✧
					</div>
					<div
						class:show={testCase?.result?.isPass != true}
						class="testcase-status"
						style="--color: var(--status-not-started)"
					>
						ยังไม่ผ่าน (ಥ_ಥ)
					</div>
				</div>
			{/if}

			<!-- {/if} -->

			<RunCodeStatus result={testCase?.result}></RunCodeStatus>

			<div class="testcaseHeader">
				<div class="testcase-label">Test case {index + 1}</div>
			</div>
			{#if editMode}
				<Checkbox
					selected={testCase.isHiddenTestcase}
					onclick={() => {
						testCase.isHiddenTestcase = !testCase.isHiddenTestcase;
					}}
				>
					Hidden testcase
				</Checkbox>
			{/if}

			{#if !testCase.isHiddenTestcase || editMode}
				<div class="testcase-details" class:isHiddenTestcase={testCase.isHiddenTestcase}>
					<div class="testcase-input">Input</div>
					<textarea class="input" bind:value={testCase.input} disabled={!editMode}></textarea>
					<div class="testcase-output">Output</div>
					<textarea class="output" disabled>{testCase?.result?.output}</textarea>
					<div class="testcase-output">Expected Output</div>
					<textarea class="output" disabled>{testCase?.expectOutput}</textarea>
				</div>
			{/if}

			{#if editMode}
				<Button
					color="var(--bg)"
					hoverColor="var(--status-not-started)"
					textColor="var(--status-not-started)"
					outline="var(--status-not-started)"
					onclick={() => {
						if (removeTestCase) removeTestCase(index);
					}}>ลบ</Button
				>
			{/if}
		</div>
	{/each}
</div>

<style lang="scss">
	.testcase-status-container {
		width: 100%;
		position: relative;
		top: 0;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;

		.testcase-status {
			color: var(--color);
			font-weight: 700;
			width: 0;
			text-align: center;
			background: color-mix(in srgb, var(--color), transparent 90%);
			border-radius: var(--n-border-radius);
			outline: 1px solid var(--color);
			padding: 5px;
			position: absolute;
			transition: all 0.2s;
			opacity: 0;
			top: 0;

			&.show {
				opacity: 1;
				width: 100%;
			}
		}
	}

	:global(.run-all) {
		position: sticky;
		top: 0;
		z-index: 1;
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
