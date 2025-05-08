<script lang="ts">
	import { statusColors, statusText, type Problem } from "$lib/constants/problem";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	import HeaderSelection from "../$lib/components/HeaderSelection.svelte";
	import Filter from "../$lib/components/Icons/Filter.svelte";
	import Sort from "../$lib/components/Icons/Sort.svelte";
	import List from "../$lib/components/List.svelte";
	import Loading from "../$lib/components/Loading.svelte";
	import LoadingList from "../$lib/components/LoadingList.svelte";
	import RadioButton from "../$lib/components/RadioButton.svelte";
	import TableRenderer from "../$lib/components/TableRenderer.svelte";
	import { searchParams } from "../problem";
	import HeaderDifficulty from "./Header-Difficulty.svelte";
	import HeaderTags from "./Header-Tags.svelte";
	import ProblemRow from "./ProblemRow.svelte";

	export let loading = false;
	export let loadMore;

	let tagsElement;
	let difficultyElement;
	let difficultyTagsElement;
	let statusElement;

	export let problems: (Problem | string)[];
	onMount(() => {
		const problem_table = document.getElementById("problem-table");
		const head_list: HTMLElement = document.querySelector("#problem-table #header");

		function updateScroll() {
			head_list.setAttribute("top", problem_table.scrollTop > 0 ? "false" : "true");

			if (!loading && problem_table.scrollHeight - problem_table.scrollTop - problem_table.clientHeight < 20) {
				loadMore();
			}
		}

		if (problem_table) {
			problem_table.addEventListener("scroll", updateScroll);

			updateScroll();
		}
	});
</script>

