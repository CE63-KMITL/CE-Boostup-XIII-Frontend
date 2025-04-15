<script lang="ts">
	import type { Problem } from "Data";
	import type { Problem_Dev } from "Data/Dev";
	import type { Problem_User } from "Data/Member";
	import Frame from "../../components/Frame.svelte";

	export let Problem_OBJ: Problem_User | Problem_Dev;

	let Problem_Data = Problem_OBJ.Data as Problem;
</script>

<Frame
	><div class="problem list" style="container-type: inline-size;" {...$$restProps}>
		<div class="column" style="width: 150px;">
			<div class="center">{Problem_Data.ID}</div>
		</div>

		<div class="column" style="width: 40%; height: 100%;">
			<div class="title text">{Problem_Data.Title}</div>
			<div class="author text">{Problem_Data.Author}</div>
		</div>
		<div class="column tag-container" style="min-width: 30%;">
			{#each Problem_Data.Tags as tag}
				<div class="tag">{tag}</div>
			{/each}
		</div>

		<div class="end" style="width: -webkit-fill-available;">
			<div class="column" style="width: 50%; align-items: center;">
				<div class="difficulty">{Problem_Data.Difficulty}</div>
			</div>
			<div class="column" style="width: 50%; text-align: end;">
				<div class="status">{Problem_OBJ.Status}</div>
			</div>
		</div>

		<div class="space" style="width: 50px;"></div>
	</div>
</Frame>

<style lang="scss">
	@container (max-width: 750px) {
		.tag-container {
			display: none !important;
		}
	}

	@container (max-width: 500px) {
		.end {
			flex-direction: column !important;
		}

		.end > div {
			width: 100% !important;
			text-align: center !important;
		}

		.space {
			display: none !important;
		}
	}

	.end {
		display: flex;
		flex-direction: row;
	}

	.text {
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.title {
		font-weight: 500;
	}

	.problem {
		height: 60px;
	}

	.column {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.tag {
		display: flex;
		border: 1px solid var(--outline);
		border-radius: 7px;
		padding: 2px;
		height: fit-content;
		font-size: 12px;
	}

	.tag-container {
		width: 50%;
		min-width: 100px;
		flex-direction: row;
		gap: 2px;
		align-items: center;
		flex-wrap: wrap;
	}
</style>
