<script lang="ts">
	import { userData } from "$lib/auth.local";
	import * as api from "$lib/fetchApi";
	import { onMount } from "svelte";

	let data;

	let allRewards: {
		id: number;
		name: string;
		points: number;
		status: "redeemed" | "available" | "locked";
	}[] = [];

	let progressPercentage = 0;
	let maxPoints = 0;

	onMount(async () => {
		const score = await api.call(`/user/full-data/${$userData.id}`, {
			withToken: true,
		});

		if (score) {
			$userData.score = score.score;
		}

		const result = await api.call(`/rewards/user/${$userData.id}/status`, {
			withToken: true,
		});

		data = result?.data;

		allRewards = [
			...(data?.redeemed || []).map((r) => ({ ...r, status: "redeemed" as const })),
			...(data?.available || []).map((r) => ({ ...r, status: "available" as const })),
			...(data?.locked || []).map((r) => ({ ...r, status: "locked" as const })),
		].sort((a, b) => a.points - b.points);

		if (allRewards.length > 0) {
			maxPoints = allRewards[allRewards.length - 1].points;
		} else {
			maxPoints = 0;
		}

		progressPercentage = ($userData.score ?? 0 / maxPoints) * 100;
	});
</script>

<div class="score-display">
	<h2 class="score-label">คะแนนปัจจุบัน</h2>
	<p class="current-score">{$userData.score ?? 0}</p>
</div>

