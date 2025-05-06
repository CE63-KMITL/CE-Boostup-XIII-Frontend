<script lang="ts">
	import * as api from "$lib/fetchApi";
	import { azScale } from "$lib/transition";
	import { onMount } from "svelte";
	import CodeEditor from "../../../components/CodeEditor.svelte";
	import Frame from "../../../components/Frame.svelte";
	import Tab from "../../../components/Tab.svelte";
	import InputOutput from "../components/InputOutput.svelte";
	import TestCase from "../components/TestCase.svelte";
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

	let activeTab = "details";

	let codeText = "";
	let inputText = "";
	let result = {
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
		// api.call(`/user/getSaveCode?id=${$page.params.id}`, { method: "GET", withToken: true });
		return localStorage.getItem("code");
	}

	async function saveCode(code) {
		console.log("Saved");

		localStorage.setItem("code", code);
	}

	async function onRunCode() {
		result = {
			exit_code: null,
			exit_status: "RUNNING",
			output: null,
			used_time: null,
		};

		result = await api.call("/run-code", {
			method: "POST",
			data: {
				input: inputText,
				code: codeText,
				timeout: 1000,
			},
			withToken: true,
		});
	}
	/*
	-------------------------------------------------------
	Lifecycle
	-------------------------------------------------------
	*/

	function onEditorChange(text) {
		codeText = text;
	}
</script>

<div class="full mainFrame">
	<Frame blur-bg class="ProblemContainer">
		<CodeEditor onChange={onEditorChange} {saveCode} {loadCode}></CodeEditor>
	</Frame>

	<Tab
		class="side"
		headers={{ details: "รายละเอียดโจทย์", inputOutput: "รันโค้ด", testcase: "Test case" }}
		{activeTab}
		OnChangeTab={(tab) => (activeTab = tab)}
	>
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
				<TestCase {testCases} />
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
			flex-direction: column-reverse;
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
