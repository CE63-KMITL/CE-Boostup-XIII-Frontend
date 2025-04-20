<script lang="ts">
	export let data;
	export let show;

	import * as api from "$lib/fetchApi";
	import { onMount } from "svelte";
	import Frame from "../../components/Frame.svelte";
	import Fullscreen from "../../components/Fullscreen.svelte";
	import Search from "../../components/Icons/Search.svelte";
	import ProblemDetail from "./components/ProblemDetail.svelte";
	import ProblemTable from "./components/ProblemTable.svelte";
	import { searchParams, selectedProblemId, type Problem } from "./problem";

	let allProblems: (Problem | string)[] = [];
	let selectedProblem = null;
	let problemDetail = "";

	let problemSelectorElement;
	let problemDetailsElement;

	let loaded = false;

	async function updateProblems() {
		allProblems = [];
		loaded = false;

		const tags = searchParams["tag"] || [];
		const searchQuery = {
			searchText: searchParams["searchText"] || "",
			idReverse: Boolean(searchParams["idReverse"]),
			tag: tags,
			difficulty: Number(searchParams["difficulty"]) || undefined,
			status: Number(searchParams["status"]) || undefined,
			page: Number(searchParams["page"]) || 1,
		};

		const queryString = Object.entries(searchQuery)
			.filter(([_, value]) => value !== undefined)
			.map(([key, value]) => {
				if (Array.isArray(value)) {
					return value.map((v) => `${key}=${v}`).join("&");
				}
				return `${key}=${value}`;
			})
			.join("&");

		const getAllProblems = await api.call(`/problem/search?${queryString}`, {
			withToken: true,
		});

		console.log(getAllProblems);

		if (getAllProblems) {
			allProblems = getAllProblems.items;
			loaded = true;
		} else {
			allProblems = [];
		}
	}

	async function updateProblemDetail() {
		if (!$selectedProblemId) return;
		problemDetail = await api.call(`/problem/detail/${$selectedProblemId}`, {
			withToken: true,
		});
	}

	onMount(async () => {
		console.log(import.meta.env);
		console.log(data);

		problemSelectorElement = document.querySelector("#problem #left");
		problemDetailsElement = document.querySelector("#problem #right");

		await updateProblems();
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

				problemDetailsElement?.setAttribute("show", "");
				problemSelectorElement?.removeAttribute("full");
			} else {
				problemDetailsElement?.removeAttribute("show");
				problemSelectorElement?.setAttribute("full", "");
			}

			updateProblemDetail();
			previousSelectedId = $selectedProblemId;
		}
	}

	$: selectedProblem = allProblems.find(
		(problem) => typeof problem === "object" && problem.id === $selectedProblemId
	);
</script>

<div id="problem" data-show={show}>
	<Frame id="left" full="" blur-bg>
		<Frame id="search-frame">
			<Search></Search>
			<input
				id="search"
				placeholder="ค้นหา"
				oninput={(e: any) => {
					searchParams["searchText"] = e.target.value = e.target.value;
				}}
			/>
		</Frame>
		<ProblemTable problems={allProblems} loading={!loaded} />
	</Frame>
	<Frame id="right" blur-bg>
		<ProblemDetail problem={selectedProblem} detail={problemDetail} />
	</Frame>
</div>

<style lang="scss">
	@keyframes show {
		0% {
			transform: scale(0.95);
		}

		100% {
			transform: scale(1);
		}
	}

	@keyframes hide {
		0% {
			pointer-events: none;
			transform: scale(1);
		}

		100% {
			pointer-events: none;
			transform: scale(0.95);
			display: none;
		}
	}

	@keyframes -global-show-opacity {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	@keyframes -global-hide-opacity {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}

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
			animation: all 0.3s ease-in-out;
			display: flex;
			flex-direction: column;
			overflow: hidden;
		}

		:global(#right) {
			animation: all 0.3s ease-in-out;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		&[data-show="true"] {
			animation: show 0.3s ease forwards;

			:global(#left),
			:global(#right[show]) {
				animation: show-opacity 0.3s ease-in-out forwards;
			}
		}

		&[data-show="false"] {
			animation: hide 0.3s ease forwards;

			:global(#left),
			:global(#right[show]) {
				animation: hide-opacity 0.3s ease-in-out forwards;
			}
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
				animation: hide-opacity 0.3s ease-in-out forwards;
			}

			:global(#right[show]) {
				width: 35%;
				opacity: 1;
				animation: show-opacity 0.3s ease-in-out forwards;
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