<div class="progress-container">
	<div class="progress-line">
		<div class="progress-fill" style="width: {progressPercentage}%;"></div>
		{#each allRewards as reward, i (i)}
			{@const leftPosition = maxPoints > 0 ? (reward.points / maxPoints) * 100 : 0}
			<div class="checkpoint-marker" style="left: {leftPosition}%;"></div>
		{/each}
	</div>
	<div class="checkpoints">
		{#each allRewards as reward, i (i)}
			{@const leftPosition = maxPoints > 0 ? (reward.points / maxPoints) * 100 : 0}
			<div class="checkpoint status-{reward.status}" style="left: {leftPosition}%;">
				<img src="/rewards/{reward.name}.png" alt="" />
				<span class="checkpoint-label">{reward.name} ({reward.points})</span>
			</div>
		{/each}
	</div>
</div>

<div class="reward-list-container">
	<div class="reward-header">
		<div class="reward-header-item" title="ภาพ">ภาพ</div>
		<div class="reward-header-item" title="ชื่อ">ชื่อ</div>
		<div class="reward-header-item" title="ต้องการคะแนนอีก">ต้องการคะแนนอีก</div>
		<div class="reward-header-item" title="สถานะ">สถานะ</div>
	</div>
	<div class="reward-items">
		{#each allRewards as reward, i (i)}
			<div class="reward-item">
				<div class="reward-item-image">
					<img src="/rewards/{reward.name}.png" alt="" width="40" height="40" />
				</div>
				<div class="reward-item-name">{reward.name}</div>
				<div class="reward-item-needed-score">
					{#if reward.status === "locked"}
						{reward.points}
					{:else}
						-
					{/if}
				</div>
				<div class="reward-item-status status-{reward.status}">
					{#if reward.status === "redeemed"}
						แลกแล้ว<br />(‾◡◝)
					{:else if reward.status === "available"}
						สามารถแลกได้<br />ヾ(≧▽≦*)o
					{:else if reward.status === "locked"}
						พยายามเข้า<br />(.❛ ᴗ ❛ .)
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.reward-list-container {
		width: 100%;
		border-radius: var(--n-border-radius);
		display: flex;
		flex-direction: column;
	}

	.reward-header {
		display: flex;
		padding: 10px;
		background-color: var(--bg);
		font-weight: bold;
		color: var(--text);
		border-radius: 999px;
		box-shadow: 0 2px 10px var(--list-shadow);
		z-index: 2;
		white-space: pre;
	}

	.reward-header-item {
		text-align: center;
		text-overflow: ellipsis;
		padding: 5px;
		overflow: hidden;
	}

	.reward-header-item:nth-child(1) {
		text-align: center;
		width: 60px;
		flex-shrink: 0;
	}
	.reward-header-item:nth-child(2) {
		text-align: left;
		width: 20%;
	}
	.reward-header-item:nth-child(3) {
		text-align: center;
		width: 30%;
	}
	.reward-header-item:nth-child(4) {
		text-align: center;
		width: 40%;
	}

	.reward-items {
		overflow-y: auto;
		height: 100%;
	}

	.reward-item {
		display: flex;
		padding: 10px;
		border-bottom: 1px solid var(--darker);
		align-items: center;
		color: var(--text);
	}

	.reward-item:last-child {
		border-bottom: none;
	}

	.reward-item-image {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 60px;
		flex-shrink: 0;
	}

	.reward-item img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		object-fit: cover;
		border: 1px solid var(--outline);
		background-color: var(--bg);
	}

	.reward-item-name {
		text-align: left;
		padding: 0 5px;
		width: 20%;
	}

	.reward-item-needed-score {
		text-align: center;
		padding: 0 5px;
		width: 30%;
	}

	.reward-item-status {
		text-align: center;
		font-weight: bold;
		padding: 0 5px;
		width: 40%;
	}

	.reward-item-status.status-redeemed {
		color: var(--status-done);
	}

	.reward-item-status.status-available {
		color: var(--status-in-progress);
	}

	.reward-item-status.status-locked {
		color: var(--status-not-started);
	}

	/*-------------------------------------------------------
	Progress Bar Styling
-------------------------------------------------------*/
	.progress-container {
		width: 80%;
		margin: 1% auto;
		position: relative;
		margin-top: 20px;
		padding-top: 50px;
		padding-bottom: 10px;
		filter: drop-shadow(0 2px 3px var(--list-shadow));
	}

	.progress-line {
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		height: 16px;
		background-color: var(--darker);
		transform: translateY(-50%);

		border-radius: 8px;
		position: relative;
		overflow: hidden;
		border: 1px solid var(--outline);

		background: var(--bg);
	}

	.progress-fill {
		height: 100%;
		background-color: var(--status-done);
		transition: width 0.5s ease-in-out;
		z-index: 2;
		position: relative;
	}

	.checkpoint-marker {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 1px;
		background-color: var(--outline);
		z-index: 2;
		transform: translateX(-50%);
	}

	.checkpoints {
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		transform: translateY(-50%);
		height: 0;
		z-index: 3;
	}

	.checkpoint {
		width: 40px;
		height: 40px;
		background-color: #fff;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: -42px;
		transform: translateX(-50%);
		cursor: pointer;
		transition: border-color 0.3s ease-in-out;
		flex-shrink: 0;
		overflow: visible;
	}

	.checkpoint img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 50%;
		padding: 2px;
		z-index: auto;
		background: var(--bg);
	}

	.checkpoint::after {
		display: none;
	}

	.checkpoint::before {
		display: none;
	}

	.checkpoint.status-locked {
		border-color: var(--darker);
		opacity: 0.6;
	}

	.checkpoint.status-available {
		border-color: var(--status-in-progress);
	}

	.checkpoint.status-redeemed {
		border-color: var(--status-done);
	}

	.checkpoint-label {
		position: absolute;
		top: -20px;
		left: 50%;
		transform: translateX(-50%);
		white-space: nowrap;
		font-size: 0.8em;
		color: var(--text);
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
		pointer-events: none;
		z-index: 4;
		text-align: center;
	}

	.checkpoint:hover .checkpoint-label {
		opacity: 1;
	}

	/*-------------------------------------------------------
	Current Score Styling
-------------------------------------------------------*/
	.score-display {
		text-align: center;
		margin-bottom: 20px;
	}

	.score-label {
		font-size: 2em; /* ทำให้ label มีขนาดใหญ่ */
		color: var(--text);
		margin-bottom: 5px;
	}

	.current-score {
		font-size: 2em;
		font-weight: 700;
		color: var(--text);
	}
</style>
