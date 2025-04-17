<script lang="ts">
	import Frame from "../../components/Frame.svelte";
	import Fullscreen from "../../components/Fullscreen.svelte";
	import { selectedProblemId } from "./problem";
	// Import the store

	import { onMount } from "svelte";
	import Search from "../../components/Icons/Search.svelte";
	import ProblemTable from "./components/ProblemTable.svelte";
	import { testProblems } from "./problem";

	let searchTerm = "";

	// $: filteredProblems = testProblems.filter(
	// 	(p) =>
	// 		p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
	// 		p.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
	// 		p.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
	// 		p.id.includes(searchTerm)
	// );

	let problemSelector;
	let problemDetails;
	onMount(() => {
		problemSelector = document.querySelector("#problem #left");
		problemDetails = document.querySelector("#problem #right");
	});

	let previousSelectedId: string | null = null;
	$: {
		if (previousSelectedId !== $selectedProblemId) {
			if (previousSelectedId) {
				const oldProblemElement = document.querySelector(`[data-problem-id="${previousSelectedId}"]`);
				if (oldProblemElement) {
					oldProblemElement.removeAttribute("selected");
				}
			}

			if ($selectedProblemId) {
				const newProblemElement = document.querySelector(`[data-problem-id="${$selectedProblemId}"]`);
				if (newProblemElement) {
					newProblemElement.setAttribute("selected", "");
				}

				problemDetails?.setAttribute("show", "");
				problemSelector?.removeAttribute("full");
			} else {
				problemDetails?.removeAttribute("show");
				problemSelector?.setAttribute("full", "");
			}
			previousSelectedId = $selectedProblemId;
		}
	}
</script>

<Fullscreen>
	<div id="problem">
		<Frame id="left" full="" blur-bg>
			<Frame id="search-frame">
				<Search></Search>

				<input id="search" placeholder="ค้นหา" bind:value={searchTerm} />
			</Frame>
			<ProblemTable problems={testProblems} />
		</Frame>
		<Frame id="right" blur-bg>
			<div class="placeholder">Select a problem to view details</div>
		</Frame>
	</div>
</Fullscreen>

<style lang="scss">
	#problem {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		gap: 0px;
		padding: 15px;
		box-sizing: border-box;
		container-type: size;

		:global(#left) {
			transition: all 0.3s ease;
			display: flex;
			flex-direction: column;
			overflow: hidden;
		}

		:global(#right) {
			transition: all 0.3s ease;
			display: flex;
			align-items: center;
			justify-content: center;
			opacity: 0;
		}
	}

	@media (min-width: 800px) {
		#problem {
			:global(#left) {
				width: 65%;
			}

			:global(#left[full]) {
				width: 100%;
			}

			:global(#right:not([show])) {
				width: 0;
				padding-inline: 0;
				margin-inline: 0;
			}

			:global(#right[show]) {
				width: 35%;
				opacity: 1;
			}
		}
	}

	@media (min-width: 0px) and (max-width: 800px) {
		#problem {
			flex-direction: column;

			:global(#left) {
				width: 100% !important;
				height: 100%;
			}

			:global(#right) {
				position: fixed;
				bottom: 0;
				width: 100%;
				left: 0;
				padding: 0;
				margin: 0;
				border-radius: var(--n-border-radius) var(--n-border-radius) 0px 0px;
			}

			:global(#right:not([show])) {
				height: 0;
			}

			:global(#right[show]) {
				height: 70%;
				opacity: 1;
			}
		}
	}

	#search {
		width: 100%;
		padding: 10px 15px;
		border: none;
		border-radius: 5px;
		color: var(--text);
		font-size: 1rem;
		outline: solid 2px transparent;
		font-weight: 500;
		background: transparent;

		&::placeholder {
			color: var(--place-holder);
		}

		@container (max-width: 500px) or (max-height: 600px) {
			font-size: 0.8rem;
		}
	}

	:global(#search-frame) {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-inline: 10px;
	}
</style>
