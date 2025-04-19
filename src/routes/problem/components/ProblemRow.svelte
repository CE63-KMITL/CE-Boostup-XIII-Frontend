<script lang="ts">
	import { onMount } from "svelte";
	import { selectedProblemId, statusColors, statusText } from "../problem";
	// Changed import
	import List from "../../../components/List.svelte";
	import { tagsColors, type Problem } from "../problem";

	export let problem: Problem;

	const maxDifficulty = 5;

	function getDifficultyStars(difficulty: number): string {
		return (
			"★".repeat(Math.floor(difficulty)) +
			"⯪".repeat(Math.ceil(difficulty) - Math.floor(difficulty)) +
			"☆".repeat(maxDifficulty - Math.ceil(difficulty))
		);
	}

	onMount(() => {
		let element: HTMLDivElement = document.querySelector(`[data-problem-id="${problem.id}"]`);

		if (element) {
			element.addEventListener("click", () => {
				$selectedProblemId = $selectedProblemId === problem.id ? null : problem.id;
			});
		}
	});
</script>

<List class="problem-list" data-problem-id={problem.id}>
	<div class="id">{problem.id}</div>
	<div>
		<div class="title">{problem.title}</div>
		<div class="author">{problem.author}</div>
	</div>

	<div class="problem-mini-info">
		<div class="tags">
			{#each problem.tags as tag}
				<span class="tag" style="background-color: {tagsColors[tag] ?? '#808080'};">{tag}</span>
			{/each}
		</div>
		<div class="difficulty">{getDifficultyStars(problem.difficulty)}</div>
	</div>

	<div class="status" style="color: {statusColors[problem.status] ?? '#808080'};">{statusText[problem.status]}</div>
</List>

<style lang="scss">
	div {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.id {
		color: var(--theme-dark-text);
	}

	.title {
		font-weight: 500;
		color: var(--theme-dark-text);
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.author {
		font-size: 0.8rem;
		color: var(--text);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 5px;

		.tag {
			display: inline-block;
			padding: 4px 10px;
			border-radius: 12px;
			font-size: 0.7em;
			color: var(--tag-text);
			font-weight: 800;
			text-shadow: 1px 1px 2px black;
		}
	}

	.difficulty {
		color: #d4b977;
		font-size: 1.5rem;
		letter-spacing: 2px;
	}

	.status {
		font-weight: 500;
	}
</style>
