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
	import { IsRole, userData } from "$lib/auth.local";
	import { Role } from "$lib/enum/role";
	import { mobile, updatePage } from "../pageManager";
	import { showPopup } from "$lib/components/PopUp.svelte";
	import { statusColors, statusStaffColors, statusStaffText, statusText } from "$lib/constants/problem";

	//-------------------------------------------------------
	// Component State
	//-------------------------------------------------------
	let leftActiveTab;
	let rightActiveTab;
	let rightHeaderTabs;
	let leftHeaderTabs;

	//-------------------------------------------------------
	// Code and Input/Output State
	//-------------------------------------------------------
	let codeText = "";
	let inputText = "";
	let result: any = {
		exit_code: null,
		exit_status: null,
		output: null,
		used_time: null,
	};

	//-------------------------------------------------------
	// Problem Data State
	//-------------------------------------------------------
	let currentProblemId: string | null = null;
	let problem: { [key: string]: any } = {};

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
			const result = await api.call(`/user/code/${currentProblemId}`, {
				method: "POST",
				data: { code },
				withToken: true,
			});

			if (!result) {
				showPopup("ไม่สามารถบันทึกโค้ดได้", { ตกลง: () => {} });
			}
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
					code: codeText,
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

	async function onSubmission() {
		for (let i = 0; i < problem.testCases.length; i++) {
			problem.testCases[i].result = {
				exit_code: null,
				exit_status: "RUNNING",
				output: null,
				used_time: null,
			};
		}

		const result = await api.call(`/problem/submission/${problem.id}`, {
			method: "POST",
			data: {
				code: codeText,
			},
			withToken: true,
		});

		if (result) {
			for (let i = 0; i < problem.testCases.length; i++) {
				problem.testCases[i].result = result[i];
			}
		}

		updateStatus();
	}

	function onViewProblem() {
		updatePage("create_problem");
	}

	let currentStatus;
	async function updateStatus() {
		try {
			const result = await api.call(`/user/problem-status/${currentProblemId}`, {
				withToken: true,
                    isAlert: false
			});

			if (result) {
				currentStatus = result?.status;
			}
		} catch (error) {
			currentStatus = "Not Started";
		}
	}

	//-------------------------------------------------------
	// Lifecycle
	//-------------------------------------------------------

	let problemIdFromUrl;

	onMount(async () => {
		const url = new URL(window.location.href);
		problemIdFromUrl = url.searchParams.get("problemId");

		if (problemIdFromUrl) {
			currentProblemId = problemIdFromUrl;
			problem = await api.call(`/problem/code/${currentProblemId}`, { withToken: true });
			document.title = "โจทย์: " + problem.title;
			updateStatus();
		}

		codeText = await loadCode();
	});

	$: {
		if ($mobile == true) {
			leftActiveTab = "code";

			if (problemIdFromUrl) {
				leftHeaderTabs = {
					code: "โค้ด",
					details: "รายละเอียดโจทย์",
					inputOutput: "รันโค้ด",
					testcase: "ส่ง",
				};
			} else {
				leftHeaderTabs = {
					code: "โค้ด",
					inputOutput: "รันโค้ด",
				};
			}

			rightActiveTab = "";
			rightHeaderTabs = {};
		} else {
			leftActiveTab = "code";
			rightActiveTab = "details";
			leftHeaderTabs = { code: "โค้ด" };

			if (problemIdFromUrl) {
				rightHeaderTabs = { details: "รายละเอียดโจทย์", inputOutput: "รันโค้ด", testcase: "ส่ง" };
			} else {
				rightActiveTab = "inputOutput";
				rightHeaderTabs = { inputOutput: "รันโค้ด" };
			}
		}
	}
</script>

{#snippet contentElement(activeTab)}
	{#if activeTab === "details"}
		<div class="full" in:azScale={{ delay: 250 }} out:azScale>
			<ProblemDetail {problem}></ProblemDetail>
		</div>
	{:else if activeTab === "inputOutput"}
		<div class="full" in:azScale={{ delay: 250 }} out:azScale>
			<InputOutput {onRunCode} bind:inputText bind:result></InputOutput>
		</div>
	{:else if activeTab === "testcase"}
		<div class="full" in:azScale={{ delay: 250 }} out:azScale>
			<TestCaseContainer runAll={onSubmission} editMode={false} testCases={problem.testCases} />
		</div>
	{:else if activeTab === "code"}
		<CodeEditor bind:value={codeText} {saveCode} {loadCode}></CodeEditor>
	{/if}
{/snippet}

<div class="component">
	<div class="full mainFrame">
		{#if currentStatus}
			<div class="status" style="color: {statusColors[currentStatus]};">
				✿ {statusText[currentStatus]} ✿
			</div>
		{/if}

		<div class="full subFrame">
			<Tab margin={false} class="ProblemContainer" headers={leftHeaderTabs} bind:activeTab={leftActiveTab}>
				{@render contentElement(leftActiveTab)}
			</Tab>

			<Tab margin={false} class="side" headers={rightHeaderTabs} bind:activeTab={rightActiveTab}>
				{@render contentElement(rightActiveTab)}
			</Tab>
		</div>

		{#if IsRole(Role.STAFF) && problemIdFromUrl}
			<Frame shadow={true}>
				<Button onclick={onViewProblem}>แก้ไขโจทย์</Button>
			</Frame>
		{/if}
	</div>
</div>

<style lang="scss">
	.component {
		display: contents;

		.status {
			padding: 10px;
			background: var(--bg);
			border-radius: var(--n-border-radius);
			border: 1px solid var(--outline);
			font-weight: 600;
			text-align: center;
			box-shadow: 0 4px 24px var(--list-shadow);
			font-size: 1rem;
		}

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

		//-------------------------------------------------------
		// Container Styles
		//-------------------------------------------------------
		:global(.ProblemContainer) {
			display: flex;
			flex-direction: column;
			width: 60%;
			box-shadow: 0 4px 24px var(--list-shadow);
			gap: var(--n-gap);
		}

		:global(.side) {
			width: 40%;
		}
	}

	:global(html[mobile] .component) {
		:global(.subFrame) {
			flex-direction: column;
		}

		:global(.ProblemContainer) {
			width: auto;
			height: 100%;
		}

		:global(div.side) {
			display: none;
		}
	}
</style>
