<script lang="ts">
	import { onMount } from "svelte";
	import { selectedProblemId, statusColors, statusText } from "../problem";

	import { preventDefault } from "svelte/legacy";
	import Button from "../../../components/Button.svelte";
	import List from "../../../components/List.svelte";
	import { type Problem } from "../problem";
	import Stars from "./Stars.svelte";
	import Tag from "./Tag.svelte";

	export let problem: Problem;

	function selectProblem() {
		$selectedProblemId = $selectedProblemId === problem.id ? null : problem.id;
	}
</script>

<List class="problem-list" data-problem-id={problem.id} onclick={selectProblem}>
	<div class="id">{problem.id}</div>
	<div>
		<div class="title">{problem.title}</div>
		<div class="author">{problem.author?.name}</div>
	</div>

	<div class="problem-mini-info">
		<div class="tags">
			{#each problem.tags as tag}
				<Tag {tag} />
			{/each}
		</div>
		<Stars difficulty={problem.difficulty} />
	</div>

	<div class="status" style="color: {statusColors[problem.status] ?? '#808080'};">
		{statusText[problem.status] ?? "ไม่ทราบ"}
	</div>
	<div class="do-now">
		<a
			href="/code/{problem.id}"
			title="สามารถกดเมาส์กลางได้"
			on:click|stopPropagation|preventDefault={(event) => window.open(`/code/${problem.id}`, "_blank")}
		>
			ทำโจทย์
		</a>
	</div>
</List>

<style lang="scss">
	div {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.id {
		color: var(--theme);
	}

	.title {
		font-weight: 500;
		color: var(--theme);
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

	.do-now a {
		width: 100%;
		padding: 5px;
		padding-inline: 15px;
		background: var(--theme);
		color: white;
		border: none;
		border-radius: 5px;
		font-size: 1rem;
		font-weight: 500;
		transition: all 0.2s ease;
		border-radius: 99rem;
		border: transparent 1px solid;

		&:hover {
			background: var(--theme-dark);
			border: var(--text) 1px solid;
			translate: 0 -2px;
		}
	}
</style>
