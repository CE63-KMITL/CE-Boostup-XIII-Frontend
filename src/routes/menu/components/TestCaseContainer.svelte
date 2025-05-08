<script lang="ts">
	import { flip } from "svelte/animate";
	import { fly } from "svelte/transition";
	import Button from "$lib/components/Button.svelte";

	export let testCases;
	export let editable = false;
	export let runAll = null;
</script>

<div class="testcases-list">
	<Button onclick={runAll}>▷ รันทั้งหมด</Button>
	{#each testCases as testCase, index (testCase)}
		<div class="testcase-item">
			<div
				class="status-dot"
				class:pass={testCase.status == "Pass"}
				class:fail={testCase.status == "Not Pass"}
				class:error={testCase.status == "Error"}
			></div>
			<div class="testcase-details">
				<div class="testcase-label">Test case {index + 1}</div>
				<div class="testcase-input">
					Input :
					{#if editable}
						<textarea id="">
							{testCase.input}
						</textarea>
					{:else}
						{testCase.input}
					{/if}
				</div>
				<div class="testcase-output">Output : {testCase.output}</div>
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
	.testcases-list {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	/*
	-------------------------------------------------------
	Testcase Item Styles
	-------------------------------------------------------
	*/
	.testcase-item {
		display: flex;
		align-items: flex-start;
		background-color: var(--list-bg);
		border: 1px solid var(--outline);
		border-radius: var(--n-border-radius);
		padding: 10px;
		gap: 10px;
		width: 100%;
		box-sizing: border-box;
		flex-shrink: 0;
		overflow: hidden;
	}

	.testcase-item:last-child {
		margin-bottom: 10px;
	}

	.status-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		flex-shrink: 0;
		margin-top: 5px;
	}

	.status-dot.pass {
		background-color: var(--status-done);
	}

	.status-dot.fail {
		background-color: var(--status-not-started);
	}

	.testcase-details {
		display: flex;
		flex-direction: column;
		gap: 5px;
		flex-grow: 1;
		overflow: hidden;
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
