<script lang="ts">
	import * as api from "$lib/fetchApi";
	import { azScale } from "$lib/transition";
	import { onMount } from "svelte";
	import CodeEditor from "$lib/components/CodeEditor.svelte";
	import Frame from "$lib/components/Frame.svelte";
	import Tab from "$lib/components/Tab.svelte";
	import InputOutput from "../components/InputOutput.svelte";
	import TestCaseContainer from "../components/TestCaseContainer.svelte";
	import ProblemDetail from "../problem/components/ProblemDetail.svelte";
	import Button from "$lib/components/Button.svelte";

	//-------------------------------------------------------
	// Component State
	//-------------------------------------------------------
	let activeTab = "inputOutput";
	let headerTabs: { [key: string]: string } = { inputOutput: "รันโค้ด" };

	//-------------------------------------------------------
	// Code and Input/Output State
	//-------------------------------------------------------
	let codeText = "";
	let inputText = "";
	let result = {
		exit_code: null,
		exit_status: null,
		output: null,
		used_time: null,
	};

	//-------------------------------------------------------
	// Problem Data State
	//-------------------------------------------------------
	let currentProblemId: string | null = null;
	let problemData = null;

	//-------------------------------------------------------
	// Test Case State (Static or Placeholder)
	//-------------------------------------------------------
	const testCases = [
		{
			input: "",
			hidden: false,
			result: {
				exit_code: null,
			},
		},
		{
			input: "",
			hidden: true,
			result: {
				exit_code: null,
			},
		},
	];

	//-------------------------------------------------------
	// Code Persistence Functions
	//-------------------------------------------------------
	async function loadCode() {
		let code;
		if (currentProblemId) {
			code = await api.call(`/user/code/${currentProblemId}`, {
				withToken: true,
			});
		} else {
			code = localStorage.getItem("code");
		}
		return code || "";
	}

	async function saveCode(code: string) {
		if (currentProblemId) {
			await api.call(`/user/code/${currentProblemId}`, {
				method: "POST",
				data: { code },
				withToken: true,
			});
		} else {
			localStorage.setItem("code", code);
		}
	}

	//-------------------------------------------------------
	// Code Execution Function
	//-------------------------------------------------------
	async function onRunCode() {
		result = {
			exit_code: null,
			exit_status: "RUNNING",
			output: null,
			used_time: null,
		};

		if (currentProblemId) {
			await saveCode(codeText);
			result = await api.call(`/problem/run-code/${currentProblemId}`, {
				method: "POST",
				data: {
					input: inputText,
				},
				withToken: true,
			});
		} else {
			result = await api.call(`/run-code`, {
				method: "POST",
				data: {
					input: inputText,
					code: codeText,
				},
				withToken: true,
			});
		}
	}

	//-------------------------------------------------------
	// Lifecycle
	//-------------------------------------------------------
	onMount(async () => {
		const url = new URL(window.location.href);
		const problemIdFromUrl = url.searchParams.get("problemId");

		if (problemIdFromUrl) {
			currentProblemId = problemIdFromUrl;
			headerTabs = { details: "รายละเอียดโจทย์", ...headerTabs, testcase: "Test case" };
			activeTab = "details";
			problemData = await api.call(`/problem/${currentProblemId}`, { withToken: true });
		}
		codeText = await loadCode();
	});
</script>

<div class="component">
	<div class="full mainFrame">
		<div class="full subFrame">
			<Frame blur-bg margin={false} class="ProblemContainer">
				<CodeEditor bind:value={codeText} {saveCode} {loadCode}></CodeEditor>
			</Frame>

			<Tab margin={false} class="side" headers={headerTabs} bind:activeTab>
				{#if activeTab === "details"}
					<div class="full" in:azScale={{ delay: 250 }} out:azScale>
						<ProblemDetail problem={problemData}></ProblemDetail>
					</div>
				{:else if activeTab === "inputOutput"}
					<div class="full" in:azScale={{ delay: 250 }} out:azScale>
						<InputOutput {onRunCode} bind:inputText bind:result></InputOutput>
					</div>
				{:else if activeTab === "testcase"}
					<div class="full" in:azScale={{ delay: 250 }} out:azScale>
						<TestCaseContainer staff={false} {testCases} />
					</div>
				{/if}
			</Tab>
		</div>

		<div class="buttonContainer">
			<Button>ดูโจทย์</Button>
		</div>
	</div>
</div>

<style lang="scss">
	.component {
		display: contents;

		.mainFrame {
			display: flex;
			padding: 10px;
			gap: var(--n-gap);
			flex-direction: column;
		}

		//-------------------------------------------------------
		// Main Layout Styles
		//-------------------------------------------------------
		.subFrame {
			display: flex;
			flex-direction: row;
			width: 100%;
			gap: var(--n-gap);
			flex-shrink: 3;
			min-height: 0;
		}

		.buttonContainer {
			display: flex;
		}

		//-------------------------------------------------------
		// Container Styles
		//-------------------------------------------------------
		:global(.ProblemContainer) {
			display: flex;
			flex-direction: column;
			width: 60%;
			gap: var(--n-gap);
		}

		:global(.side) {
			width: 40%;
		}

		//-------------------------------------------------------
		// Responsive Styles
		//-------------------------------------------------------
		@media (max-width: 800px) {
			.subFrame {
				flex-direction: column;
			}

			:global(.ProblemContainer) {
				width: auto;
				height: 50%;
			}

			:global(div.side) {
				width: auto;
				height: 50%;
			}
		}
	}
</style>
