<script lang="ts">
	import Button from "../../../../components/Button.svelte";
	import Frame from "../../../../components/Frame.svelte";
	import Stars from "./Stars.svelte";
	import Tag from "./Tag.svelte";

	export let problem: any = null;
	export let detail: any = null;
</script>

<div class="problem-detail">
	<div class="title-container">
		<div class="title-section">
			<div class="title">{problem?.title}</div>
			<div class="author">{problem?.author?.name}</div>
		</div>
		<div class="problem-id">{problem?.id}</div>
	</div>
	<div class="problem-info">
		<div class="tags">
			{#each problem?.tags as tag}
				<Tag {tag} />
			{/each}
		</div>
		<div class="stars">
			<Stars difficulty={problem?.difficulty} />
		</div>
	</div>

	<div class="description">{detail || "ไม่สามารถโหลดรายละเอียดโจทย์ได้"}</div>
	<Button
		class="submit-btn"
		onclick={() => {
			window.open("/code/" + problem?.id, "_blank");
		}}>ทำโจทย์</Button
	>
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
		display: flex;
		flex-direction: column;
	}

	/*
     -------------------------------------------------------
     Title Section
     -------------------------------------------------------
     */

	.title-container {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
	}

	.title-section {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.problem-id {
		font-size: 1.5rem;
		color: var(--theme);
		width: 10%;
		text-align: end;
	}

	.title {
		font-size: 1.2rem;
		font-weight: 600;
		color: var(--text);
	}

	.problem-info {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding-block: 10px;
	}

	.tags {
		flex-direction: row;
		gap: 5px;
		text-align: center;
		width: 70%;
		display: flex;
		flex-wrap: wrap;
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
		height: 100%;
		border: 1px solid var(--outline);
		background: var(--bg);
		padding: 10px;
		border-radius: 10px;
		margin-bottom: 10px;
	}

	// .placeholder {
	// 	color: var(--place-holder);
	// 	text-align: center;
	// 	width: 100%;
	// }
</style>
