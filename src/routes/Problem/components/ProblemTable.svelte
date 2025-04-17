<script lang="ts">
	import { onMount } from "svelte";
	import Checkbox from "../../../components/Checkbox.svelte";
	import HeaderSelection from "../../../components/HeaderSelection.svelte";
	import Filter from "../../../components/Icons/Filter.svelte";
	import Sort from "../../../components/Icons/Sort.svelte";
	import List from "../../../components/List.svelte";
	import type { Problem } from "../problem";
	import { statusText } from "../problem";
	import ProblemRow from "./ProblemRow.svelte";

	let tagsElement;
	let statusElement;

	export let problems: Problem[];
	onMount(() => {
		const problem_table = document.getElementById("problem-table");
		const head_list: HTMLElement = document.querySelector("#problem-table #header");

		function updateScroll() {
			console.log(problem_table.scrollTop);
			head_list.setAttribute("top", problem_table.scrollTop > 0 ? "false" : "true");

			// if (problem_table.scrollTop > 0) {
			// 	head_list.style.background = "var(--bg)";
			// 	head_list.style.backdropFilter = "";
			// 	head_list.style.outlineColor = "";
			// 	head_list.style.filter = "";
			// } else {
			// 	head_list.style.background = "transparent";
			// 	head_list.style.backdropFilter = "none";
			// 	head_list.style.outlineColor = "transparent";
			// 	head_list.style.filter = "none";
			// }
		}

		if (problem_table) {
			problem_table.addEventListener("scroll", updateScroll);

			updateScroll();
		}
	});
</script>

<div id="problem-table">
	<List id="header" class="problem-list">
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
					<Checkbox value="Done">{statusText["Done"]}</Checkbox>
				</HeaderSelection>
			</div>
			<div id="difficulty">
				<div>
					ความยาก <Filter></Filter>
				</div>
				<HeaderSelection toggleSelector={tagsElement}>
					<Checkbox value="Done">{statusText["Done"]}</Checkbox>
				</HeaderSelection>
			</div>
			<div id="tags-difficulty">
				<div>
					ประเภท/ความยาก <Filter></Filter>
				</div>
				<HeaderSelection toggleSelector={tagsElement}>
					<Checkbox value="Done">{statusText["Done"]}</Checkbox>
				</HeaderSelection>
			</div>
		</div>
		<div>
			<div bind:this={statusElement}>
				สถานะ <Filter></Filter>
			</div>
			<HeaderSelection toggleSelector={statusElement}>
				<Checkbox value="Done">{statusText["Done"]}</Checkbox>
				<Checkbox value="In Progress">{statusText["In Progress"]}</Checkbox>
				<Checkbox value="Not Started">{statusText["Not Started"]}</Checkbox>
			</HeaderSelection>
		</div>
	</List>
	{#each problems as problem}
		<ProblemRow {problem} />
	{/each}
</div>

<style lang="scss">
	:global(#problem-table) {
		overflow-y: auto;
		height: calc(100% - 60px);
		margin-top: 10px;
		padding: 0px 10px 10px 10px;
		display: grid;
		gap: 10px;
		container-type: size;

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
