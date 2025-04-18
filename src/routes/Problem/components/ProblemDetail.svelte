<script lang="ts">
	import Frame from "../../../components/Frame.svelte";
	export let problem: any = null;
</script>

<Frame full>
	<div class="problem-detail">
		{#if problem}
			<div class="title-section">
				<div class="problem-id">{problem.id}</div>
				<div class="title">{problem.title}</div>
				<div class="stars">
					{#each Array(5) as _, i}
						<span class="star {i < problem.difficulty ? 'active' : ''}">★</span>
					{/each}
				</div>
			</div>
			<div class="label">Basic I/O</div>
			<div class="description">{problem.description || "รายละเอียดโจทย์..."}</div>
			<button class="submit-btn">ทำโจทย์</button>
		{:else}
			<div class="placeholder">กรุณาเลือกโจทย์เพื่อดูรายละเอียด</div>
		{/if}
	</div>
</Frame>

<style lang="scss">
	/*
-------------------------------------------------------
Layout & Container
-------------------------------------------------------
*/
	.problem-detail {
		padding: 20px;
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 20px;
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
	}

	.title {
		font-size: 1.2rem;
		font-weight: 600;
		color: var(--text);
	}

	/*
-------------------------------------------------------
Stars Rating
-------------------------------------------------------
*/
	.stars {
		display: flex;
		gap: 5px;
	}

	.star {
		color: var(--place-holder);
		font-size: 1.2rem;

		&.active {
			color: #c19a6b;
		}
	}

	/*
-------------------------------------------------------
Content Elements
-------------------------------------------------------
*/
	.label {
		font-size: 0.9rem;
		color: #c19a6b;
		background: rgba(193, 154, 107, 0.1);
		padding: 5px 10px;
		border-radius: 5px;
		width: fit-content;
	}

	.description {
		color: var(--text);
		line-height: 1.6;
		flex-grow: 1;
	}

	.submit-btn {
		width: 100%;
		padding: 12px;
		background: #c19a6b;
		color: white;
		border: none;
		border-radius: 5px;
		font-size: 1rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;

		&:hover {
			background: darken(#c19a6b, 10%);
		}
	}

	.placeholder {
		color: var(--place-holder);
		text-align: center;
		width: 100%;
	}
</style>
