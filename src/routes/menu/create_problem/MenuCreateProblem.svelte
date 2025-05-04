<script lang="ts">
	import { tagsColors } from "$lib/constants/problem";
	import Button from "../../../components/Button.svelte";
	import Checkbox from "../../../components/Checkbox.svelte";
	import CodeEditor from "../../../components/CodeEditor.svelte";
	import Frame from "../../../components/Frame.svelte";

	let user = {
		name: "John Doe",
	};
	let selectedTags: string[] = [];
	let test_cases = [{ input: "", output: "", hidden: false }];
	let mainScrollContainer: HTMLElement | null = null;

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

	function enableHorizontalScroll(node: HTMLElement) {
		function onWheel(e: WheelEvent) {
			if (node.getAttribute("disabled") === "true") return;

			const scrollAmount = node.children[0].clientWidth * 0.8;

			e.deltaY > 0
				? node.scrollTo({
						top: 0,
						left: node.scrollLeft + scrollAmount,
						behavior: "smooth",
					})
				: node.scrollTo({
						top: 0,
						left: node.scrollLeft - scrollAmount,
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
</script>

<div id="problemCreateContainer" use:enableVerticalScroll bind:this={mainScrollContainer}>
	<div class="sectionPanel">
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
	</div>

	<div class="sectionPanel">
		<Frame blur-bg class="sectionContainer defaultCodeContainer">
			<div class="defaultCodeHeader">Default code</div>
			<div class="codeInputBox">
				<CodeEditor></CodeEditor>
			</div>
		</Frame>
	</div>

	<div class="sectionPanel">
		<Frame blur-bg class="sectionContainer codeInputandOutput">
			<div class="codeInputBox">
				<div class="codeButtonWrapper">
					<Button class="run">▷ รัน</Button>
				</div>
				<CodeEditor></CodeEditor>
			</div>
			<div class="terminalBox">
				<h1 class="headText">Terminal</h1>
				<textarea class="output" placeholder="Output here"></textarea>
			</div>
		</Frame>
	</div>

	<div class="sectionPanel">
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
	</div>
</div>

<style lang="scss">
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

	/*
	-------------------------------------------------------
	Common Input/Textarea Styles
	-------------------------------------------------------
	*/
	.problemNameInput,
	.problemDetailsInput,
	.codeInput,
	.output,
	.testCaseInput,
	.testCaseOutput {
		border: 1px solid var(--outline);
		border-radius: 5px;
		font-size: 1rem;
		line-height: 1.5rem;
		resize: none;
		background-color: var(--bg);
		color: var(--text);
		width: 100%;
		box-sizing: border-box;
	}

	/*
	-------------------------------------------------------
	Specific Input/Textarea Styles
	-------------------------------------------------------
	*/
	.problemNameInput {
		padding: 8px 10px;
		height: 2.5rem;
		flex-shrink: 0;
	}
	.problemDetailsInput {
		padding: 8px 10px;
		height: auto;
		min-height: 150px;
		flex-grow: 1;
	}
	.codeInput,
	.output {
		padding: 8px 10px;
		flex-grow: 1;
		white-space: pre;
		overflow: auto;
		min-height: 100px;
	}
	.testCaseInput {
		padding: 5px;
		height: 35vh;
		text-wrap: nowrap;
		overflow: auto;
	}
	.testCaseOutput {
		padding: 5px;
		height: 25vh;
		text-wrap: nowrap;
		overflow: auto;
	}

	/*
	-------------------------------------------------------
	Scrollbar Styles
	-------------------------------------------------------
	*/
	.codeInput,
	.output,
	.testCaseContainer,
	.testCaseInput,
	.testCaseOutput {
		&::-webkit-scrollbar {
			width: 8px;
			height: 8px;
		}
		&::-webkit-scrollbar-thumb {
			background: var(--darker);
			border-radius: 10px;
		}
		&::-webkit-scrollbar-thumb:hover {
			background: var(--darker-50);
		}
	}

	/*
	-------------------------------------------------------
	Problem Info Section Styles
	-------------------------------------------------------
	*/
	.problemHead {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 8px;
	}
	.userAndExDetails {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 15px;
		flex-grow: 1;
		overflow-y: auto;
		padding-right: 5px;
	}
	.username {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		flex-shrink: 0;
	}
	.tagsBox {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		flex-shrink: 0;
	}
	.tagsCheckboxGroup {
		background: var(--bg);
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		flex-grow: 1;
		border-radius: var(--n-border-radius);
		padding: 10px;
		border: 1px solid var(--outline);
	}

	/*
	-------------------------------------------------------
	Heading Text Styles
	-------------------------------------------------------
	*/
	.headText {
		color: var(--text);
		font-size: 1.2rem;
		line-height: 1.5rem;
		font-weight: 600;
		white-space: nowrap;
		margin: 0;
		padding-top: 5px;
	}

	.username .headText:last-child {
		font-size: 1rem;
	}

	.defaultCodeHeader {
		font-size: 30px;
		width: auto;
		text-align: center;
	}
	/*
	-------------------------------------------------------
	Code Input and Terminal Styles
	-------------------------------------------------------
	*/
	.codeInputBox,
	.terminalBox {
		display: flex;
		flex-direction: column;
		gap: 8px;
		flex: 1;
		min-width: 0;
	}

	.codeInputBox .headText,
	.terminalBox .headText {
		align-self: flex-start;
		flex-shrink: 0;
	}

	.codeButtonWrapper {
		display: flex;
		align-self: end;
		position: absolute;
	}

	.codeInputHead {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		flex-shrink: 0;
	}

	/*
	-------------------------------------------------------
	Test Case Section Styles
	-------------------------------------------------------
	*/
	.testCaseContainer {
		display: flex;
		flex-direction: row;
		gap: 10px;
		scroll-snap-type: x mandatory;
		overflow-x: scroll;
		padding-bottom: 10px;
	}

	.testCase {
		height: 100%;
		min-width: 25rem;
		max-width: 25rem;
		display: flex;
		flex-direction: column;
		gap: 12px;
		scroll-snap-align: start;
		animation: fade-in 0.2s ease-out forwards;
	}

	.hiddenTestcaseBox {
		display: flex;
		align-items: center;
		gap: 6px;
		color: var(--text);
		font-size: 1rem;
		line-height: 1.5rem;
	}

	/*
	-------------------------------------------------------
	Button Styles (Global and Specific)
	-------------------------------------------------------
	*/

	/*
	-------------------------------------------------------
	Media Queries
	-------------------------------------------------------
	*/
	@media (max-width: 768px) {
		:global(.sectionContainer) {
			padding: 15px;
		}
		:global(.codeInputandOutput) {
			flex-direction: column;
			height: calc(100% - 30px);
		}
		.codeInputBox,
		.terminalBox {
			flex: 1;
		}
	}

	@media (max-width: 1000px) {
		.testCase {
			min-width: 15.5rem;
			max-width: 15.5rem;
		}
	}
</style>
