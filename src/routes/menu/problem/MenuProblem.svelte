<script lang="ts">
	/*
     -------------------------------------------------------
     Imports
     -------------------------------------------------------
     */
	import { IsRole } from "$lib/auth.local";
	import { type Problem } from "$lib/constants/problem";
	import { Role } from "$lib/enum/role";
	import * as api from "$lib/fetchApi";
	import { sleep } from "$lib/normalFunction";
	import { onDestroy, onMount } from "svelte";
	import Button from "../../../components/Button.svelte";
	import Checkbox from "../../../components/Checkbox.svelte";
	import Frame from "../../../components/Frame.svelte";
	import Search from "../../../components/Icons/Search.svelte";
	import ProblemDetail from "./components/ProblemDetail.svelte";
	import ProblemTable from "./components/ProblemTable.svelte";
	import { searchParams, selectedProblemId } from "./problem";
	import type { Unsubscriber } from "svelte/store";

	/*
     -------------------------------------------------------
     State Variables
     -------------------------------------------------------
     */
	let allProblems: (Problem | string)[] = [];
	let selectedProblem = null;

	let problemSelectorElement;
	let problemDetailsElement;

	let loaded = false;
	let maxPage;
	let oldQueryString = "";
	let loadingMore = false;

	/*
     -------------------------------------------------------
     Helper Functions
     -------------------------------------------------------
     */
	async function runProblemListAnimation(dataIds: string[]) {
		for (let i = 0; i < dataIds.length; i++) {
			const dataId = dataIds[i];
			const element: HTMLDivElement = document.querySelector(`[data-problem-id="${dataId}"]`);
			if (element) {
				element.style.animation = `slide-in 0.2s ease-out forwards`;
				await sleep(70);
			}
		}
	}

	async function getQueryString() {
		const searchQuery = {
			searchText: $searchParams["searchText"] || "",
			idReverse: Boolean($searchParams["idReverse"]),
			tags: $searchParams.tag || [],
			difficultySortBy: $searchParams.difficultySortBy,
			minDifficulty: Number($searchParams.minDifficulty),
			maxDifficulty: Number($searchParams.maxDifficulty),
			status: $searchParams.status,
			staff: $searchParams.staff,
		};

		const queryString = Object.entries(searchQuery)
			.filter(
				([_, value]) =>
					value !== null &&
					value !== false &&
					value !== "" &&
					(!Array.isArray(value) || value.length > 0)
			)
			.map(([key, value]) => {
				if (Array.isArray(value)) {
					return `${key}=${value.join("&")}`;
				}
				return `${key}=${value}`;
			})
			.join("&");

		return queryString;
	}

	/*
     -------------------------------------------------------
     Data Fetching and Updating
     -------------------------------------------------------
     */
	async function updateProblems(isLoadMore = false) {
		const queryString = await getQueryString();
		if (queryString === oldQueryString && (!isLoadMore || maxPage <= $searchParams.page)) return;
		oldQueryString = queryString;

		if (isLoadMore) {
			$searchParams.page++;
			allProblems = [...allProblems, "loading"];
		} else {
			$selectedProblemId = null;
			$searchParams.page = 1;
			loaded = false;
			allProblems = [];
		}

		const getAllProblems = await api.call(
			`/problem/search?${queryString}&page=${Number($searchParams.page) || 1}`,
			{
				withToken: true,
			}
		);

		console.log(getAllProblems);

		if (getAllProblems && getAllProblems.data.length > 0) {
			if (isLoadMore) {
				allProblems = [...allProblems.slice(0, -1), ...getAllProblems.data];
				requestAnimationFrame(() => {
					runProblemListAnimation(getAllProblems.data.map((item) => item.id));
				});
			} else {
				allProblems = getAllProblems.data;
				requestAnimationFrame(() => {
					runProblemListAnimation(getAllProblems.data.map((item) => item.id));
				});
				maxPage = getAllProblems.totalPage;
				loaded = true;
			}
		} else {
			if (isLoadMore) {
				allProblems = allProblems.slice(0, -1);
				$searchParams.page--;
			} else {
				maxPage = null;
				allProblems = [];
				loaded = true;
			}
		}
	}

	async function loadMore() {
		if (loadingMore) return;
		console.log("load more");
		loadingMore = true;
		await updateProblems(true);
		loadingMore = false;
	}

	async function updateProblemDetail() {
		if (!$selectedProblemId) return;
		if (selectedProblem) {
			selectedProblem.detail = await api.call(`/problem/detail/${$selectedProblemId}`, {
				withToken: true,
			});
		}
	}

	/*
     -------------------------------------------------------
     Lifecycle Hooks
     -------------------------------------------------------
     */
	let subscribeSearchParams: Unsubscriber;
	onMount(async () => {
		problemSelectorElement = document.querySelector("#problem #left");
		problemDetailsElement = document.querySelector("#problem #right");

		await updateProblems();

		subscribeSearchParams = searchParams.subscribe(() => {
			updateProblems();
		});
	});

	onDestroy(() => {
		subscribeSearchParams();
	});

	/*
     -------------------------------------------------------
     Reactive Statements
     -------------------------------------------------------
     */
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

	$: {
		selectedProblem =
			allProblems.find((problem) => typeof problem === "object" && problem.id === $selectedProblemId) ||
			selectedProblem;
	}
</script>

<div id="problem">
	<Frame id="left" full="" blur-bg>
		<div class="top-frame">
			<Frame id="search-frame">
				<Search></Search>
				<input
					id="search"
					placeholder="ค้นหา"
					oninput={(e: any) => {
						$searchParams["searchText"] = e.target.value;
					}}
				/>
			</Frame>
			{#if IsRole(Role.STAFF)}
				<Checkbox
					id="staff-mode"
					selected={$searchParams.staff}
					onclick={(value) => ($searchParams.staff = value)}>โหมดแก้ไข</Checkbox
				>
			{/if}
		</div>
		<ProblemTable problems={allProblems} loading={!loaded} {loadMore} />
	</Frame>
	<Frame id="right" blur-bg>
		<ProblemDetail problem={selectedProblem} />
		<Button
			class="submit-btn"
			onclick={() => {
				window.open("/code?id=" + selectedProblem?.id, "_blank");
			}}>ทำโจทย์</Button
		>
	</Frame>
</div>

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
			transition: all 0.25s ease;
			display: flex;
			flex-direction: column;
			overflow: hidden;
		}

		:global(#right) {
			transition: all 0.25s ease;
			display: flex;
			align-items: center;
			justify-content: center;
			overflow: hidden;
		}

		:global(.problem-list) {
			opacity: 0;
		}

		:global(#header) {
			animation: fade-in 0.3s 0.3s ease-in-out forwards;
		}

		:global(#staff-mode) {
			min-width: max-content;
			padding: 10px;
		}
	}

	.top-frame {
		display: flex;
		flex-direction: row;
		align-items: center;
		align-content: center;
		justify-content: space-between;
	}

	@media (min-width: 800px) {
		#problem {
			:global(#left) {
				width: 65%;
			}

			:global(#left[full]) {
				width: 100%;
				margin-right: -5px;
			}

			:global(#right:not([show])) {
				width: 0;
				padding-inline: 0;
				margin-inline: 0;
				animation: fade-out 0.3s ease-in-out forwards;
			}

			:global(#right[show]) {
				width: 35%;
				opacity: 1;
				animation: fade-in 0.3s ease-in-out forwards;
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
		width: 100%;
	}
</style>
