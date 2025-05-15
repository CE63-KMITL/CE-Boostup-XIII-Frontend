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

		const totalRewards = allRewards.length;
		const completedRewards = allRewards.filter((r) => r.status !== "locked").length;
		progressPercentage = totalRewards > 0 ? (completedRewards / totalRewards) * 100 : 0;
	});
</script>

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
				<img src="/rewards/{reward.name}.png" alt={reward.name} />
				<span class="checkpoint-label">{reward.name} ({reward.points})</span>
			</div>
		{/each}
	</div>
</div>

<!---------------------------------------------------------
Reward Table
--------------------------------------------------------->
<div class="reward-table-container">
	<table>
		<thead>
			<tr>
				<th>ภาพ</th>
				<th>ชื่อ</th>
				<th>ต้องการคะแนนอีก</th>
				<th>สถานะ</th>
			</tr>
		</thead>
		<tbody>
			{#each allRewards as reward, i (i)}
				<tr>
					<td>
						<img src="/rewards/{reward.name}.png" alt={reward.name} width="40" height="40" />
					</td>
					<td>{reward.name}</td>
					<td>
						{#if reward.status === "locked"}
							{reward.points}
						{:else}
							-
						{/if}
					</td>
					<td class="status-{reward.status}">
						{#if reward.status === "redeemed"}
							แลกแล้ว<br />(‾◡◝)
						{:else if reward.status === "available"}
							สามารถแลกได้<br />ヾ(≧▽≦*)o
						{:else if reward.status === "locked"}
							พยายามเข้า<br />(.❛ ᴗ ❛ .)
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	/*-------------------------------------------------------
	Reward Table Styling
	-------------------------------------------------------*/

	.reward-table-container {
		border-radius: var(--n-border-radius);
		overflow: hidden;
		overflow-y: auto;
		border: 1px solid var(--outline);
	}

	.reward-table-container table {
		width: 100%;
		border-collapse: collapse;
		margin-top: 0;
	}

	.reward-table-container th,
	.reward-table-container td {
		padding: 10px;
		text-align: left;
		color: var(--text);
	}

	.reward-table-container th {
		background-color: var(--bg);
		font-weight: bold;
	}

	.reward-table-container td img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		object-fit: cover;
		border: 1px solid var(--outline);
		background-color: var(--bg);
		text-align: center;
	}

	/* Adjust column width as needed */
	.reward-table-container th:nth-child(1),
	.reward-table-container td:nth-child(1) {
		min-width: 70px;
		width: 60px; /* Image column */
		text-align: center;
	}

	.reward-table-container th:nth-child(2),
	.reward-table-container td:nth-child(2) {
		width: 20%; /* Needed Score column */
		text-align: center;
	}

	.reward-table-container th:nth-child(3),
	.reward-table-container td:nth-child(3) {
		width: 30%; /* Needed Score column */
		text-align: center;
	}

	.reward-table-container th:nth-child(4),
	.reward-table-container td:nth-child(4) {
		width: 50%; /* Status column */
		text-align: center;
	}

	.reward-table-container td.status-redeemed {
		color: var(--status-done);
		font-weight: bold; /* Optional: make text bold */
	}

	.reward-table-container td.status-available {
		color: var(--status-in-progress);
		font-weight: bold; /* Optional: make text bold */
	}

	.reward-table-container td.status-locked {
		color: var(--status-not-started);
		font-weight: bold; /* Optional: make text bold */
	}

	/*-------------------------------------------------------
	Progress Bar Styling
-------------------------------------------------------*/
	.progress-container {
		width: 80%;
		margin: 1% auto;
		position: relative;
		padding-top: 50px;
		padding-bottom: 10px;
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
	}

	.progress-fill {
		height: 100%;
		background-color: var(--status-done);
		transition: width 0.5s ease-in-out;
		border-radius: 8px;
		z-index: 2;
		position: relative;
	}

	.checkpoint-marker {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 2px;
		background-color: var(--outline);
		z-index: 1;
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
		border: 1px solid var(--darker);
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
		top: -30px;
		left: 50%;
		transform: translateX(-50%);
		white-space: nowrap;
		font-size: 0.8em;
		color: var(--text);
		opacity: 0; /* Changed from 1 to 0 */
		transition: opacity 0.3s ease-in-out;
		pointer-events: none;
		z-index: 4;
		text-align: center;
	}

	/* New rule for hover effect */
	.checkpoint:hover .checkpoint-label {
		opacity: 1;
	}
</style>
