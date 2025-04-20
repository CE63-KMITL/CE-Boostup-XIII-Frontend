<script lang="ts">
	import { onMount } from "svelte";
	import Checkbox from "../../../components/Checkbox.svelte";
	import HeaderSelection from "../../../components/HeaderSelection.svelte";
	import Filter from "../../../components/Icons/Filter.svelte";
	import Sort from "../../../components/Icons/Sort.svelte";
	import List from "../../../components/List.svelte";
	import Loading from "../../../components/Loading.svelte";
	import LoadingList from "../../../components/LoadingList.svelte";
	import RadioButton from "../../../components/RadioButton.svelte";
	import type { Problem } from "../problem";
	import { searchParams, statusColors, statusText, tagsColors } from "../problem";
	import ProblemRow from "./ProblemRow.svelte";

	export let loading = false;

	let tagsElement;
	let difficultyElement;
	let difficultyTagsElement;
	let statusElement;

	export let problems: (Problem | string)[];
	onMount(() => {
		const problem_table = document.getElementById("problem-table");
		const head_list: HTMLElement = document.querySelector("#problem-table #header");

		function updateScroll() {
			console.log(Math.abs(problem_table.scrollHeight - problem_table.clientHeight));
			head_list.setAttribute("top", problem_table.scrollTop > 0 ? "false" : "true");
		}

		if (problem_table) {
			problem_table.addEventListener("scroll", updateScroll);

			updateScroll();
		}
	});
</script>

