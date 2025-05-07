<script lang="ts">
	import * as api from "$lib/fetchApi";
	import { tagsColors } from "$lib/constants/problem";
	import { azScale } from "$lib/transition";
	import { onMount } from "svelte";
	import Button from "../../../components/Button.svelte";
	import Checkbox from "../../../components/Checkbox.svelte";
	import CodeEditor from "../../../components/CodeEditor.svelte";
	import Frame from "../../../components/Frame.svelte";
	import Tab from "../../../components/Tab.svelte";
	import InputOutput from "../components/InputOutput.svelte";
	import TestCase from "../components/TestCase.svelte";
	import ProblemDetail from "../problem/components/ProblemDetail.svelte";
	import Stars from "../problem/components/Stars.svelte";
	import Tag from "../problem/components/Tag.svelte";
	import { userData } from "$lib/auth.local";

	let test_cases = [{ input: "", output: "", hidden: false }];
	let mainScrollContainer: HTMLElement | null = null;
	let activeTab: string = "details";

	/*
     -------------------------------------------------------
     Test Case State Handlers
     -------------------------------------------------------
     */
	function handleAddTestCase(e) {
		test_cases = [...test_cases, { input: "", output: "", hidden: false }];
		requestAnimationFrame(() => {
			e.target.scrollIntoView({ behavior: "smooth" });
		});
	}

	function handleDeleteTestCase(event: CustomEvent<number>) {
		const index = event.detail;
		test_cases = test_cases.filter((_, i) => i !== index);
	}

	/*
     -------------------------------------------------------
     Scroll Handling Functions
     -------------------------------------------------------
     */
	function enableVerticalScroll(node: HTMLElement) {
		function onWheel(e: WheelEvent) {
			console.log(e.target);
			if ((e.target as HTMLElement).classList.contains("dropdown-option")) return;
			if (node.getAttribute("disabled") === "true") return;
			const scrollAmount = node.clientHeight * 0.8;
			e.deltaY > 0
				? node.scrollTo({
						top: node.scrollTop + scrollAmount,
						left: 0,
						behavior: "smooth",
					})
				: node.scrollTo({
						top: node.scrollTop - scrollAmount,
						left: 0,
						behavior: "smooth",
					});
			e.preventDefault();
		}
		node.addEventListener("wheel", onWheel, { passive: false });
		return {
			destroy() {
				node.removeEventListener("wheel", onWheel);
			},
		};
	}

	/*
     -------------------------------------------------------
     DOM Manipulation Functions
     -------------------------------------------------------
     */
	function Disable_Node(target_node: HTMLElement | null) {
		if (target_node) target_node.setAttribute("disabled", "true");
	}

	function Enable_Node(target_node: HTMLElement | null) {
		if (target_node) target_node.removeAttribute("disabled");
	}

	function Disable_Main_Scroll() {
		Disable_Node(mainScrollContainer);
	}

	function Enable_Main_Scroll() {
		Enable_Node(mainScrollContainer);
	}

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

	let headerTabs: { [key: string]: string } = {
		details: "รายละเอียดโจทย์",
		inputOutput: "รันโค้ด",
		testcase: "Test case",
	};

	let problem = null;
	let selectedTags = {};

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

	onMount(() => {
		const url = new URL(window.location.href);
		const problemId = url.searchParams.get("problemId");
	});
</script>

