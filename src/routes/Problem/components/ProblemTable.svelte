<script lang="ts">
	import { onMount } from "svelte";
	import type { Problem } from "../problem";
	import ProblemRow from "./ProblemRow.svelte";

	export let problems: Problem[];

	onMount(() => {
		const problem_table = document.getElementById("problem-table");
		const head_list: HTMLElement = document.querySelector("#problem-table .header");

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
	<div class="header problem-list">
		<div>ข้อที่</div>
		<div>โจทย์</div>
		<div>ประเภท</div>
		<div>ความยาก</div>
		<div>สถานะ</div>
	</div>
	<div id="problem-container">
		{#each problems as problem}
			<ProblemRow {problem} />
		{/each}
	</div>
</div>

<style lang="scss">
	#problem-table {
		overflow-y: auto;
		height: calc(100% - 60px);
		margin-top: 10px;
		padding: 0px 10px 10px 10px;
	}

	#problem-container {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.header {
		position: sticky;
		top: 0;
		z-index: 1;
		border-radius: 0px 0px var(--n-border-radius) var(--n-border-radius);
		height: 50px;

		div {
			align-content: center;
		}
	}

	:global([dark] .header) {
		backdrop-filter: blur(10px);
	}

	:global(.problem-list) {
		display: flex;
		width: 100%;
		transition: all 0.2s ease-out;
		height: 60px;
		filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.1));
		border-radius: var(--n-border-radius);
		container-type: inline-size;
		gap: 10px;

		:global(> div) {
			&:nth-child(1) {
				width: 5%;
				min-width: 70px;
				text-align: center;
			}
			&:nth-child(2) {
				width: 20%;
			}
			&:nth-child(3) {
				width: 30%;
				text-align: center;
			}
			&:nth-child(4) {
				width: 20%;
				text-align: center;
			}
			&:nth-child(5) {
				width: 20%;
				text-align: center;
			}
		}

		@container (max-width: 600px) {
			:global(> div) {
				&:nth-child(1) {
					width: 10%;
					text-align: center;
				}
				&:nth-child(2) {
					width: 20%;
				}
				&:nth-child(3) {
					display: none;
				}
				&:nth-child(4) {
					width: 30%;
				}
				&:nth-child(5) {
					width: 20%;
				}
			}
		}

		@container (max-width: 400px) {
			:global(> div) {
				&:nth-child(1) {
					max-width: 50px;
					min-width: 50px;
					text-align: center;
				}
				&:nth-child(2) {
					max-width: 45%;
					min-width: 45%;
				}
				&:nth-child(3) {
					display: none;
				}
				&:nth-child(4) {
					display: none;
				}
				&:nth-child(5) {
					max-width: 35%;
					min-width: 35%;
				}
			}
		}
	}
</style>