<div id="problem-table">
	<List id="header" class="problem-list" top="true">
		<div>
			ข้อที่ <Sort></Sort>
		</div>
		<div>โจทย์</div>
		<div class="problem-mini-info">
			<div id="tags">
				<div bind:this={tagsElement}>
					ประเภท <Filter></Filter>
				</div>
				<HeaderSelection toggleSelector={tagsElement}>
					<RadioButton
						name="tag"
						onclick={() => {
							$searchParams.tag = [];
						}}
						selected={true}
						>อะไรก็ได้เอามาให้หมด
					</RadioButton>
					{#each Object.keys(tagsColors) as tag}
						<RadioButton
							name="tag"
							color={tagsColors[tag]}
							onclick={() => {
								$searchParams.tag = [tag];
							}}
							>{tag}
						</RadioButton>
					{/each}
				</HeaderSelection>
			</div>
			<div id="difficulty">
				<div bind:this={difficultyElement}>
					ความยาก <Filter></Filter>
				</div>
				<HeaderSelection toggleSelector={difficultyElement}>
					<div class="difficulty-controls">
						<div class="sort-controls">
							<span>เรียงลำดับ:</span>
							<RadioButton
								name="difficulty-sort"
								onclick={() => {
									$searchParams.difficultySortBy = null;
								}}
								selected={true}
								>ไม่เรียง
							</RadioButton>
							<RadioButton
								name="difficulty-sort"
								onclick={() => {
									$searchParams.difficultySortBy = "ASC";
								}}
								>น้อยไปมาก
							</RadioButton>
							<RadioButton
								name="difficulty-sort"
								onclick={() => {
									$searchParams.difficultySortBy = "DESC";
								}}
								>มากไปน้อย
							</RadioButton>
						</div>
						<div class="range-controls">
							<span>ช่วงความยาก:</span>
							<div class="range-inputs">
								<input
									type="range"
									min="0"
									max="5"
									step="0.5"
									bind:value={$searchParams.difficultyMin}
									on:input={() => {
										if ($searchParams.difficultyMin > $searchParams.difficultyMax) {
											$searchParams.difficultyMax = $searchParams.difficultyMin;
										}
									}}
								/>
								<input
									type="range"
									min="0"
									max="5"
									step="0.5"
									bind:value={$searchParams.difficultyMax}
									on:input={() => {
										if ($searchParams.difficultyMax < $searchParams.difficultyMin) {
											$searchParams.difficultyMin = $searchParams.difficultyMax;
										}
									}}
								/>
								<div class="range-values">
									<span>{$searchParams.difficultyMin}</span>
									<span>ถึง</span>
									<span>{$searchParams.difficultyMax}</span>
								</div>
							</div>
						</div>
					</div>
				</HeaderSelection>
			</div>
			<div id="tags-difficulty">
				<div bind:this={difficultyTagsElement}>
					ประเภท/ความยาก <Filter></Filter>
				</div>
				<HeaderSelection toggleSelector={difficultyTagsElement}>
					<div class="tags-difficulty-controls">
						<div class="tags-section">
							<span>ประเภท:</span>
							<RadioButton
								name="tag-mobile"
								onclick={() => {
									$searchParams.tag = [];
								}}
								selected={true}
								>อะไรก็ได้เอามาให้หมด
							</RadioButton>
							{#each Object.keys(tagsColors) as tag}
								<RadioButton
									name="tag-mobile"
									color={tagsColors[tag]}
									onclick={() => {
										$searchParams.tag = [tag];
									}}
									>{tag}
								</RadioButton>
							{/each}
						</div>
						<div class="difficulty-section">
							<div class="sort-controls">
								<span>เรียงลำดับ:</span>
								<RadioButton
									name="difficulty-sort-mobile"
									onclick={() => {
										searchParams["difficultySortBy"] = null;
									}}
									selected={true}
									>ไม่เรียง
								</RadioButton>
								<RadioButton
									name="difficulty-sort-mobile"
									onclick={() => {
										searchParams["difficultySortBy"] = "ASC";
									}}
									>น้อยไปมาก
								</RadioButton>
								<RadioButton
									name="difficulty-sort-mobile"
									onclick={() => {
										searchParams["difficultySortBy"] = "DESC";
									}}
									>มากไปน้อย
								</RadioButton>
							</div>
							<div class="range-controls">
								<span>ช่วงความยาก:</span>
								<div class="range-inputs">
									<input
										type="range"
										min="0"
										max="5"
										step="0.5"
										bind:value={$searchParams.difficultyMin}
										on:input={() => {
											if ($searchParams.difficultyMin > $searchParams.difficultyMax) {
												$searchParams.difficultyMax = $searchParams.difficultyMin;
											}
										}}
									/>
									<input
										type="range"
										min="0"
										max="5"
										step="0.5"
										bind:value={$searchParams.difficultyMax}
										on:input={() => {
											if ($searchParams.difficultyMax < $searchParams.difficultyMin) {
												$searchParams.difficultyMin = $searchParams.difficultyMax;
											}
										}}
									/>
									<div class="range-values">
										<span>{$searchParams.difficultyMin}</span>
										<span>ถึง</span>
										<span>{$searchParams.difficultyMax}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
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
						searchParams["status"] = "";
					}}
					selected={true}
					>ทั้งหมด
				</RadioButton>
				<RadioButton
					name="status"
					color={statusColors["Done"]}
					onclick={() => {
						searchParams["status"] = "Done";
					}}
					>{statusText["Done"]}
				</RadioButton>
				<RadioButton
					name="status"
					color={statusColors["In Progress"]}
					onclick={() => {
						searchParams["status"] = "In Progress";
					}}
					>{statusText["In Progress"]}
				</RadioButton>
				<RadioButton
					name="status"
					color={statusColors["Not Started"]}
					onclick={() => {
						searchParams["status"] = "Not Started";
					}}
					>{statusText["Not Started"]}
				</RadioButton>
			</HeaderSelection>
		</div>
	</List>
	{#if loading}
		<Loading></Loading>
	{/if}
	{#each problems as problem}
		{#if problem == "loading"}
			<LoadingList></LoadingList>
		{:else}
			<ProblemRow problem={problem as Problem} />
		{/if}
	{/each}
</div>

<style lang="scss">
	/*
-------------------------------------------------------
Difficulty Controls Styles
-------------------------------------------------------
*/
	:global(.difficulty-controls) {
		padding: 10px;
		display: flex;
		flex-direction: column;
		gap: 15px;

		.sort-controls,
		.range-controls {
			display: flex;
			flex-direction: column;
			gap: 8px;

			span {
				font-size: 0.9rem;
				color: var(--text-secondary);
			}
		}

		.range-controls {
			.range-inputs {
				display: flex;
				flex-direction: column;
				gap: 10px;

				input[type="range"] {
					width: 100%;
					height: 4px;
					-webkit-appearance: none;
					background: var(--accent);
					border-radius: 2px;
					outline: none;

					&::-webkit-slider-thumb {
						-webkit-appearance: none;
						width: 15px;
						height: 15px;
						background: var(--accent);
						border-radius: 50%;
						cursor: pointer;
						transition: all 0.2s ease;

						&:hover {
							transform: scale(1.2);
						}
					}
				}

				.range-values {
					display: flex;
					justify-content: center;
					gap: 8px;
					font-size: 0.9rem;
					color: var(--text);

					span:nth-child(2) {
						color: var(--text-secondary);
					}
				}
			}
		}
	}

	/*
-------------------------------------------------------
Tags-Difficulty Controls Styles
-------------------------------------------------------
*/
	:global(.tags-difficulty-controls) {
		padding: 10px;
		display: flex;
		flex-direction: column;
		gap: 20px;

		.tags-section,
		.difficulty-section {
			display: flex;
			flex-direction: column;
			gap: 15px;
			padding: 15px;
			border-radius: var(--n-border-radius);
			background: var(--bg-secondary);

			span {
				font-size: 0.9rem;
				color: var(--text-secondary);
			}
		}

		.difficulty-section {
			.sort-controls,
			.range-controls {
				display: flex;
				flex-direction: column;
				gap: 8px;
			}

			.range-controls {
				.range-inputs {
					display: flex;
					flex-direction: column;
					gap: 10px;

					input[type="range"] {
						width: 100%;
						height: 4px;
						-webkit-appearance: none;
						background: var(--accent);
						border-radius: 2px;
						outline: none;

						&::-webkit-slider-thumb {
							-webkit-appearance: none;
							width: 15px;
							height: 15px;
							background: var(--accent);
							border-radius: 50%;
							cursor: pointer;
							transition: all 0.2s ease;

							&:hover {
								transform: scale(1.2);
							}
						}
					}

					.range-values {
						display: flex;
						justify-content: center;
						gap: 8px;
						font-size: 0.9rem;
						color: var(--text);

						span:nth-child(2) {
							color: var(--text-secondary);
						}
					}
				}
			}
		}
	}

	:global(#problem-table) {
		overflow-y: auto;
		height: calc(100% - 60px);
		margin-top: 10px;
		padding: 0px 10px 10px 10px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		container-type: size;
		position: relative;

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
		}

		@container (min-width: 700px) {
			:global(#tags-difficulty) {
				display: none;
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
			}

			@container (max-width:500px) or (max-height:500px) {
				:global(div) {
					font-size: 0.7rem;
				}

				:global(.tag) {
					font-size: 0.5rem;
				}

				:global(.difficulty) {
					font-size: 1rem;
				}
			}

			@container (max-width:700px) {
				gap: 1px;

				:global(#tags),
				:global(#difficulty) {
					display: none;
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
