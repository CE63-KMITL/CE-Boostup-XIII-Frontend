<script lang="ts">
	import { userData } from "$lib/auth.local";
	import { onDestroy, onMount } from "svelte";
	import Button from "../../../components/Button.svelte";
	import CodeEditor from "../../../components/CodeEditor.svelte";
	import Frame from "../../../components/Frame.svelte";

	/*
	-------------------------------------------------------
	Component State
	-------------------------------------------------------
	*/
	let isMobileHorizon = false;
	let isVertical = false;

	const testCases = [
		{ input: "xx xx xx", output: "xx" },
		{ input: "xx xx xx", output: "xx" },
		{ input: "xx xx xx", output: "xx" },
		{ input: "xx xx xx", output: "xx" },
		{ input: "xx xx xx", output: "xx" },
		{ input: "xx xx xx", output: "xx" },
		{ input: "xx xx xx", output: "xx" },
		{ input: "xx xx xx", output: "xx" },
		{ input: "xx xx xx", output: "xx" },
		{ input: "xx xx xx", output: "xx" },
	];

	const description = "รายละเอียดโจทย์...";

	let activeTab = "details";

	/*
	-------------------------------------------------------
	Event Handlers
	-------------------------------------------------------
	*/
	function checkVertical() {
		let mobile = false,
			horizon = false,
			vertical = false;
		window.innerHeight < 1000 && window.innerWidth < 1000 ? (mobile = true) : false;
		window.innerWidth > window.innerHeight ? (horizon = true) : false;
		window.innerWidth < 1100 && window.innerHeight > window.innerWidth ? (vertical = true) : false;

		isMobileHorizon = mobile && horizon;
		isVertical = vertical;
	}

	function getTestcaseStatus(index) {
		return index % 2 === 0 ? "pass" : "fail";
	}

	/*
	-------------------------------------------------------
	Lifecycle
	-------------------------------------------------------
	*/
	onMount(() => {
		if (typeof window === "undefined") return;
		checkVertical();
		window.addEventListener("resize", checkVertical);
		window.addEventListener("orientationchange", checkVertical);
	});

	onDestroy(() => {
		if (typeof window === "undefined") return;
		window.removeEventListener("resize", checkVertical);
		window.removeEventListener("orientationchange", checkVertical);
	});

	function onEditorChange(text) {
		console.log(text);
	}
</script>

<div class="full mainFrame">
	<Frame blur-bg class="ProblemContainer">
		<div class="WrapButton">
			<Button class="Run">▷ รัน</Button>
			<Button class="Submit">ส่ง</Button>
		</div>
		<CodeEditor onChange={onEditorChange}></CodeEditor>
	</Frame>

	<Frame blur-bg class="InfoAndTestcaseBox">
		<div class="tab-container">
			<div class="tab-headers">
				<button
					class="tab-header"
					class:active={activeTab === "details"}
					on:click={() => (activeTab = "details")}>รายละเอียด</button
				>
				<button
					class="tab-header"
					class:active={activeTab === "testcases"}
					on:click={() => (activeTab = "testcases")}>Test Case</button
				>
			</div>
			<div class="tab-content">
				{#if activeTab === "details"}
					<div class="description-content">
						{description}
					</div>
				{:else}
					<div class="testcases-list">
						{#each testCases as testCase, index}
							<div class="testcase-item">
								<div
									class="status-dot"
									class:pass={getTestcaseStatus(index) === "pass"}
									class:fail={getTestcaseStatus(index) === "fail"}
								></div>
								<div class="testcase-details">
									<div class="testcase-label">Test case {index + 1}</div>
									<div class="testcase-input">Input : {testCase.input}</div>
									<div class="testcase-output">Output : {testCase.output}</div>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</Frame>
</div>

<style>
	/*
	-------------------------------------------------------
	Page Styles
	-------------------------------------------------------
	*/
	.mainFrame {
		display: flex;
		flex-direction: row;
		height: 100%;
		width: 100%;
		padding: 10px;
	}

	.WrapButton {
		display: flex;
		flex-direction: row;
		gap: 10px;
		width: 200px;
		height: 40px;
		align-self: flex-end;
		position: absolute;

		:global(button) {
			padding: 0px;
		}

		:global(.Run) {
			background: var(--status-done);
			color: var(--bg);
		}
	}

	:global(.ProblemContainer) {
		display: flex;
		flex-direction: column;
		width: 60%;
		gap: 10px;
	}

	:global(.InfoAndTestcaseBox) {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 40%;
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

	/*
	-------------------------------------------------------
	Tab Container Styles
	-------------------------------------------------------
	*/
	.tab-container {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.tab-headers {
		display: flex;
		width: 100%;
		flex-shrink: 0;
	}

	.tab-header {
		flex-grow: 1;
		padding: 10px;
		border: none;
		background-color: var(--list-bg);
		color: var(--text);
		cursor: pointer;
		font-size: 1em;
		font-weight: 600;
		transition: background-color 0.2s ease;
		border-bottom: 2px solid transparent;
	}

	.tab-header:hover {
		background-color: var(--hover-list-bg);
	}

	.tab-header.active {
		background-color: var(--selected-list-bg);
		border-bottom-color: var(--selected-list-outline);
	}

	.tab-content {
		flex-grow: 1;
		overflow-y: auto;
		padding: 10px;
		border: 1px solid var(--outline);
		border-top: none;
		border-bottom-left-radius: var(--n-border-radius);
		border-bottom-right-radius: var(--n-border-radius);
		box-sizing: border-box;
	}

	.description-content {
		color: var(--description);
		line-height: 1.6;
		white-space: pre-wrap;
	}

	.testcases-list {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	@media (max-width: 800px) {
		.mainFrame {
			flex-direction: column-reverse;
		}

		:global(.ProblemContainer) {
			width: auto;
			height: 50%;
		}

		:global(.InfoAndTestcaseBox) {
			width: auto;
			height: 50%;
		}
	}
</style>
