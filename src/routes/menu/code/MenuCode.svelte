<script lang="ts">
	import { azScale } from "$lib/transition";
	import CodeEditor from "../../../components/CodeEditor.svelte";
	import Frame from "../../../components/Frame.svelte";
	import Tab from "../../../components/Tab.svelte";
	import TestCase from "../components/TestCase.svelte";

	/*
	-------------------------------------------------------
	Component State
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

	const description = "รายละเอียดโจทย์...";

	let activeTab = "details";

	/*
	-------------------------------------------------------
	Event Handlers
	-------------------------------------------------------
	*/

	function getTestcaseStatus(index) {
		return index % 2 === 0 ? "pass" : "fail";
	}

	/*
	-------------------------------------------------------
	Lifecycle
	-------------------------------------------------------
	*/

	function onEditorChange(text) {
		console.log(text);
	}
</script>

<div class="full mainFrame">
	<Frame blur-bg class="ProblemContainer">
		<CodeEditor onChange={onEditorChange}></CodeEditor>
	</Frame>

	<Tab
		class="side"
		headers={{ details: "รายละเอียดโจทย์", testcase: "Test case" }}
		{activeTab}
		OnChangeTab={(tab) => (activeTab = tab)}
	>
		{#if activeTab === "details"}
			<div class="full" in:azScale={{ delay: 250 }} out:azScale>
				<p>{description}</p>
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
