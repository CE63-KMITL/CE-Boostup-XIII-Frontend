<script lang="ts">
	import "../../../app.css";
	import Button from "../../../components/Button.svelte";

	//Test data
	let user = {
		name: "John Doe",
	};
	let options = [
		{ id: "4", value: "K" },
		{ id: "3", value: "H" },
		{ id: "2", value: "O" },
		{ id: "1", value: "M" },
	];
	let first_option = "";
	let test_cases = [{ input: "", output: "", hidden: false }];

	//Add TestCase and Delete
	function addTestCase() {
		test_cases = [...test_cases, { input: "", output: "", hidden: false }];

		const scrollContainer = document.querySelector(".TestCaseBox") as HTMLElement;

		if (scrollContainer) {
			scrollContainer.scrollTo({
				left: scrollContainer.scrollWidth,
				behavior: "smooth",
			});
		}
	}

	function deleteTestCase(index: number) {
		test_cases = test_cases.filter((_, i) => i !== index);
	}

	function enableHorizontalScroll(node: HTMLElement) {
		function onWheel(e: WheelEvent) {
			if (node.getAttribute("disabled") == "") return;
			e.deltaY > 0
				? node.scrollTo({
						top: 0,
						left: node.scrollLeft + 330,
						behavior: "smooth",
					})
				: node.scrollTo({
						top: 0,
						left: node.scrollLeft - 330,
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

	function enableVerticalScroll(node: HTMLElement) {
		function onWheel(e: WheelEvent) {
			if (node.getAttribute("disabled") == "") return;
			e.deltaY > 0
				? node.scrollTo({
						top: node.scrollTop + node.clientHeight / 1.25,
						left: 0,
						behavior: "smooth",
					})
				: node.scrollTo({
						top: node.scrollTop - node.clientHeight / 1.25,
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

	function Disable_Node(target_node: HTMLElement) {
		target_node.setAttribute("disabled", "");
	}

	function Enable_Node(target_node: HTMLElement) {
		target_node.removeAttribute("disabled");
	}

	const done = {
		position: "fixed",
		bottom: "20px",
		right: "20px",
	};

	const deleteTC = {
		color: "var(--text)",
		"font-size": "1rem",
		"line-height": "1.5rem",
	};

	const addTC = {
		display: "flex",
		"align-items": "center",
		"justify-content": "center",
		position: "relative",
		top: "14px",
		"min-width": "7.5rem",
		"max-width": "7.5rem",
		height: "61.25vh",
		"font-size": "2.25rem",
		"line-height": "2.75rem",
		"font-weight": "600",
		"border-radius": "5px",
		"scroll-snap-align": "end",
	};
</script>

<div class="ProblemCreateContianer">
	<div class="Navbar"></div>
	<div id="MainScroll" class="ScrollSnap" use:enableVerticalScroll>
		<div class="ProblemInfo">
			<div class="ProblemHead">
				<h1 class="HeadText">Exercise Name</h1>
				<textarea class="ProblemNameInput" placeholder="Exercise Name"></textarea>
			</div>
			<div class="UserAndExDetails">
				<div class="Username">
					<h1 class="Avatar" style="color: green; font-weight:600">//Add avatar icon</h1>
					<h1 class="HeadText">{user.name}</h1>
				</div>
				<div class="TagsBox">
					<h1 class="HeadText">Tags</h1>
					<select class="Tags" bind:value={first_option}>
						{#each options as option}
							<option value={option.id}>{option.value}</option>
						{/each}
					</select>
				</div>
				<textarea class="ProblemDetailsInput" placeholder="Type exercise's detail here"></textarea>
			</div>
			<Button class="DoneButton" style={done}>Done</Button>
		</div>
		<div class="CodeInputandOutput">
			<div class="CodeInputBox">
				<div class="CodeInputHead">
					<h1 class="HeadText">Code</h1>
					<Button class="Run">Run</Button>
				</div>
				<textarea class="CodeInput" placeholder="Code here"></textarea>
			</div>
			<div class="TerminalBox">
				<h1 class="HeadText">Terminal</h1>
				<textarea class="Output" placeholder="Output here"></textarea>
			</div>
		</div>
		<div class="TestCase">
			<Button class="RunAll">Run All</Button>
			<div
				class="TestCaseBox"
				role="region"
				use:enableHorizontalScroll
				on:mouseenter={() => Disable_Node(document.getElementById("MainScroll"))}
				on:mouseleave={() => Enable_Node(document.getElementById("MainScroll"))}
			>
				{#each test_cases as test_case, i}
					<div class="TestCaseContainer">
						<div class="TestCaseCover">
							<h1 class="HeadText">Test Case {i + 1}</h1>
							<div class="HiddenTestcaseBox">
								<input class="CheckBox" type="checkbox" bind:checked={test_case.hidden} />
								<p>Hidden Test Case</p>
							</div>
							<textarea class="TestCaseInput" placeholder="Input here" bind:value={test_case.input}
							></textarea>
							<textarea
								class="TestCaseOutput"
								placeholder="Output here"
								bind:value={test_case.output}
							></textarea>
						</div>
						<Button class="Delete" style={deleteTC} on:click={() => deleteTestCase(i)}>Delete</Button>
					</div>
				{/each}
				<Button class="AddTestCase" style={addTC} on:click={addTestCase}>+</Button>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.ProblemCreateContianer {
		width: 100%;
		max-height: 100vh;
		height: auto;
		background-color: var(--bg);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow-y: auto;
		overflow-x: hidden;
	}
	.Navbar {
		position: fixed;
		top: 0px;
		height: 5rem;
		width: 100%;
		background-color: gray;
	}
	.ScrollSnap {
		margin-top: 5rem;
		height: calc(100vh - 5rem);
		width: 100%;
		overflow-y: auto;
		scroll-snap-type: y mandatory;
	}
	.ProblemInfo {
		width: 100%;
		height: calc(100vh - 5rem);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 16px;
		scroll-snap-align: start;
	}
	.ProblemHead {
		display: flex;
		flex-direction: column;
		width: 90%;
		gap: 12px;
	}
	.Username {
		display: flex;
		align-items: self-end;
		gap: 16px;
	}
	.TagsBox {
		display: flex;
		align-items: self-end;
		gap: 16px;
	}
	.HeadText {
		color: var(--text);
		font-size: 1.25rem;
		line-height: 1.75rem;
		font-weight: 600;
		align-self: self-start;
	}
	.Tags {
		border: 1px solid var(--outline);
		border-radius: 5px;
		padding: 5px;
	}
	.ProblemNameInput {
		border: 1px solid var(--outline);
		border-radius: 5px;
		padding: 5px;
		width: 50%;
		height: 2.5rem;
		font-size: 1rem;
		line-height: 1.5rem;
		resize: none;
	}
	.UserAndExDetails {
		display: flex;
		flex-direction: column;
		width: 90%;
		gap: 12px;
	}
	.UsernameText {
		font-size: 1rem;
		line-height: 1.5rem;
		font-weight: 300;
	}
	.ProblemDetailsInput {
		border: 1px solid var(--outline);
		border-radius: 5px;
		padding: 5px;
		width: 100%;
		height: 50vh;
		font-size: 1rem;
		line-height: 1.5rem;
		resize: none;
	}
	.CodeInputandOutput {
		width: 100%;
		height: calc(100vh - 5rem);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 2.5%;
		scroll-snap-align: start;
	}
	.CodeInputBox {
		width: 55%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 4px;
	}
	.CodeInputHead {
		display: flex;
		width: 100%;
		justify-content: space-between;
	}
	.CodeInput {
		height: 75vh;
		width: 100%;
		border: 1px solid var(--outline);
		border-radius: 5px;
		padding: 5px;
		font-size: 1rem;
		line-height: 1.5rem;
		resize: none;
		white-space: nowrap;
		overflow: auto;
	}
	.CodeInput::-webkit-scrollbar {
		width: 1vh;
		height: 1vh;
	}
	.CodeInput::-webkit-scrollbar-thumb {
		background: var(--darker);
		border-radius: 10px;
	}
	.CodeInput::-webkit-scrollbar-thumb:hover {
		background: var(--darker-50);
	}
	.CodeInput:focus {
		box-shadow: none;
	}
	.TerminalBox {
		width: 32.5%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 12px;
	}
	.Output {
		height: 75vh;
		width: 100%;
		border: 1px solid var(--outline);
		border-radius: 5px;
		padding: 5px;
		font-size: 1rem;
		line-height: 1.5rem;
		resize: none;
		white-space: nowrap;
		overflow: auto;
	}
	.TestCase {
		max-width: 90%;
		height: calc(100vh - 5rem);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-self: center;
		justify-content: center;
		gap: 16px;
		scroll-snap-align: start;
	}
	.TestCaseBox {
		display: flex;
		align-items: center;
		gap: 16px;
		overflow-x: auto;
		white-space: nowrap;
		scroll-behavior: smooth;
		max-width: 100%;
		padding-bottom: 15px;
		scroll-snap-type: x mandatory;
	}
	.TestCaseBox::-webkit-scrollbar {
		width: 1vh;
		height: 1vh;
	}
	.TestCaseBox::-webkit-scrollbar-thumb {
		background: var(--darker);
		border-radius: 10px;
	}
	.TestCaseBox::-webkit-scrollbar-thumb:hover {
		background: var(--darker-50);
	}
	.TestCaseBox:focus {
		box-shadow: none;
	}
	.TestCaseContainer {
		min-width: 25rem;
		max-width: 25rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 12px;
		scroll-snap-align: end;
	}
	.TestCaseCover {
		display: flex;
		width: 100%;
		flex-direction: column;
		gap: 12px;
	}
	.HiddenTestcaseBox {
		display: flex;
		align-items: center;
		gap: 6px;
		color: var(--text);
		font-size: 1rem;
		line-height: 1.5rem;
	}
	.CheckBox {
		width: 1.25rem;
		height: 1.5rem;
		appearance: none;
		border: 1px solid var(--outline);
		border-radius: 5px;
		cursor: pointer;
	}
	.CheckBox:checked::after {
		content: "✓";
		color: var(--text);
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: transparent;
		font-size: 1rem;
	}
	.TestCaseInput {
		height: 35vh;
		width: 100%;
		border: 1px solid var(--outline);
		border-radius: 5px;
		padding: 5px;
		font-size: 1rem;
		line-height: 1.5rem;
		text-wrap: nowrap;
		resize: none;
	}
	.TestCaseInput::-webkit-scrollbar {
		width: 1vh;
		height: 1vh;
	}
	.TestCaseInput::-webkit-scrollbar-thumb {
		background: var(--darker);
		border-radius: 10px;
	}
	.TestCaseInput::-webkit-scrollbar-thumb:hover {
		background: var(--darker-50);
	}
	.TestCaseInput:focus {
		box-shadow: none;
	}
	.TestCaseOutput {
		height: 25vh;
		width: 100%;
		border: 1px solid var(--outline);
		border-radius: 5px;
		padding: 5px;
		font-size: 1rem;
		line-height: 1.5rem;
		text-wrap: nowrap;
		resize: none;
	}
	.TestCaseOutput::-webkit-scrollbar {
		width: 1vh;
		height: 1vh;
	}
	.TestCaseOutput::-webkit-scrollbar-thumb {
		background: var(--darker);
		border-radius: 10px;
	}
	.TestCaseOutput::-webkit-scrollbar-thumb:hover {
		background: var(--darker-50);
	}
	.TestCaseOutput:focus {
		box-shadow: none;
	}
	@media (max-width: 1000px) {
		.CodeInputandOutput {
			flex-direction: column;
			gap: 12px;
		}
		.CodeInputBox {
			width: 90%;
		}
		.TerminalBox {
			width: 90%;
		}
		.TestCaseContainer {
			min-width: 15.5rem;
			max-width: 15.5rem;
		}
		.AddTestCase {
			min-width: 3.5rem;
			max-width: 3.5rem;
		}
	}

	@media (max-width: 1400px) {
		.ScrollSnap {
			scroll-snap-type: none;
		}
		.ProblemInfo {
			height: auto;
			margin-top: 2rem;
			scroll-snap-align: none;
		}
		.CodeInputandOutput {
			height: auto;
			margin-top: 9rem;
			scroll-snap-align: none;
		}
		.TestCase {
			height: auto;
			margin-top: 9rem;
			scroll-snap-align: none;
		}
		.TestCaseBox {
			scroll-snap-type: none;
			padding-right: 2px;
		}
	}
</style>
