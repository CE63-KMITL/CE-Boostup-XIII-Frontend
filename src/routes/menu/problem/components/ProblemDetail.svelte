<script lang="ts">
	import Stars from "./Stars.svelte";
	import Tag from "./Tag.svelte";

	export let problem: any = null;
	export let padding = true;
</script>

<div {...$$restProps} class={"problem-detail " + $$restProps.class} class:padding>
	<div class="title-container">
		<div class="title-section">
			<div class="title">{problem?.title}</div>
			<div class="problem-id">{problem?.id}</div>
		</div>
		<div class="author">{problem?.author?.name}</div>
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

	{#if problem?.headers?.length > 0 || problem?.functions?.length > 0}
		<div class="header-function-info">
			<div class="mode-section">
				{#if problem?.headers?.length > 0}
					<div class="mode-item">
						<span class="mode-label">Headers:</span>
						<span
							class="mode-value"
							class:disallowed={problem?.headerMode === "disallowed"}
							class:allowed={problem?.headerMode === "allowed"}
							>{problem?.headerMode === "disallowed"
								? "ไม่อนุญาตให้ใช้"
								: problem?.headerMode === "allowed"
									? "จำเป็นต้องใช้"
									: problem?.headerMode}
						</span>

						<div class="list-section">
							<div class="list-items">
								{#each problem?.headers as header}
									<Tag tag={header} />
								{/each}
							</div>
						</div>
					</div>
				{/if}
				{#if problem?.functions?.length > 0}
					<div class="mode-item">
						<span class="mode-label">Functions:</span>
						<span
							class="mode-value"
							class:disallowed={problem?.functionMode === "disallowed"}
							class:allowed={problem?.functionMode === "allowed"}
							>{problem?.functionMode === "disallowed"
								? "ไม่อนุญาตให้ใช้"
								: problem?.functionMode === "allowed"
									? "จำเป็นต้องใช้"
									: problem?.functionMode}</span
						>
						<div class="list-section">
							<div class="list-items">
								{#each problem?.functions as func}
									<Tag tag={func} />
								{/each}
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	{/if}

	<div class="description">{problem?.description || "ไม่สามารถโหลดรายละเอียดโจทย์ได้"}</div>
</div>

<style lang="scss">
	//-------------------------------------------------------
	// Layout & Container
	//-------------------------------------------------------
	.problem-detail {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	//-------------------------------------------------------
	// Title Section
	//-------------------------------------------------------

	.title-container {
		display: flex;
		justify-content: space-between;
		flex-direction: column;
	}

	.title-section {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		gap: 5px;
		width: 100%;
	}

	.problem-id {
		font-size: 1.5rem;
		color: var(--theme);
		width: 10%;
		text-align: end;
	}

	.title {
		text-overflow: ellipsis;
		overflow: hidden;
		font-size: 1.2rem;
		font-weight: 600;
		color: var(--text);
	}

	//-------------------------------------------------------
	// Problem Info Section
	//-------------------------------------------------------
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
	//-------------------------------------------------------
	// Content Elements
	//-------------------------------------------------------
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

	//-------------------------------------------------------
	// Header/Function Info Section
	//-------------------------------------------------------
	.header-function-info {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding-bottom: 10px;
		margin-bottom: 10px;
	}

	.mode-section {
		display: flex;
		flex-direction: row;
		gap: 20px;
	}

	.mode-item {
		font-size: 0.9rem;
	}

	.mode-label {
		font-weight: 600;
		color: var(--text);
	}

	.mode-value {
		color: var(--theme);

		&.disallowed {
			color: var(--status-not-started);
		}

		&.allowed {
			color: var(--status-done);
		}
	}

	.list-section {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.list-label {
		font-weight: 600;
		font-size: 0.9rem;
		color: var(--text);
	}

	.list-items {
		display: flex;
		flex-wrap: wrap;
		gap: 5px;
	}
</style>
