<script lang="ts">
	import { onMount } from "svelte";
	import { selectedProblemId, statusColors, statusText } from "../problem";

	import List from "../../../components/List.svelte";
	import { type Problem } from "../problem";
	import Stars from "./Stars.svelte";
	import Tag from "./Tag.svelte";

	export let problem: Problem;

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
				<Tag {tag} />
			{/each}
		</div>
		<Stars difficulty={problem.difficulty} />
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
	}

	.status {
		font-weight: 500;
	}
</style>
