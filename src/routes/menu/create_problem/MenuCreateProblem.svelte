<script lang="ts">
	import * as api from "$lib/fetchApi";
	import { tagsColors } from "$lib/constants/problem";
	import { azScale } from "$lib/transition";
	import { onMount } from "svelte";
	import Button from "$lib/components/Button.svelte";
	import Checkbox from "$lib/components/Checkbox.svelte";
	import CodeEditor from "$lib/components/CodeEditor.svelte";
	import Frame from "$lib/components/Frame.svelte";
	import Tab from "$lib/components/Tab.svelte";
	import InputOutput from "../components/InputOutput.svelte";
	import TestCaseContainer from "../components/TestCaseContainer.svelte";
	import Stars from "../problem/components/Stars.svelte";
	import { userData } from "$lib/auth.local";
	import RadioButton from "$lib/components/RadioButton.svelte";

	//-------------------------------------------------------
	// Component State
	//-------------------------------------------------------
	let mainScrollContainer: HTMLElement | null = null;
	let rightActiveTab: string = "details";
	let leftActiveTab: string = "solutionCode";

	//-------------------------------------------------------
	// Problem Data State
	//-------------------------------------------------------
	let problemTitle: string = "";
	let problemDifficulty: number = 1;
	let problemTimeLimit: number = 1000;
	let problemTags: string[] = [];
	let problemHeaderMode: string = "disallowed";
	let problemHeaders: string = "";
	let problemFunctionMode: string = "disallowed";
	let problemFunctions: string = "";
	let problemDescription: string = "";
	let problem = null;

	//-------------------------------------------------------
	// Code Editor State
	//-------------------------------------------------------
	let solutionCodeText: string = "";
	let defaultCodeText: string = "";

	//-------------------------------------------------------
	// Test Case State
	//-------------------------------------------------------
	let test_cases = [{ input: "", output: "", hidden: false }];

	//-------------------------------------------------------
	// Input/Output State
	//-------------------------------------------------------
	let inputText: string = "";
	let result = {
		exit_code: null,
		exit_status: null,
		output: null,
		used_time: null,
	};

	//-------------------------------------------------------
	// UI State
	//-------------------------------------------------------
	let headerTabs: { [key: string]: string } = {
		details: "รายละเอียดโจทย์",
		inputOutput: "รันโค้ด",
		testcase: "Test case",
	};
	let selectedTags = {};

	//-------------------------------------------------------
	// Test Case State Handlers
	//-------------------------------------------------------
	function handleAddTestCaseContainer(e) {
		test_cases = [...test_cases, { input: "", output: "", hidden: false }];
		requestAnimationFrame(() => {
			if (e.target && typeof e.target.scrollIntoView === "function") {
				e.target.scrollIntoView({ behavior: "smooth" });
			}
		});
	}

	function handleDeleteTestCaseContainer(event: CustomEvent<number>) {
		const index = event.detail;
		test_cases = test_cases.filter((_, i) => i !== index);
	}

	//-------------------------------------------------------
	// Code Editor Handlers - Solution Code
	//-------------------------------------------------------
	async function loadSolutionCode() {
		return localStorage.getItem("solutionCode");
	}

	async function saveSolutionCode(code: string) {
		console.log("Solution code saved");
		localStorage.setItem("solutionCode", code);
	}

	//-------------------------------------------------------
	// Code Editor Handlers - Default Code
	//-------------------------------------------------------

	async function loadDefaultCode() {
		return localStorage.getItem("defaultCode");
	}

	async function saveDefaultCode(code: string) {
		console.log("Default code saved");
		localStorage.setItem("defaultCode", code);
	}

	//-------------------------------------------------------
	// API Call Functions
	//-------------------------------------------------------
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
				code: solutionCodeText,
				timeout: problemTimeLimit || 1000,
			},
			withToken: true,
		});
	}

	//-------------------------------------------------------
	// Lifecycle
	//-------------------------------------------------------
	onMount(() => {
		const url = new URL(window.location.href);
		const problemId = url.searchParams.get("problemId");
	});
</script>

