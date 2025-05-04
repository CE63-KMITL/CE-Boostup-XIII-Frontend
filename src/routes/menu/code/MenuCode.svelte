<script lang="ts">
	import { azScale } from "$lib/transition";
	import { onDestroy, onMount } from "svelte";
	import Button from "../../../components/Button.svelte";
	import CodeEditor from "../../../components/CodeEditor.svelte";
	import Frame from "../../../components/Frame.svelte";
	import Tab from "../../../components/Tab.svelte";
	import TestCase from "../components/TestCase.svelte";

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
