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

	/*
	-------------------------------------------------------
	Variables
	-------------------------------------------------------
	*/

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

	let headerTabs: { [key: string]: string } = { inputOutput: "รันโค้ด"};
	let activeTab = "inputOutput";

	let codeText = "";
	let inputText = "";
	let result:any = {
		exit_code: null,
		exit_status: null,
		output: null,
		used_time: null,
	};

	/*
	-------------------------------------------------------
	Functions
	-------------------------------------------------------
	*/

	function getTestcaseStatus(index) {
		return index % 2 === 0 ? "pass" : "fail";
	}

	async function loadCode() {
		let code;
		if (currentProblemId) {
			code = await api.call(`/user/code/${currentProblemId}`, {
				withToken: true,
			});

			console.log(code);
		} else {
			code = localStorage.getItem("code");
		}
		return code;
	}

	async function saveCode(code) {
		if (currentProblemId) {
			await api.call(`/user/code/${currentProblemId}`, {
				method: "POST",
				data: { code },
				withToken: true,
			});
		} else {
			localStorage.setItem("code", code);
		}
		console.log("Saved");
	}

	let currentProblemId = null;

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
			console.log(codeText);
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
	/*
	-------------------------------------------------------
	Lifecycle
	-------------------------------------------------------
	*/

	onMount(() => {
		const url = new URL(window.location.href);
		const problemId = url.searchParams.get("problemId");

		if (problemId) {
			headerTabs = { details: "รายละเอียดโจทย์", ...headerTabs, testcase: "Test case" };
			activeTab = "details";
		}
	});
</script>

<div class="full mainFrame">
	<Frame blur-bg class="ProblemContainer">
		<CodeEditor bind:value={codeText} {saveCode} {loadCode}></CodeEditor>
	</Frame>

	<Tab class="side" headers={headerTabs} bind:activeTab>
		{#if activeTab === "details"}
			<div class="full" in:azScale={{ delay: 250 }} out:azScale>
				<ProblemDetail problem></ProblemDetail>
			</div>
		{:else if activeTab === "inputOutput"}
			<div class="full" in:azScale={{ delay: 250 }} out:azScale>
				<InputOutput {onRunCode} bind:inputText bind:result></InputOutput>
			</div>
		{:else if activeTab === "testcase"}
			<div class="full" in:azScale={{ delay: 250 }} out:azScale>
				<TestCaseContainer {testCases} />
			</div>
		{/if}
	</Tab>
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

	:global(.ProblemContainer) {
		display: flex;
		flex-direction: column;
		width: 60%;
		gap: 10px;
	}

	:global(div.side) {
		width: 40%;
	}

	@media (max-width: 800px) {
		.mainFrame {
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
</style>