<div id="problemCreateContainer" bind:this={mainScrollContainer}>
	<div class="sectionPanel">
		<div class="full mainFrame">
			<Tab
				class="problemCodeContainer"
				margin={false}
				headers={{ solutionCode: "เฉลย", defaultCode: "โค้ดเริ่มต้น" }}
				bind:activeTab={leftActiveTab}
			>
				{#if leftActiveTab === "solutionCode"}
					<div class="full" in:azScale={{ delay: 250 }} out:azScale>
						<CodeEditor
							saveCode={saveSolutionCode}
							loadCode={loadSolutionCode}
							bind:value={solutionCodeText}
						/>
					</div>
				{:else if leftActiveTab === "defaultCode"}
					<div class="full" in:azScale={{ delay: 250 }} out:azScale>
						<CodeEditor
							saveCode={saveDefaultCode}
							loadCode={loadDefaultCode}
							bind:value={defaultCodeText}
						/>
					</div>
				{/if}
			</Tab>

			<Tab class="side" margin={false} headers={headerTabs} bind:activeTab={rightActiveTab}>
				{#if rightActiveTab === "details"}
					<div class="full details" in:azScale={{ delay: 250 }} out:azScale>
						<div class="problemCreateInputContainer">
							<div class="headText">ชื่อโจทย์ :</div>
							<input bind:value={problemTitle} placeholder="โจทย์ของคนสุดเทพ" />
						</div>
						<div class="problemCreateInputContainer">
							<div class="headText">ชื่อคนทำโจทย์ : {problem?.author.name || $userData?.name}</div>
						</div>

						<div class="headText">ความยาก</div>

						<div class="difficulty">
							<Stars bind:difficulty={problemDifficulty}></Stars>
							<div class="difficultySlider">
								<input
									type="range"
									step="0.5"
									min="0.5"
									max="5"
									bind:value={problemDifficulty}
								/>
								<div style="width: 40px; text-align: end">{problemDifficulty.toFixed(1)}</div>
							</div>
						</div>

						<div class="headText">เวลาสูงสุดที่อนุญาตให้รัน (ms)</div>

						<input type="number" bind:value={problemTimeLimit} placeholder="1000" />

						<div class="headText">ประเภท (Tags)</div>

						<Frame class="tagsBox">
							{#each Object.keys(tagsColors) as tag}
								<Checkbox color={tagsColors[tag]} value={tag} bind:group={problemTags}
									>{tag}</Checkbox
								>
							{/each}
						</Frame>

						<div class="headText">Headers</div>

						<div class="checkboxContainer">
							<RadioButton
								selected={problemHeaderMode === "disallowed"}
								on:click={() => (problemHeaderMode = "disallowed")}
								name="problemHeaderMode"
								color="var(--status-not-started)"
							>
								ไม่อนุญาตให้ใช้
							</RadioButton>

							<RadioButton
								selected={problemHeaderMode === "allowed"}
								on:click={() => (problemHeaderMode = "allowed")}
								name="problemHeaderMode"
								color="var(--status-done)"
							>
								อนุญาตให้ใช้แค่ที่กำหนด
							</RadioButton>
						</div>

						<input
							bind:value={problemHeaders}
							placeholder="stdio.h,string.h"
							disabled={problemHeaderMode === "disallowed"}
						/>

						<div class="headText">Functions</div>

						<div class="checkboxContainer">
							<RadioButton
								selected={problemFunctionMode === "disallowed"}
								on:click={() => (problemFunctionMode = "disallowed")}
								name="problemFunctionMode"
								color="var(--status-not-started)"
							>
								ไม่อนุญาตให้ใช้
							</RadioButton>

							<RadioButton
								selected={problemFunctionMode === "allowed"}
								on:click={() => (problemFunctionMode = "allowed")}
								name="problemFunctionMode"
								color="var(--status-done)"
							>
								อนุญาตให้ใช้แค่ที่กำหนด
							</RadioButton>
						</div>

						<input
							bind:value={problemFunctions}
							placeholder="for,while,if"
							disabled={problemFunctionMode === "disallowed"}
						/>

						<div class="headText">รายละเอียดโจทย์</div>

						<textarea
							class="description"
							placeholder="รายละเอียดโจทย์"
							bind:value={problemDescription}
						>
							{problem?.detail || ""}
						</textarea>
					</div>
				{:else if rightActiveTab === "inputOutput"}
					<div class="full" in:azScale={{ delay: 250 }} out:azScale>
						<InputOutput {onRunCode} bind:inputText bind:result />
					</div>
				{:else if rightActiveTab === "testcase"}
					<div class="full testcase-section" in:azScale={{ delay: 250 }} out:azScale>
						<TestCaseContainer testCases={test_cases} />
						<Button on:click={handleAddTestCaseContainer} class="addTestCaseContainerButtonFullWidth"
							>เพิ่ม Test Case</Button
						>
					</div>
				{/if}
			</Tab>
		</div>
	</div>
</div>

<style lang="scss">
	.difficultySlider {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.details {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.headText {
		font-weight: 600;
		font-size: 0.9rem;
	}

	.problemCreateInputContainer {
		display: flex;
		align-items: center;
		gap: 10px;
		white-space: nowrap;
	}

	.checkboxContainer {
		display: flex;
		flex-direction: row;
		gap: 10px;
	}

	.description {
		height: 100%;
		min-height: 150px;
		white-space: pre-wrap;
		border: 1px solid var(--outline);
		border-radius: 5px;
		padding: 8px;
		background-color: var(--bg);
		color: var(--text-color);
		font-family: inherit;
		font-size: 0.9rem;
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

			:global(.addTestCaseContainerButton) {
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

	:global(div.problemCodeContainer) {
		display: flex;
		flex-direction: column;
		width: 60%;
		gap: 10px;
	}

	:global(div.side) {
		width: 40%;
	}

	.testcase-section {
		display: flex;
		flex-direction: column;
		gap: 15px;
		overflow-y: auto;
		padding-right: 10px;
	}

	.addTestCaseContainerButtonFullWidth {
		width: 100%;
		margin-top: 10px;
	}

	input[type="text"],
	input[type="number"],
	textarea {
		padding: 8px;
		border: 1px solid var(--outline);
		border-radius: 5px;
		background-color: var(--bg);
		color: var(--text-color);
		font-size: 0.9rem;
		width: 100%;
		box-sizing: border-box;

		&:disabled {
			background-color: var(--bg-disabled);
			cursor: not-allowed;
		}
	}

	@media (max-width: 800px) {
		.mainFrame {
			flex-direction: column;
		}

		:global(.problemCodeContainer) {
			width: auto;
			height: 50%;
		}

		:global(div.side) {
			width: auto;
			height: 50%;
		}
	}
</style>
