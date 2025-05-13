<script lang="ts">
	import { userData } from "$lib/auth.local";
	import {
		getToCreateProblemURL,
		getToProblemURL,
		goToCreateProblemURL,
		goToProblemURL,
		searchParams,
		selectedProblemId,
	} from "../problem";

	import {
		statusColors,
		statusStaffColors,
		statusStaffText,
		statusText,
		type Problem,
	} from "$lib/constants/problem";
	import List from "$lib/components/List.svelte";
	import Stars from "./Stars.svelte";
	import Tag from "./Tag.svelte";

	export let problem: Problem;

	$: {
		problem.status = $userData.role ? problem.status : "";
	}

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

	<div
		class="status"
		style="color: {(() => {
			if (!problem.status) {
				return 'var(--grayed)';
			}
			if ($searchParams.staff) {
				return statusStaffColors[problem.status];
			} else {
				return statusColors[problem.status];
			}
		})()}"
	>
		{(() => {
			if (!problem.status) {
				return "ไม่ทราบ";
			}
			if ($searchParams.staff) {
				return statusStaffText[problem.status];
			} else {
				return statusText[problem.status];
			}
		})()}
	</div>
	<div class="problemButtonContainer">
		{#if $searchParams.staff}
			<a
				href={getToCreateProblemURL(problem.id)}
				title="สามารถกดเมาส์กลางได้"
				aria-disabled={$userData.role == null}
				on:click|stopPropagation|preventDefault={() => goToCreateProblemURL(problem.id)}
			>
				ดูโจทย์
			</a>
		{:else}
			<a
				href={getToProblemURL(problem.id)}
				title="สามารถกดเมาส์กลางได้"
				aria-disabled={$userData.role == null}
				on:click|stopPropagation|preventDefault={() => goToProblemURL(problem.id)}
			>
				{#if $userData.role == null}
					กรุณาเข้าสู่ระบบ
				{:else}
					ทำโจทย์
				{/if}
			</a>
		{/if}
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

	.problemButtonContainer a {
		width: 100%;
		padding: 5px;
		padding-inline: 15px;
		background: var(--button-bg);
		color: white;
		border: none;
		border-radius: 5px;
		font-size: 1rem;
		font-weight: 500;
		transition: all 0.2s ease;
		border-radius: 99rem;
		border: transparent 1px solid;

		&:hover {
			filter: brightness(1.2);
			translate: 0 -2px;
		}

		&[aria-disabled="true"] {
			pointer-events: none;
			opacity: 0.3;
		}
	}
</style>