<div id="problemCreateContainer" use:enableVerticalScroll bind:this={mainScrollContainer}>
	<!-- <div class="sectionPanel">
		<Frame blur-bg class="sectionContainer problemInfo">
			<div class="problemHead">
				<h1 class="headText">ชื่อโจทย์</h1>
				<input class="problemNameInput" placeholder="ชื่อโจทย์" />
			</div>
			<div class="userAndExDetails">
				<div class="username">
					<h1 class="headText">ผู้สร้างโจทย์ :</h1>
					<h1 class="headText">{user.name}</h1>
				</div>
				<div class="tagsBox">
					<h1 class="headText">ประเภท</h1>
					<div class="tagsCheckboxGroup">
						{#each Object.keys(tagsColors) as tag}
							<Checkbox color={tagsColors[tag]} value={tag} bind:group={selectedTags}
								>{tag}</Checkbox
							>
						{/each}
					</div>
				</div>
				<textarea class="problemDetailsInput" placeholder="คำอธิบายโจทย์"></textarea>
			</div>
		</Frame>
	</div> -->

	<div class="sectionPanel">
		<div class="full mainFrame">
			<Frame blur-bg margin={false} class="ProblemContainer">
				<CodeEditor onChange={onEditorChange} {saveCode} {loadCode}></CodeEditor>
			</Frame>

			<Tab class="side" margin={false} headers={headerTabs} bind:activeTab>
				{#if activeTab === "details"}
					<div class="full details" in:azScale={{ delay: 250 }} out:azScale>
						<div class="problemCreate-input-container">
							<div class="headText">ชื่อโจทย์ :</div>
							<input class="title" value={problem?.title} />
						</div>
						<div class="problemCreate-input-container">
							<div class="headText">ชื่อคนทำโจทย์ : {problem?.author.name || $userData?.name}</div>
						</div>

						<div class="headText">ประเภท</div>

						<Frame class="tagsBox">
							{#each Object.keys(tagsColors) as tag}
								<Checkbox color={tagsColors[tag]} value={tag} bind:group={selectedTags}
									>{tag}</Checkbox
								>
							{/each}
						</Frame>

						<textarea class="description">
							{problem?.detail || "ไม่สามารถโหลดรายละเอียดโจทย์ได้"}
						</textarea>
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
	</div>

	<div class="sectionPanel">
		<Frame blur-bg margin={false} class="sectionContainer defaultCodeContainer">
			<div class="defaultCodeHeader">Default code</div>
			<div class="codeInputBox">
				<CodeEditor></CodeEditor>
			</div>
		</Frame>
	</div>

	<!-- <div class="sectionPanel">
		<Frame blur-bg class="sectionContainer testCaseSectionWrapper">
			<Button class="runAll">Run All</Button>
			<div
				class="testCaseContainer"
				role="region"
				use:enableHorizontalScroll
				on:mouseleave={Enable_Main_Scroll}
				on:mouseenter={Disable_Main_Scroll}
			>
				{#each test_cases as test_case, i (i)}
					<div class="testCase">
						<h1 class="headText">Test Case {i + 1}</h1>
						<div class="hiddenTestcaseBox">
							<Checkbox bind:checked={test_case.hidden}>Hidden Test Case</Checkbox>
						</div>
						<textarea class="testCaseInput" placeholder="Input here" bind:value={test_case.input}
						></textarea>
						<textarea class="testCaseOutput" placeholder="Output here" bind:value={test_case.output}
						></textarea>
						<Button class="deleteButton">Delete</Button>
					</div>
				{/each}

				<Button class="addTestCaseButton" onclick={handleAddTestCase}>+</Button>
			</div>
			<Button class="doneButton">Done</Button>
		</Frame>
	</div> -->
</div>

<style lang="scss">
	.details {
		display: flex;
		gap: 10px;
	}

	.headText {
		font-weight: 600;
	}

	.problemCreate-input-container {
		display: flex;
		align-items: center;
		gap: 10px;
		white-space: nowrap;
	}

	:global(.tagsBox) {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 10px;
		gap: 10px;
	}

	/*
	-------------------------------------------------------
	Main Container and Section Panel
	-------------------------------------------------------
	*/
	#problemCreateContainer {
		width: 100%;
		height: 100%;
		display: block;
		overflow-y: auto;
		overflow-x: hidden;
		scroll-snap-type: y mandatory;
		box-sizing: border-box;
	}

	.sectionPanel {
		padding: 20px;
		height: 100%;
		scroll-snap-align: start;
	}

	/*
	-------------------------------------------------------
	Global Section Container Styles (within Frame)
	-------------------------------------------------------
	*/
	:global(#problemCreateContainer) {
		:global(.sectionContainer) {
			border-radius: 10px;
			display: flex;
			flex-direction: column;
			position: relative;
			box-sizing: border-box;
			height: 100%;
			width: 100%;
			padding: 20px;
		}

		:global(.defaultCodeContainer) {
			flex-direction: column;
		}

		:global(.problemInfo) {
			justify-content: flex-start;
			gap: 20px;
		}

		:global(.codeInputandOutput) {
			gap: 20px;
			flex-direction: row;
			align-items: stretch;
			overflow: hidden;
			height: calc(100% - 50px);
		}

		:global(.testCaseSectionWrapper) {
			gap: 20px;

			:global(.runAll) {
				color: var(--bg);
				background: var(--status-in-progress);
			}

			:global(.deleteButton) {
				color: var(--bg);
				background: var(--status-not-started);
			}

			:global(.addTestCaseButton) {
				min-width: 30px;
				max-width: 30px;
				align-self: center;

				height: 100%;
				border: 1px solid var(--outline);

				padding: 0;
			}

			:global(.doneButton) {
				color: var(--bg);
				background: var(--status-done);
			}
		}
	}

	.mainFrame {
		display: flex;
		flex-direction: row;
		height: 100%;
		width: 100%;
		gap: 10px;
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
