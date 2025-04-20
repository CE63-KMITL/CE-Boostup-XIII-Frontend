<script lang="ts">
	import Button from "../../../components/Button.svelte";
	import Frame from "../../../components/Frame.svelte";
	import Stars from "./Stars.svelte";
	import Tag from "./Tag.svelte";

	export let problem: any = null;
	export let detail: any = null;
</script>

<div class="problem-detail">
	{#if problem}
		<div class="title-section">
			<div class="title">{problem.title}</div>
			<div class="problem-id">{problem.id}</div>
		</div>
		<div>
			{#each problem.tags as tag}
				<Tag {tag} />
			{/each}
		</div>
		<div class="stars">
			<Stars difficulty={problem.difficulty} />
		</div>

		<div class="description">{detail || "ไม่สามารถโหลดรายละเอียดโจทย์ได้"}</div>
		<Button class="submit-btn">ทำโจทย์</Button>
	{:else}
		<div class="placeholder">กรุณาเลือกโจทย์เพื่อดูรายละเอียด</div>
	{/if}
</div>

<style lang="scss">
	/*
-------------------------------------------------------
Layout & Container
-------------------------------------------------------
*/
	.problem-detail {
		height: 100%;
		width: 100%;
		padding: 10px;
	}

	/*
-------------------------------------------------------
Title Section
-------------------------------------------------------
*/
	.title-section {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.problem-id {
		font-size: 0.9rem;
		color: var(--place-holder);
		width: 10px;
	}

	.title {
		font-size: 1.2rem;
		font-weight: 600;
		color: var(--text);
	}
	/*
-------------------------------------------------------
Content Elements
-------------------------------------------------------
*/

	.description {
		color: var(--text);
		line-height: 1.6;
		flex-grow: 1;
	}

	.placeholder {
		color: var(--place-holder);
		text-align: center;
		width: 100%;
	}
</style>
