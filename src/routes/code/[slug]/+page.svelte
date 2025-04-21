<script>
	import { onDestroy, onMount } from "svelte";
	import Button from "../../../components/Button.svelte";
	let isMobileHorizon = false;
	let isVertical = false;

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

	$: Dynamic1 = isVertical
		? "VerticalProblemContainer"
		: isMobileHorizon
			? "HorizonProblemContainer"
			: "ProblemContainer";
	$: Dynamic2 = isVertical ? "VerticalCodeInputBox" : isMobileHorizon ? "HorizonCodeInputBox" : "CodeInputBox";
	$: Dynamic3 = isVertical
		? "VerticalInfoAndTestcaseBox"
		: isMobileHorizon
			? "HorizonInfoAndTestcaseBox"
			: "InfoAndTestcaseBox";

	const run = {
		width: "12.5vh",
		"border-radius": "10px",
		padding: "0px",
		"font-size": "2vh",
		"font-weight": "600",
	};

	const submit = {
		width: "12.5vh",
		"border-radius": "10px",
		padding: "0px",
		"font-size": "2vh",
		"font-weight": "600",
	};
</script>

<div class={Dynamic1}>
	<div class={Dynamic2}>
		<div class="WrapButton">
			<Button class="Run" style={run}>Run</Button>
			<Button class="Submit" style={submit}>Submit</Button>
		</div>
		<textarea class="CodeInput" placeholder="Enter your code..."></textarea>
	</div>
	<div class={Dynamic3}>
		<div class="HeadAndDescriptionBox">
			<h1 class="ProblemHead">Head</h1>
			<p class="ProblemDescription">
				Descriptionaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
			</p>
		</div>
		<div class="TestcaseBox">
			<div class="TestcaseWrap">
				<p class="TestcaseNo">Test case1</p>
				<p class="InputAndOutput">Input:</p>
				<p class="InputAndOutput">Output:</p>
			</div>
			<div class="TestcaseWrap">
				<p class="TestcaseNo">Test case1</p>
				<p class="InputAndOutput">Input: 11111111111111111111111111111111111111111aaaaaaaaaaaaaaaaaaaa</p>
				<p class="InputAndOutput">Output:</p>
			</div>
			<div class="TestcaseWrap">
				<p class="TestcaseNo">Test case1</p>
				<p class="InputAndOutput">Input:</p>
				<p class="InputAndOutput">Output:</p>
			</div>
			<div class="TestcaseWrap">
				<p class="TestcaseNo">Test case1</p>
				<p class="InputAndOutput">Input:</p>
				<p class="InputAndOutput">Output:</p>
			</div>
			<div class="TestcaseWrap">
				<p class="TestcaseNo">Test case1</p>
				<p class="InputAndOutput">Input:</p>
				<p class="InputAndOutput">Output:</p>
			</div>
		</div>
	</div>
</div>

<style>
	.ProblemContainer {
		display: flex;
		align-items: center;
		justify-content: space-around;
		width: 100%;
		height: 100%;
		background-color: var(--bg);
	}
	.CodeInputBox {
		height: 80%;
		width: 70%;
	}

	.WrapButton {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 7.5%;
		background-color: var(--darker);
		border: 2px solid var(--outline);
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		gap: 20px;
		color: var(--text);
	}
	.CodeInput {
		width: 100%;
		height: 92.5%;
		background-color: var(--darker-50);
		border: 2px solid var(--outline);
		border-top: none;
		border-radius: 20px;
		border-top-left-radius: 0px;
		border-top-right-radius: 0px;
		resize: none;
		padding: 15px;
		padding-left: 20px;
		padding-right: 20px;
		font-size: 2vh;
		white-space: nowrap;
		overflow: auto;
	}

	.CodeInput:focus {
		border: 2px solid var(--outline);
		border-top: none;
		outline: none;
		box-shadow: none;
	}
	.InfoAndTestcaseBox {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		padding-top: 20px;
		width: 25%;
		height: 80%;
		background-color: var(--darker-50);
		border: 2px solid var(--outline);
		border-radius: 20px;
	}
	.HeadAndDescriptionBox {
		width: 90%;
		height: 30%;
		background-color: var(--bg-50);
		border: 2px solid var(--outline);
		border-radius: 10px;
	}
	.ProblemHead {
		max-height: 30%;
		text-align: center;
		font-size: 4vh;
		font-weight: 500;
		color: var(--text);
		border-bottom: 2px solid var(--outline);
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		background-color: var(--darker);
		padding-left: 15px;
		padding-right: 15px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.ProblemDescription {
		max-height: 65%;
		margin: 5px 0px 10px 10px;
		padding-right: 5px;
		font-size: 2vh;
		color: var(--description);
		white-space: normal;
		word-break: break-word;
		overflow: auto;
	}

	.TestcaseBox {
		display: flex;
		flex-direction: column;
		width: 90%;
		height: 60%;
		background-color: var(--bg-50);
		border: 2px solid var(--outline);
		border-radius: 10px;
		padding: 15px;
		padding-right: 10px;
		gap: 30px;
		font-size: 2vh;
		white-space: normal;
		word-break: break-word;
		overflow: auto;
	}

	.TestcaseNo {
		font-size: 2.25vh;
		font-weight: 600;
		color: var(--text);
	}
	.InputAndOutput {
		color: var(--description);
	}
	.VerticalProblemContainer {
		display: flex;
		flex-direction: column-reverse;
		gap: 25px;
		align-items: center;
		width: 100%;
		height: 150vh;
		background-color: var(--bg);
	}
	.VerticalCodeInputBox {
		height: 50%;
		width: 90%;
		margin-bottom: 25px;
	}
	.VerticalInfoAndTestcaseBox {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		margin-top: 25px;
		padding-top: 20px;
		padding-bottom: 20px;
		width: 90%;
		height: 50%;
		background-color: var(--darker-50);
		border: 2px solid var(--outline);
		border-radius: 20px;
	}
	.HorizonProblemContainer {
		display: flex;
		flex-direction: column-reverse;
		align-items: center;
		width: 100%;
		height: 150vh;
		gap: 25px;
		background-color: var(--bg);
	}
	.HorizonCodeInputBox {
		height: 50%;
		width: 90%;
		margin-bottom: 25px;
	}
	.HorizonInfoAndTestcaseBox {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		margin-top: 25px;
		padding-top: 20px;
		padding-bottom: 20px;
		width: 90%;
		height: 50%;
		background-color: var(--darker-50);
		border: 2px solid var(--outline);
		border-radius: 20px;
	}
</style>
