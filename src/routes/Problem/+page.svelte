<script lang="ts">
	import Frame from "../../components/Frame.svelte";
	import Fullscreen from "../../components/Fullscreen.svelte";
	import { selectedProblemId } from "./problem";
	// Import the store

	import { onMount } from "svelte";
	import ProblemTable from "./components/ProblemTable.svelte";
	import { testProblems } from "./problem";

	let searchTerm = "";

	$: filteredProblems = testProblems.filter(
		(p) =>
			p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			p.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
			p.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
			p.id.includes(searchTerm)
	);

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
		<Frame id="left" full="">
			<Frame id="search-frame">
				<svg
					id="search-icon"
					fill="none"
					width="35"
					height="36"
					viewBox="0 0 35 36"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M16.0417 28.2083C22.485 28.2083 27.7083 22.985 27.7083 16.5417C27.7083 10.0983 22.485 4.875 16.0417 4.875C9.59834 4.875 4.375 10.0983 4.375 16.5417C4.375 22.985 9.59834 28.2083 16.0417 28.2083Z"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M30.625 31.125L24.2812 24.7812"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				<input id="search" placeholder="ค้นหา" bind:value={searchTerm} />
			</Frame>
			<ProblemTable problems={filteredProblems} />
		</Frame>
		<Frame id="right">
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
		container-type: inline-size;

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
	}

	:global(#search-frame) {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-inline: 10px;
	}

	#search-icon path {
		stroke: var(--text);
	}
</style>
