<script lang="ts">
	import "../../../app.css";
	import Button from "../../../components/Button.svelte";
	import Fullscreen from "../../../components/Fullscreen.svelte";

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
		if(test_cases.length != 1){
			test_cases = test_cases.filter((_, i) => i !== index);
		}
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
		let isScrolling = false;

		function onWheel(e: WheelEvent) {
			if (node.getAttribute("disabled") == "") return;

			if (!isScrolling) {
				isScrolling = true;
				let direction = e.deltaY > 0 ? 1 : -1;
				let nextScrollTop = node.scrollTop + direction * node.clientHeight;

				node.scrollTo({
					top: nextScrollTop,
					behavior: "smooth",
				});

				setTimeout(() => {
					isScrolling = false;
				}, 1200);
			}
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
</script>

<Fullscreen>
	<div class="ProblemCreateContianer">
		<div id="MainScroll" class="ScrollSnap" use:enableVerticalScroll>
			<div class="ProblemInfo">
				<div class="ProblemWrap">
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
				</div>
				<div class="Width">
					<Button class="DoneButton">Done</Button>
				</div>
			</div>
			<div class="CodeInputandOutput">
				<div class="CodeInputandOutputWrap">
					<div class="CodeInputBox">
						<div class="CodeInputHead">
							<h1 class="HeadText">Code</h1>
							<div class="RunWidth">
								<Button class="Run">Run</Button>
							</div>
						</div>
						<textarea class="CodeInput" placeholder="Code here"></textarea>
					</div>
					<div class="TerminalBox">
						<h1 class="HeadText">Terminal</h1>
						<textarea class="Output" placeholder="Output here"></textarea>
					</div>
				</div>
				<div class="Width">
					<Button class="DoneButton">Done</Button>
				</div>
			</div>
			<div class="TestCase">
				<div class="TestCaseBoxWrap">
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
								<Button class="Delete" on:click={() => deleteTestCase(i)}>Delete</Button>
							</div>
						{/each}
						<Button class="AddTestCase" on:click={addTestCase}>+</Button>
					</div>
				</div>
				<div class="ButtonWrap">
					<div class="Width">
						<Button class="RunAll">Run All</Button>
					</div>
					<div class="Width">
						<Button class="DoneButton">Done</Button>
					</div>
				</div>
			</div>
		</div>
	</div>
</Fullscreen>

<style lang="scss">
	.RunWidth{
		width: 5rem;
	}
	.Width{
		width: 5rem;
		margin-left: 10%;
		margin-right: 10%;
		align-self: self-end;
	}
	.ProblemCreateContianer {
		width: 100%;
		max-height: 100vh;
		height: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow-y: auto;
		overflow-x: hidden;
	}
	.ScrollSnap {
		height: 100vh;
		width: 100%;
		overflow-y: auto;
		scroll-snap-type: y mandatory;
		scroll-behavior: smooth;
	}
	.ProblemInfo {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		scroll-snap-align: start;
		gap: 1rem;
	}
	.ProblemWrap {
		width: 90%;
		background-color: var(--bg-50);
		border: 1px solid var(--outline);
		border-radius: 15px;
		padding: 1.5rem;
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
		width: 60%;
		height: 2.5rem;
		font-size: 1rem;
		line-height: 1.75rem;
		resize: none;
	}
	.UserAndExDetails {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 12px;
	}
	.ProblemDetailsInput {
		border: 1px solid var(--outline);
		border-radius: 5px;
		padding: 5px;
		width: 100%;
		height: 50vh;
		font-size: 1rem;
		line-height: 1.75rem;
		resize: none;
	}
	.CodeInputandOutput {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		scroll-snap-align: start;
	}
	.CodeInputandOutputWrap{
		width: 90%;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 2.5%;
		background-color: var(--bg-50);
		border: 1px solid var(--outline);
		border-radius: 15px;
		padding: 1.5rem;
	}
	.CodeInputBox {
		width: 70%;
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
		height: 65vh;
		width: 100%;
		border: 1px solid var(--outline);
		border-radius: 5px;
		padding: 5px;
		font-size: 1rem;
		line-height: 1.75rem;
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
		height: 65vh;
		width: 100%;
		border: 1px solid var(--outline);
		border-radius: 5px;
		padding: 5px;
		font-size: 1rem;
		line-height: 1.75rem;
		resize: none;
		white-space: nowrap;
		overflow: auto;
	}
	.TestCase {
		width: 100%;
		height: 100vh;
		gap: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		scroll-snap-align: start;
	}
	.TestCaseBoxWrap{
		max-width: 90%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background-color: var(--bg-50);
		border: 1px solid var(--outline);
		border-radius: 15px;
	}
	.TestCaseBox {
		display: flex;
		align-items: center;
		gap: 1rem;
		overflow-x: auto;
		white-space: nowrap;
		scroll-behavior: smooth;
		max-width: 100%;
		padding: 1.5rem;
		scroll-padding-right: 2rem;
		scroll-snap-type: x mandatory;
	}
	.TestCaseBox::-webkit-scrollbar {
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
		gap: 1rem;
		scroll-snap-align: end;
	}
	.TestCaseCover {
		display: flex;
		width: 100%;
		flex-direction: column;
		gap: 1rem;
	}
	.HiddenTestcaseBox {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--text);
		font-size: 1rem;
		line-height: 1.75rem;
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
		height: 15rem;
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
		height: 12rem;
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
	:global(.AddTestCase){
		position: relative;
		top: 0.75rem;
		height: 28rem;
		min-width: 7.5rem;
		max-width: 7.5rem;
		scroll-snap-align: end;
	}
	.ButtonWrap{
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: space-between;
	}

	@media (max-width: 1000px) {
		.ProblemInfo {
			gap: 0.5rem;
		}
		.CodeInputandOutput {
			flex-direction: column;
			gap: 0.5rem;
			margin-top: 1.125rem;
		}
		.CodeInputandOutputWrap {
			flex-direction: column;
			gap: 1rem;
		}
		.CodeInputBox {
			width: 90%;
			height: 20rem;
		}
		.TerminalBox {
			width: 90%;
			height: 20rem;
		}
		.TestCaseContainer {
			min-width: 15.5rem;
			max-width: 15.5rem;
		}
		.TestCase {
			margin-top: 1.125rem;
			gap: 0.5rem;
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
			margin-top: 5rem;
			scroll-snap-align: none;
		}
		.TestCase {
			height: auto;
			margin-top: 5rem;
			scroll-snap-align: none;
			margin-bottom: 1.125rem;
		}
		.TestCaseBox {
			scroll-snap-type: none;
		}
	}
</style>
