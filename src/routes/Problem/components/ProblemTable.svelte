<script lang="ts">
	import { onMount } from "svelte";
	import List from "../../../components/List.svelte";
	import type { Problem } from "../problem";
	import ProblemRow from "./ProblemRow.svelte";

	export let problems: Problem[];

	onMount(() => {
		const problem_table = document.getElementById("problem-table");
		const head_list: HTMLElement = document.querySelector("#problem-table #header");

		function updateScroll() {
			console.log(problem_table.scrollTop);

			if (problem_table.scrollTop > 0) {
				head_list.style.background = "var(--bg)";
				head_list.style.backdropFilter = "";
			} else {
				head_list.style.background = "transparent";
				head_list.style.backdropFilter = "none";
			}
		}

		if (problem_table) {
			problem_table.addEventListener("scroll", updateScroll);

			updateScroll();
		}
	});
</script>

<div id="problem-table">
	<List id="header" class="problem-list">
		<div>ข้อที่</div>
		<div>โจทย์</div>
		<div class="problem-mini-info">
			<div id="tags">ประเภท</div>
			<div id="difficulty">ความยาก</div>
			<div id="tags-difficulty">ประเภท/ความยาก</div>
		</div>
		<div>สถานะ</div>
	</List>
	{#each problems as problem}
		<ProblemRow {problem} />
	{/each}
</div>

<style lang="scss">
	:global([dark] #header) {
		backdrop-filter: blur(10px);
	}

	:global(#problem-table) {
		overflow-y: auto;
		height: calc(100% - 60px);
		margin-top: 10px;
		padding: 0px 10px 10px 10px;
		display: grid;
		gap: 10px;

		:global(#header) {
			position: sticky;
			top: 0;
			z-index: 1;
			border-radius: 0px 0px var(--n-border-radius) var(--n-border-radius);
			height: 50px;
			font-weight: 600;

			div {
				align-content: center;
			}
		}

		:global(#tags-difficulty) {
			display: none;
		}

		:global(.problem-list) {
			display: flex;
			width: 100%;
			transition: all 0.2s ease-out;

			:global(.problem-mini-info) {
				display: flex;
				flex-direction: row;
				align-items: center;

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

			@container (max-width:700px) {
				:global(#tags),
				:global(#difficulty) {
					display: none;
				}

				:global(div) {
					font-size: 0.8rem;
				}

				:global(#tags-difficulty) {
					display: block;
				}

				:global(.problem-mini-info) {
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
					&:nth-child(3) {
						flex-direction: column;
						min-width: 60px;
						width: 5%;
						overflow: visible;

						div {
							overflow: visible;
						}
					}
					&:nth-child(4) {
						min-width: 100px;
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