<TableRenderer id="problem-table">
	<List id="header" class="problem-list" top="true">
		<div
			class="problem-id-header"
			onclick={() => {
				$searchParams.idReverse = !$searchParams.idReverse;
			}}
		>
			ข้อที่

			<p id="sort" class:upsidedown={$searchParams.idReverse}>
				<Sort></Sort>
			</p>
		</div>
		<div>โจทย์</div>
		<div class="problem-mini-info">
			<div id="tags">
				<div bind:this={tagsElement}>
					ประเภท <Filter></Filter>
				</div>
				<HeaderSelection toggleSelector={tagsElement}>
					<HeaderTags />
				</HeaderSelection>
			</div>
			<div id="difficulty">
				<div bind:this={difficultyElement}>
					ความยาก <Filter></Filter>
				</div>
				<HeaderSelection toggleSelector={difficultyElement}>
					<HeaderDifficulty />
				</HeaderSelection>
			</div>
			<div id="tags-difficulty">
				<div bind:this={difficultyTagsElement}>
					ประเภท/ความยาก <Filter></Filter>
				</div>
				<HeaderSelection toggleSelector={difficultyTagsElement}>
					<div class="header-saperator">ประเภท</div>
					<HeaderTags />
					<div class="header-saperator">ความยาก</div>
					<HeaderDifficulty />
				</HeaderSelection>
			</div>
		</div>
		<div>
			<div bind:this={statusElement}>
				สถานะ <Filter></Filter>
			</div>
			<HeaderSelection toggleSelector={statusElement}>
				<RadioButton
					name="status"
					onclick={() => {
						$searchParams.status = null;
					}}
					selected={true}
					>ทั้งหมด
				</RadioButton>
				<RadioButton
					name="status"
					color={statusColors["Done"]}
					onclick={() => {
						$searchParams.status = "Done";
					}}
					>{statusText["Done"]}
				</RadioButton>
				<RadioButton
					name="status"
					color={statusColors["In Progress"]}
					onclick={() => {
						$searchParams.status = "In Progress";
					}}
					>{statusText["In Progress"]}
				</RadioButton>
				<RadioButton
					name="status"
					color={statusColors["Not Started"]}
					onclick={() => {
						$searchParams.status = "Not Started";
					}}
					>{statusText["Not Started"]}
				</RadioButton>
			</HeaderSelection>
		</div>
		<div class="do-now"></div>
	</List>
	{#each problems as problem}
		{#if problem == "loading"}
			<LoadingList></LoadingList>
		{:else}
			<ProblemRow problem={problem as Problem} />
		{/if}
	{/each}
	{#if loading}
		<div class="full" in:fade out:fade>
			<Loading></Loading>
		</div>
	{/if}
</TableRenderer>

<style lang="scss">
	.problem-id-header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 5px;
	}

	#sort {
		transition: all 0.25s ease;
	}

	.upsidedown {
		transform: rotate(180deg);
	}

	:global(#problem-table) {
		height: calc(100% - 60px);
		margin-top: 10px;
		padding: 0px 10px 10px 10px;

		:global(#tags-difficulty) {
			display: none;
		}

		:global([dark] #header) {
			backdrop-filter: blur(10px);
		}

		:global(#header[top="true"]) {
			background: transparent;
		}

		:global(#header[top="true"]:not(:has([open="true"]))) {
			background: transparent;
			outline-color: transparent;
			filter: none;
		}

		:global(#header) {
			position: sticky;
			top: 0;
			z-index: 1;
			border-radius: 0px 0px var(--n-border-radius) var(--n-border-radius);
			height: 50px;
			font-weight: 600;
			padding: 0;
			background: var(--bg);

			div {
				align-content: center;
				position: relative;
			}

			:global(div:has(> .header-selection)) {
				flex-direction: column;
				border-radius: var(--n-border-radius) var(--n-border-radius) 0px 0px;
				height: 100%;
				transition: all 0.2s ease-out;

				:first-child {
					height: 100%;
				}
			}

			:global(div:has(> .header-selection[open="true"])) {
				background: var(--bg);
			}

			:global(.header-saperator) {
				border-radius: 10px;
				background: var(--text);
				color: var(--bg);
			}
		}

		:global(.problem-list) {
			display: flex;
			width: 100%;
			transition: all 0.2s ease-out;

			:global(.problem-mini-info) {
				display: flex;
				flex-direction: row;
				align-items: center;
				gap: 10px;

				:global(> div) {
					&:nth-child(1) {
						width: 50%;
					}
					&:nth-child(2) {
						width: 50%;
					}
				}
			}

			:global(> div) {
				&:nth-child(1) {
					width: 5%;
					min-width: 70px;
					text-align: center;
				}
				&:nth-child(2) {
					width: 30%;
				}
				&:nth-child(3) {
					width: 50%;
					text-align: center;
				}
				&:nth-child(4) {
					width: 20%;
					text-align: center;
				}
				&:nth-child(5) {
					width: 15%;
					text-align: center;
				}
			}

			@container (max-width:500px) or (max-height:500px) {
				:global(div) {
					font-size: 12px;
				}

				:global(.tag) {
					font-size: 0.5rem;
				}

				:global(.difficulty) {
					font-size: 1rem;
				}
			}

			@container (max-width:800px) {
				gap: 1px;

				:global(#tags),
				:global(#difficulty) {
					display: none;
				}

				:global(#tags-difficulty) {
					display: block;
				}

				:global(svg) {
					width: 15px;
				}

				:global(.problem-mini-info) {
					gap: 0px;
					:global(> div) {
						&:nth-child(1) {
							width: 100%;
						}
						&:nth-child(2) {
							width: 100%;
						}
					}
				}

				:global(> div) {
					&:nth-child(1) {
						width: 1%;
						min-width: 50px;
					}
					&:nth-child(2) {
						width: 40%;
					}
					&:nth-child(3) {
						flex-direction: column;
						min-width: 105px;
						width: 30%;
						overflow: visible;

						div {
							overflow: visible;
						}
					}
					&:nth-child(4) {
						min-width: 80px;
					}
					&:nth-child(5) {
						display: none;
					}
				}
			}

			@container (max-width:300px) {
				:global(> div) {
					&:nth-child(2) {
						width: 50%;
					}
					&:nth-child(3) {
						display: none;
					}
				}
			}
		}
	}
</style>
