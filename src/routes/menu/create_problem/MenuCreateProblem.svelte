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
	let problemId: number = null;
	let problemTitle: string = "";
	let problemDifficulty: number = 1;
	let problemTimeLimit: number = null;
	let problemTags: string[] = [];
	let problemHeaderMode: string = "disallowed";
	let problemHeaders: string = "";
	let problemFunctionMode: string = "disallowed";
	let problemFunctions: string = "";
	let problemDescription: string = "";
	let problemAuthorName = null;
	let problemAuthorId = null;

	//-------------------------------------------------------
	// Code Editor State
	//-------------------------------------------------------
	let solutionCodeText: string = "";
	let defaultCodeText: string = "";

	//-------------------------------------------------------
	// Test Case State
	//-------------------------------------------------------
	let problemTestCases = [
		{
			input: "",
			hidden: false,
			result: {
				exit_code: null,
				exit_status: null,
				output: null,
				used_time: null,
			},
		},
	];

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

	//-------------------------------------------------------
	// Test Case State Handlers
	//-------------------------------------------------------
	function handleAddTestCaseContainer(e) {
		problemTestCases = [
			...problemTestCases,
			{
				input: "",
				hidden: false,
				result: {
					exit_code: null,
					exit_status: null,
					output: null,
					used_time: null,
				},
			},
		];
		requestAnimationFrame(() => {
			if (e.target && typeof e.target.scrollIntoView === "function") {
				e.target.scrollIntoView({ behavior: "smooth" });
			}
		});
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

	async function runAllCreateProblem() {
		api.call("/run_code/test-cases", {	
			withToken: true, 
			data: {
				inputs: problemTestCases.map((val) => val.input),
				timeout: problemTimeLimit || 1000,
				code: solutionCodeText
			}
		});
	}

	async function onCreateProblem() {
		const problemData = {
			title: problemTitle,
			description: problemDescription,
			timeLimit: problemTimeLimit,
			headerMode: problemHeaderMode,
			headers: problemHeaders
				.trim()
				.split(",")
				.filter((header) => header != ""),
			functionMode: problemFunctionMode,
			functions: problemFunctions
				.trim()
				.split(",")
				.filter((header) => header != ""),
			defaultCode: defaultCodeText,
			solutionCode: solutionCodeText,
			difficulty: problemDifficulty,
			tags: problemTags,
			testCases: problemTestCases.map((testCase) => {
				return {
					input: testCase.input,
					isHiddenTestcase: testCase.hidden,
				};
			}),
		};

		console.log(problemData);

		// const result = await api.call("/problem", {
		// 	method: "POST",
		// 	data: problemData,
		// 	withToken: true,
		// });
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
		<div class="mainFrame">
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
							<div class="headText">ชื่อคนทำโจทย์ : {problemAuthorName || $userData?.name}</div>
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
								<Checkbox
									color={tagsColors[tag]}
									value={tag}
									onSelect={() => {
										problemTags.push(tag);
										console.log(problemTags);
									}}
									onUnselect={() => {
										problemTags = problemTags.filter((t) => t !== tag);
									}}>{tag}</Checkbox
								>
							{/each}
						</Frame>

						<div class="headText">Headers</div>

						<div class="radioButtonContainer">
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

						<input bind:value={problemHeaders} placeholder="stdio.h,string.h" />

						<div class="headText">Functions</div>

						<div class="radioButtonContainer">
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

						<input bind:value={problemFunctions} placeholder="for,while,if" />

						<div class="headText">รายละเอียดโจทย์</div>

						<textarea
							class="description"
							placeholder="รายละเอียดโจทย์"
							bind:value={problemDescription}
						>
						</textarea>
					</div>
				{:else if rightActiveTab === "inputOutput"}
					<div class="full" in:azScale={{ delay: 250 }} out:azScale>
						<InputOutput {onRunCode} bind:inputText bind:result />
					</div>
				{:else if rightActiveTab === "testcase"}
					<div class="full testcase-section" in:azScale={{ delay: 250 }} out:azScale>
						<TestCaseContainer testCases={problemTestCases} staff={true} />
						<Button on:click={handleAddTestCaseContainer} class="addTestCaseContainerButtonFullWidth"
							>เพิ่ม Test Case</Button
						>
					</div>
				{/if}
			</Tab>
		</div>

		<Frame class="buttonContainer">
			{#if problemId}
				{#if problemAuthorId == $userData.id}
					<Button>อัพเดทโจทย์</Button>
				{:else}
					<Button color="var(--status-not-started)">ไม่อนุมัติ</Button>
					<Button color="var(--status-done)">อนุมัติ</Button>
				{/if}
			{:else}
				<Button onclick={onCreateProblem}>สร้างโจทย์</Button>
			{/if}
		</Frame>
	</div>
</div>

<style lang="scss">
	//-------------------------------------------------------
	// Detail Pane Styles
	//-------------------------------------------------------
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

	.difficultySlider {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.radioButtonContainer {
		display: flex;
		flex-direction: row;
		gap: 10px;
		flex-wrap: wrap;
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

	//-------------------------------------------------------
	// Global Styles
	//-------------------------------------------------------
	:global(.tagsBox) {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 10px;
		gap: 10px;
	}

	//-------------------------------------------------------
	// Main Layout Styles
	//-------------------------------------------------------
	#problemCreateContainer {
		width: 100%;
		height: 100%;
	}

	.sectionPanel {
		padding: 20px;
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.mainFrame {
		display: flex;
		flex-direction: row;
		height: 100%;
		width: 100%;
		gap: 10px;
		flex: 1;
		min-height: 0;
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

	:global(.buttonContainer) {
		display: flex;
		flex-direction: row;
		gap: 10px;
	}

	//-------------------------------------------------------
	// Test Case Section Styles
	//-------------------------------------------------------
	.testcase-section {
		display: flex;
		flex-direction: column;
		gap: 15px;
		overflow-y: auto;
		padding-right: 10px;
	}

	//-------------------------------------------------------
	// Form Element Styles
	//-------------------------------------------------------
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
		resize: vertical;

		&:disabled {
			background-color: var(--bg-disabled);
			cursor: not-allowed;
		}
	}

	//-------------------------------------------------------
	// Responsive Styles
	//-------------------------------------------------------
	@media (max-width: 800px) {
		.mainFrame {
			flex-direction: column;

			:global(.problemCodeContainer) {
				width: auto;
				height: 50%;
			}

			:global(div.side) {
				width: auto;
				height: 50%;
			}
		}

		.buttonContainer {
			display: flex;
			justify-content: center;
		}
	}
</style>
