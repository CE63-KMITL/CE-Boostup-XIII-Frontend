<script lang="ts">
	import * as api from "$lib/fetchApi";
	import { statusStaffColors, statusStaffText, tagsColors } from "$lib/constants/problem";
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
	import Loading from "$lib/components/Loading.svelte";
	import { fade } from "svelte/transition";
	import { showPopup, type ShowPopupInputs } from "$lib/components/PopUp.svelte";
	import { goto } from "$app/navigation";
	import { mobile, updatePage } from "../pageManager";
	import { sleep } from "$lib/normalFunction";

	//-------------------------------------------------------
	// Component State
	//-------------------------------------------------------
	let mainScrollContainer: HTMLElement | null = null;
	let rightActiveTab: string = "details";
	let leftActiveTab: string = "solutionCode";

	let leftHeaderTabs;
	let rightHeaderTabs;

	$: {
		if ($mobile == true) {
			leftActiveTab = "solutionCode";
			rightActiveTab = "";
			leftHeaderTabs = {
				solutionCode: "โค้ด",
				defaultCode: "โค้ดเริ่มต้น",
				details: "รายละเอียดโจทย์",
				inputOutput: "รันโค้ด",
				testcase: "Test case",
			};
			rightHeaderTabs = {};
		} else {
			leftActiveTab = "solutionCode";
			rightActiveTab = "details";
			leftHeaderTabs = {
				solutionCode: "โค้ด",
				defaultCode: "โค้ดเริ่มต้น",
			};
			rightHeaderTabs = {
				details: "รายละเอียดโจทย์",
				inputOutput: "รันโค้ด",
				testcase: "Test case",
			};
		}
	}

	//-------------------------------------------------------
	// Problem Data State
	//-------------------------------------------------------
	let problem = {
		id: null,
		title: "",
		difficulty: 1,
		timeLimit: null,
		tags: [],
		headerMode: "disallowed",
		headers: "",
		functionMode: "disallowed",
		functions: "",
		description: "",
		devStatus: "",
		rejectedMessage: "" as string | null,
		author: {
			id: null,
			icon: null,
			name: null,
		},
		testCases: [
			{
				input: "",
				isHiddenTestcase: false,
				expectOutput: "",
				result: {
					exit_code: null,
					exit_status: null,
					output: null,
					used_time: null,
				},
			},
		],
	};

	function getProblemData() {
		return {
			title: problem.title,
			description: problem.description,
			timeLimit: problem.timeLimit || 100,
			headerMode: problem.headerMode,
			headers: problem.headers
				.trim()
				.split(",")
				.filter((header) => header != ""),
			functionMode: problem.functionMode,
			functions: problem.functions
				.trim()
				.split(",")
				.filter((header) => header != ""),
			defaultCode: defaultCode,
			solutionCode,
			difficulty: problem.difficulty,
			tags: problem.tags,
			testCases: problem.testCases.map((testCase) => {
				return {
					input: testCase.input,
					isHiddenTestcase: testCase.isHiddenTestcase,
				};
			}),
		};
	}

	//-------------------------------------------------------
	// Code Editor State
	//-------------------------------------------------------
	let solutionCode: string = "";
	let defaultCode: string = "";

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
	// Test Case State Handlers
	//-------------------------------------------------------
	function handleAddTestCaseContainer(e) {
		problem.testCases = [
			...problem.testCases,
			{
				input: "",
				isHiddenTestcase: false,
				expectOutput: "",
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

	function removeTestCase(index) {
		problem.testCases.splice(index, 1);
		problem.testCases = [...problem.testCases];
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

		const problemData = getProblemData();

		result = await api.call("/run-code", {
			method: "POST",
			data: {
				input: inputText,
				code: solutionCode,
				timeout: problem.timeLimit || 1000,
				functionMode: problemData.functionMode,
				headerMode: problemData.headerMode,
				headers: problemData.headers,
				functions: problemData.functions,
			},
			withToken: true,
		});
	}

	async function runAllCreateProblem() {
		const problemData = getProblemData();

		problem.testCases.forEach((val, i) => {
			val.result.output = "";
			val.result.exit_status = "RUNNING";
			val.result.exit_code = null;
			val.result.used_time = null;
		});

		problem.testCases = [...problem.testCases];

		const res = await api.call("/run-code/test-cases", {
			withToken: true,
			data: {
				inputs: problem.testCases.map((val) => val.input),
				timeout: problem.timeLimit || 1000,
				code: solutionCode,
				functionMode: problemData.functionMode,
				headerMode: problemData.headerMode,
				headers: problemData.headers,
				functions: problemData.functions,
			},
			method: "POST",
		});

		problem.testCases.forEach((val, i) => {
			val.result.output = res[i].output;
			val.result.exit_status = res[i].exit_status;
			val.result.exit_code = res[i].exit_code;
			val.result.used_time = res[i].used_time;
		});

		problem.testCases = [...problem.testCases];
	}

	async function onCreateProblem() {
		const problemData = getProblemData();

		const result = await api.call(`/problem`, {
			method: "POST",
			data: problemData,
			withToken: true,
		});

		if (result) {
			showPopup(`✅ สร้างโจทย์เรียบร้อยแล้ว!`, {
				สร้างโจทย์เพิ่ม: () => {
					window.location.href = `/menu?page=create_problem`;
				},
				แก้ไขโจทย์: () => {
					window.location.href = `/menu?page=create_problem&problemId=${result.id}`;
				},
			});
		}
	}

	async function onUpdateProblem(skip = false) {
		const problemData = getProblemData();

		const result = await api.call(`/problem/${problem.id}`, {
			method: "PATCH",
			data: problemData,
			withToken: true,
		});

		if (skip) {
			return result;
		}

		if (result) {
			await showPopup("บันทึกข้อมูลเรียบร้อยแล้ว!", {
				โอเค: () => {
					window.location.reload();
				},
			});
		}

		return result;
	}

	//-------------------------------------------------------
	// Staff Action Functions
	//-------------------------------------------------------
	async function reviewProblem() {
		if (!problem.id) return;

		if (!(await onUpdateProblem(true))) {
			return;
		}

		const result = await api.call(`/problem/review/${problem.id}`, {
			method: "POST",
			withToken: true,
		});
		if (result) {
			showPopup("โจทย์ถูกส่งเพื่อตรวจสอบแล้ว!", {
				โอเค: () => {
					window.location.reload();
				},
			});
		}
	}

	async function reqApproveProblem() {
		const result = await api.call(`/problem/approve/${problem.id}`, {
			method: "POST",
			withToken: true,
		});
		if (result) {
			showPopup("โจทย์ได้รับการอนุมัติแล้ว!", {
				โอเค: () => {
					window.location.reload();
				},
			});
		}
	}

	async function approveProblem() {
		if (!problem.id) return;

		if (problem.author?.id == $userData?.id) {
			await showPopup("⚠️ ไม่แนะนำให้คุณอนุมัติโจทย์ของคุณเอง!", {
				มันจำเป็นอะ: {
					primary: true,
					callback: async () => {
						reqApproveProblem();
					},
				},
				โอเคไม่ก็ได้: {
					cancel: true,
					callback: () => {},
				},
			});
		} else {
			reqApproveProblem();
		}
	}

	async function rejectProblem() {
		if (!problem.id) return;
		const inputsForReject: ShowPopupInputs = [
			{
				type: "textarea",
				name: "message",
				label: "เหตุผลในการให้กลับไปแก้ไข",
				placeholder: "กรุณาระบุเหตุผล...",
				required: true,
			},
		];
		showPopup(
			"ส่งโจทย์กลับบ้าน",
			{
				ข้าขอส่งให้เจ้ากลับไปแก้ไขซะ: {
					primary: true,
					callback: async (formData) => {
						if (formData && formData.message) {
							const res = await api.call(`/problem/reject/${problem.id}`, {
								method: "POST",
								data: { message: formData.message },
								withToken: true,
							});
							if (res) {
								await showPopup("ได้ส่งโจทย์กลับบ้านแล้ว!", {
									ตกลง: () => {
										window.location.reload();
									},
								});
							}
						}
					},
				},
				ยกเลิก: {
					cancel: true,
					callback: () => {},
				},
			},
			"large",
			inputsForReject,
			true
		);
	}

	async function archiveProblem() {
		if (!problem.id) return;
		showPopup(
			"ยืนยันการเก็บโจทย์",
			{
				ลาก่อนโจทย์นี้: {
					primary: true,
					callback: async () => {
						const result = await api.call(`/problem/archive/${problem.id}`, {
							method: "POST",
							withToken: true,
						});
						if (result) {
							showPopup("โจทย์ได้โบกมือบ๊ายบายให้คุณแล้ว!", {
								ตกลง: () => {
									window.location.reload();
								},
							});
						}
					},
				},
				ยกเลิก: {
					cancel: true,
					callback: () => {},
				},
			},
			"medium",
			null,
			true
		);
	}

	async function onCreateOwnProblem() {
		window.location.href = `/menu?page=create_problem`;
	}

	//-------------------------------------------------------
	// Lifecycle
	//-------------------------------------------------------
	let loaded = false;
	onMount(async () => {
		const url = new URL(window.location.href);
		const problemIdParam = url.searchParams.get("problemId");

		if (problemIdParam) {
			const fetchedProblem = await api.call(`/problem/${problemIdParam}`, {
				withToken: true,
			});

			if (fetchedProblem) {
				const headersToSet = Array.isArray(fetchedProblem.headers)
					? fetchedProblem.headers.join(",")
					: typeof fetchedProblem.headers === "string"
						? fetchedProblem.headers
						: "";

				const functionsToSet = Array.isArray(fetchedProblem.functions)
					? fetchedProblem.functions.join(",")
					: typeof fetchedProblem.functions === "string"
						? fetchedProblem.functions
						: "";

				problem = {
					...problem,
					...fetchedProblem,
					difficulty: Number(fetchedProblem.difficulty),
					headers: headersToSet,
					functions: functionsToSet,
					id: problemIdParam,
				};

				if (fetchedProblem.author) {
					problem.author = { ...problem.author, ...fetchedProblem.author };
				}

				if (fetchedProblem.solutionCode) solutionCode = fetchedProblem.solutionCode;
				if (fetchedProblem.defaultCode) defaultCode = fetchedProblem.defaultCode;

				if (fetchedProblem.testCases)
					problem.testCases = fetchedProblem.testCases.map((tc) => ({
						...tc,
						result: { exit_code: null, exit_status: null, output: null, used_time: null },
					}));

				if (problem.devStatus === "Rejected" && problem.rejectedMessage) {
					showPopup(
						`โจทย์นี้ถูกไม่อนุมัติด้วยเหตุผล: ${problem.rejectedMessage}`,
						{
							โอเค: () => {},
						},
						"medium"
					);
				}
				loaded = true;
			} else {
				await showPopup("ไม่พบโจทย์ที่ระบุ", { ตกลง: () => goto("/menu?page=problem") });
				loaded = false;
				return;
			}
		} else {
			loaded = true;
		}
	});
</script>

{#snippet contentElement(activeTab)}
	{#if activeTab === "solutionCode"}
		<div class="full" in:azScale={{ delay: 250 }} out:azScale>
			<CodeEditor bind:value={solutionCode} />
		</div>
	{:else if activeTab === "defaultCode"}
		<div class="full" in:azScale={{ delay: 250 }} out:azScale>
			<CodeEditor bind:value={defaultCode} />
		</div>
	{:else if activeTab === "details"}
		<div class="full details" in:azScale={{ delay: 250 }} out:azScale>
			<div class="problemCreateInputContainer">
				<div class="headText">ชื่อโจทย์ :</div>
				<input bind:value={problem.title} placeholder="โจทย์ของคนสุดเทพ" />
			</div>
			<div class="problemCreateInputContainer">
				<div class="headText">
					ชื่อคนทำโจทย์ : {problem.author?.name || $userData?.name}
					{problem.author?.name == $userData?.name ? "(คุณ)" : ""}
				</div>
			</div>

			<div class="headText">ความยาก</div>

			<div class="difficulty">
				<Stars bind:difficulty={problem.difficulty}></Stars>
				<div class="difficultySlider">
					<input type="range" step="0.5" min="0.5" max="5" bind:value={problem.difficulty} />
					<div style="width: 40px; text-align: end">{problem.difficulty}</div>
				</div>
			</div>

			<div class="headText">เวลาสูงสุดที่อนุญาตให้รัน (ms)</div>

			<input type="number" bind:value={problem.timeLimit} placeholder="1000" />

			<div class="headText">ประเภท (Tags)</div>

			<Frame class="tagsBox">
				{#each Object.keys(tagsColors) as tag}
					<Checkbox
						color={tagsColors[tag]}
						value={tag}
						checked={problem.tags.includes(tag)}
						onSelect={() => {
							if (!problem.tags.includes(tag)) {
								problem.tags = [...problem.tags, tag];
							}
						}}
						onUnselect={() => {
							problem.tags = problem.tags.filter((t) => t !== tag);
						}}>{tag}</Checkbox
					>
				{/each}
			</Frame>

			<div class="headText">Headers</div>

			<div class="radioButtonContainer">
				<RadioButton
					selected={(() => {
						return problem.headerMode == "disallowed";
					})()}
					onclick={() => (problem.headerMode = "disallowed")}
					color="var(--status-not-started)"
				>
					ไม่อนุญาตให้ใช้
				</RadioButton>

				<RadioButton
					selected={problem.headerMode == "allowed"}
					onclick={() => (problem.headerMode = "allowed")}
					color="var(--status-done)"
				>
					จำเป็นต้องใช้
				</RadioButton>
			</div>

			<input bind:value={problem.headers} placeholder="stdio.h,string.h" />

			<div class="headText">Functions</div>

			<div class="radioButtonContainer">
				<RadioButton
					selected={problem.functionMode == "disallowed"}
					onclick={() => (problem.functionMode = "disallowed")}
					color="var(--status-not-started)"
				>
					ไม่อนุญาตให้ใช้
				</RadioButton>

				<RadioButton
					selected={problem.functionMode == "allowed"}
					onclick={() => (problem.functionMode = "allowed")}
					color="var(--status-done)"
				>
					จำเป็นต้องใช้
				</RadioButton>
			</div>

			<input bind:value={problem.functions} placeholder="for,while,if" />

			<div class="headText">รายละเอียดโจทย์</div>

			<textarea class="description" placeholder="รายละเอียดโจทย์" bind:value={problem.description}> </textarea>
		</div>
	{:else if activeTab === "inputOutput"}
		<div class="full" in:azScale={{ delay: 250 }} out:azScale>
			<InputOutput {onRunCode} bind:inputText bind:result />
		</div>
	{:else if activeTab === "testcase"}
		<div class="full testcase-section" in:azScale={{ delay: 250 }} out:azScale>
			<TestCaseContainer
				testCases={problem.testCases}
				editMode={true}
				runAll={runAllCreateProblem}
				{removeTestCase}
			/>
			<Button onclick={handleAddTestCaseContainer} class="addTestCase">เพิ่ม Test Case</Button>
		</div>
	{/if}
{/snippet}

<div id="problemCreateContainer" bind:this={mainScrollContainer}>
	<div class="sectionPanel">
		{#if loaded}
			{#if problem.id}
				<div class="devStatus" style="color: {statusStaffColors[problem.devStatus]};">
					✿ {statusStaffText[problem.devStatus]} ✿
				</div>
			{/if}

			<div class="mainFrame" in:azScale={{ delay: 250 }} out:azScale>
				<Tab
					class="problemCodeContainer"
					margin={false}
					headers={leftHeaderTabs}
					bind:activeTab={leftActiveTab}
				>
					{@render contentElement(leftActiveTab)}
				</Tab>

				<Tab class="side" margin={false} headers={rightHeaderTabs} bind:activeTab={rightActiveTab}>
					{@render contentElement(rightActiveTab)}
				</Tab>
			</div>

			{@const isAuthor = problem.author?.id == $userData?.id}

			{#if loaded}
				<div class="buttonContainer">
					{#if problem.id}
						{#if problem.devStatus === "Need Review" || problem.devStatus === "Published"}
							<Button
								color="var(--bg)"
								hoverColor="var(--status-not-started)"
								textColor="var(--status-not-started)"
								outline="var(--status-not-started)"
								onclick={rejectProblem}>ให้ไปแก้ไข</Button
							>
						{/if}
						{#if isAuthor}
							<Button
								color="var(--bg)"
								hoverColor="var(--grayed)"
								textColor="var(--grayed)"
								outline="var(--grayed)"
								onclick={archiveProblem}>เก็บโจทย์</Button
							>
							<Button
								color="var(--bg)"
								hoverColor="var(--status-in-progress)"
								textColor="var(--status-in-progress)"
								outline="var(--status-in-progress)"
								onclick={() => onUpdateProblem()}>อัพเดทโจทย์</Button
							>
							{#if problem.devStatus !== "Need Review"}
								<Button
									color="var(--bg)"
									hoverColor="var(--used-time)"
									textColor="var(--used-time)"
									outline="var(--used-time)"
									onclick={reviewProblem}
									title="ส่งให้ Staff ตรวจสอบ">ส่งเพื่อตรวจสอบ</Button
								>
							{/if}
						{:else}
							<Button
								color="var(--bg)"
								hoverColor="var(--status-in-progress)"
								textColor="var(--status-in-progress)"
								outline="var(--status-in-progress)"
								onclick={onCreateOwnProblem}>สร้างโจทย์ของตัวเอง</Button
							>
						{/if}

						{#if problem.devStatus === "Need Review"}
							<Button
								color="var(--bg)"
								hoverColor="var(--status-done)"
								textColor="var(--status-done)"
								outline="var(--status-done)"
								onclick={approveProblem}>อนุมัติโจทย์</Button
							>
						{/if}
					{:else}
						<Frame style="width: 100%;">
							<Button onclick={onCreateProblem}>สร้างโจทย์</Button>
						</Frame>
					{/if}
				</div>
			{/if}
		{:else}
			<div class="full" in:fade={{ duration: 250, delay: 250 }} out:fade={{ duration: 250 }}>
				<Loading></Loading>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.devStatus {
		padding: 10px;
		background: var(--bg);
		border-radius: var(--n-border-radius);
		border: 1px solid var(--outline);
		font-weight: 600;
		text-align: center;
		box-shadow: 0 4px 24px var(--list-shadow);
		font-size: 1rem;
	}
	//-------------------------------------------------------
	// Detail Pane Styles
	//-------------------------------------------------------
	:global(.addTestCase) {
		position: sticky;
		bottom: 0;
	}

	.details {
		display: flex;
		flex-direction: column;
		gap: var(--n-gap);
	}

	.headText {
		font-weight: 600;
		font-size: 0.9rem;
	}

	.problemCreateInputContainer {
		display: flex;
		align-items: center;
		gap: var(--n-gap);
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
		gap: var(--n-gap);
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
		&:disabled {
			background-color: var(--bg-disabled);
			cursor: not-allowed;
		}
	}

	//-------------------------------------------------------
	// Global Styles
	//-------------------------------------------------------
	:global(.tagsBox) {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 10px;
		gap: var(--n-gap);
	}

	//-------------------------------------------------------
	// Main Layout Styles
	//-------------------------------------------------------
	#problemCreateContainer {
		width: 100%;
		height: 100%;
	}

	:global(div.problemCodeContainer) {
		width: 60%;
		box-shadow: 0 4px 24px var(--list-shadow);
	}

	.sectionPanel {
		padding: 20px;
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: var(--n-gap);
	}

	.mainFrame {
		display: flex;
		flex-direction: row;
		height: 100%;
		width: 100%;
		gap: var(--n-gap);
		flex: 1;
		min-height: 0;
	}

	:global(div.side) {
		width: 40%;
	}

	:global(.buttonContainer) {
		display: flex;
		flex-direction: row;
		gap: var(--n-gap);
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
	}

	//-------------------------------------------------------
	// Responsive Styles
	//-------------------------------------------------------
	:global(html[mobile]) {
		.mainFrame {
			flex-direction: column;

			:global(.problemCodeContainer) {
				width: auto;
				height: 100%;
			}

			:global(div.side) {
				display: none;
			}
		}

		.buttonContainer {
			display: flex;
			justify-content: center;
		}
	}
</style>
