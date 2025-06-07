<script lang="ts">
	import { onMount } from "svelte";
	import * as api from "$lib/fetchApi";
	import { showPopup } from "$lib/components/PopUp.svelte";
	import { say } from "$lib/normalFunction";
	import UserIcon from "$lib/components/UserIcon.svelte";
	import { userData } from "$lib/auth.local";
	import { selectData } from "../score";
	import Button from "$lib/components/Button.svelte";

	export let onClose = null;

	//-------------------------------------------------------
	// Props
	//-------------------------------------------------------
	export let selectedUser;

	//-------------------------------------------------------
	// State
	//-------------------------------------------------------
	let userRewards: {
		id: number;
		name: string;
		points: number;
		status: "redeemed" | "available" | "locked";
		image: string;
		reward: string;
	}[] = [];

	$: selectedUser = $selectData?.data;
	$: nextReward = userRewards.find((m) => m.points > selectedUser.score) || false;
	$: pointsToNextReward = nextReward ? nextReward.points - selectedUser.score : 0;

	//-------------------------------------------------------
	// Lifecycle Hooks
	//-------------------------------------------------------
	onMount(() => {
		fetchUserRewards(selectedUser.id);
	});

	$: {
		if (selectedUser && selectedUser.id) {
			fetchUserRewards(selectedUser.id);
		}
	}

	//-------------------------------------------------------
	// Data Fetching
	//-------------------------------------------------------

	let data;

	async function fetchUserRewards(userId: string) {
		if (!userId) {
			userRewards = [];
			return;
		}
		try {
			const result = await api.call(`/reward/user/${$selectData.data?.id}/status`, {
				withToken: true,
			});

			data = result?.data;

			let fetchedRewards = [
				...(data?.redeemed || []).map((r) => ({ ...r, status: "redeemed" as const })),
				...(data?.available || []).map((r) => ({ ...r, status: "available" as const })),
				...(data?.locked || []).map((r) => ({ ...r, status: "locked" as const })),
			].sort((a, b) => a.points - b.points);

			userRewards = fetchedRewards;
		} catch (error) {
			console.error("Error fetching user rewards for staff:", error);
			userRewards = [];
		}
	}

	//-------------------------------------------------------
	// Functions
	//-------------------------------------------------------

	async function handleMarkAsRedeemed(reward: (typeof userRewards)[0]) {
		try {
			await api.call("/reward/redeem", {
				method: "POST",
				data: { userId: selectedUser.id, rewardId: reward.id },
				withToken: true,
			});

			await showPopup(say("ทำเครื่องหมายว่ารับรางวัลแล้วสำเร็จ!", "(*´▽`*)"));
			fetchUserRewards(selectedUser.id);
		} catch (error: any) {
			console.error("Error marking reward as redeemed:", error);
			showPopup(say(`ข้อผิดพลาด: ${error.message || "เกิดข้อผิดพลาดขึ้น"}`, "(｡•́︿•̀｡)"));
		}
	}

	async function handleRemoveRedeemed(reward: (typeof userRewards)[0]) {
		try {
			await api.call(`/reward/redeem/${reward.id}/cancel`, {
				method: "DELETE",
				withToken: true,
			});

			await showPopup(say("ยกเลิกรางวัลที่รับไปแล้วสำเร็จ!", "(●'◡'●)"));
			fetchUserRewards(selectedUser.id);
		} catch (error: any) {
			console.error("Error removing redeemed reward:", error);
			showPopup(say(`ข้อผิดพลาด: ${error.message || "เกิดข้อผิดพลาดขึ้น"}`, "o(TヘTo)"));
		}
	}
</script>

<!---------------------------------------------------------
HTML Structure
--------------------------------------------------------->
<div class="panel-header">
	<h2>หน้าจอจัดการสำหรับสตาฟ</h2>
	<button class="close-button" on:click={onClose}>x</button>
</div>

<div class="user-details">
	<div class="user-icon">
		<UserIcon name={selectedUser.name} data={selectedUser.icon} />
	</div>
	<h3>{selectedUser.name}</h3>
	<p>รหัสนักศึกษา: {selectedUser.studentId}</p>
	<p>คะแนนสะสม: {selectedUser.score}</p>
</div>

<div class="rewards-section">
	<h3>รายการของรางวัล</h3>

	<table>
		<thead>
			<tr>
				<th>รางวัล</th>
				<th class="responsive">คะแนน</th>
				<th>สถานะ</th>
				<th>การจัดการ</th>
			</tr>
		</thead>
		<tbody>
			{#each userRewards as reward}
				<tr>
					<td data-label="รางวัล">
						<div class="reward-info">
							<img src="/reward.jpg" alt={reward.reward} />
							<span>{reward.name}</span>
						</div>
					</td>
					<td class="responsive" data-label="คะแนน">{reward.points}</td>
					<td data-label="สถานะ">
						{#if reward.status === "redeemed"}
							<span class="status redeemed">รับไปแล้ว</span>
						{:else if reward.status === "available"}
							<span class="status available">สามารถรับได้</span>
						{:else}
							<span class="status unavailable">ไม่ถึงเกณฑ์</span>
						{/if}
					</td>
					<td data-label="การจัดการ">
						{#if reward.status === "redeemed"}
							<Button onclick={() => handleRemoveRedeemed(reward)}>ยกเลิก</Button>
						{:else if reward.status === "available"}
							<Button onclick={() => handleMarkAsRedeemed(reward)}>ยืนยัน</Button>
						{:else}
							<button disabled class="confirm-button"> เงื่อนไขไม่เพียงพอ </button>
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style lang="scss">
	.user-icon {
		aspect-ratio: 1/1;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border: 1px solid var(--outline);
	}

	.reward-info {
		display: flex;
		align-items: center;
		gap: var(--n-gap);
		min-width: 100px;
		img {
			width: 40px;
			height: 40px;
			border-radius: 50%;
			object-fit: cover;
			border: 1px solid var(--outline);
			background-color: var(--bg);
		}
	}
	.status {
		padding: 4px 8px;
		border-radius: 4px;
		font-size: 0.8rem;
		&.redeemed {
			color: var(--description);
		}
		&.available {
			color: var(--status-done);
		}
		&.unavailable {
			color: var(--status-not-started);
		}
	}
	.panel-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
		border-bottom: 1px solid var(--darker);
		padding-bottom: 10px;
	}

	.close-button {
		background: none;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		color: var(--description);
	}

	.user-details {
		background-color: var(--darker-50);
		padding: 15px;
		border-radius: 8px;
		margin-bottom: 20px;
	}

	.rewards-section {
		margin-top: 20px;
		height: 100%;
		overflow-y: auto;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	th,
	td {
		padding: 12px 12px 12px 12px;
		border-bottom: 1px solid var(--darker);
		text-align: left;
	}

	th {
		background-color: var(--top-bar-left);
	}

	.confirm-button {
		padding: 6px 12px;
		background-color: var(--theme);
		color: var(--text);
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	.confirm-button:disabled {
		background-color: var(--darker);
		color: var(--description);
		cursor: not-allowed;
	}
	.cancel-button {
		padding: 6px 12px;
		background-color: var(--sc-minus);
		color: var(--text);
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	.staff-panel {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 80%;
		max-width: 800px;
		max-height: 90vh;
		background-color: var(--sc-bg);
		border-radius: 4px;
		box-shadow: 0 0 20px var(--sc-shadow);
		z-index: 1000;
		padding: 20px;
		overflow-y: auto;
		box-sizing: border-box; /* Ensure padding is included in the element's total width and height */

		/* Basic responsiveness for smaller screens */
		@media (max-width: 768px) {
			width: 95%; /* Use more width on smaller screens */
			max-width: none; /* Remove max-width constraint */
			top: 10px; /* Adjust position from top */
			left: 50%;
			transform: translateX(-50%); /* Center horizontally without vertical translation */
			max-height: calc(100vh - 20px); /* Adjust max-height to fit viewport */
		}

		@media (max-width: 500px) {
			font-size: 0.9rem; /* Slightly increase font size for readability */
			padding: 15px; /* Reduce padding */
			.responsive {
				display: none; /* Hide the points column */
			}
		}

		@media (max-width: 370px) {
			font-size: 0.8rem; /* Further reduce font size */
			padding: 10px; /* Further reduce padding */
			.reward-info {
				gap: var(--n-gap-sm, 8px); /* Adjust gap */
				min-width: auto; /* Allow min-width to adjust */
				img {
					display: none; /* Hide the reward image */
				}
				span {
					word-break: break-word; /* Allow long reward names to wrap */
				}
			}
			th,
			td {
				padding: 8px; /* Reduce table cell padding */
			}
			.user-details {
				padding: 10px; /* Reduce padding in user details section */
			}
			h3 {
				font-size: 1rem; /* Adjust heading size */
			}
		}
	}

	/* Adjust table layout for very small screens if needed */
	@media (max-width: 400px) {
		table,
		thead,
		tbody,
		th,
		td,
		tr {
			display: block; /* Stack table elements */
		}
		thead tr {
			position: absolute;
			top: -9999px;
			left: -9999px; /* Hide table headers */
		}
		tr {
			border: 1px solid var(--darker);
			margin-bottom: 5px;
			display: flex;
			flex-wrap: wrap; /* Allow flex items to wrap */
			justify-content: space-between; /* Distribute space */
			padding: 10px; /* Add padding to stacked rows */
		}
		td {
			border: none; /* Remove cell borders */
			position: relative;
			padding-left: 50%; /* Make space for a pseudo-element label */
			text-align: right; /* Align content to the right */
			flex-basis: 50%; /* Each cell takes roughly half the row width */
		}
		td::before {
			position: absolute;
			top: 6px;
			left: 6px;
			width: 45%;
			padding-right: 10px;
			white-space: nowrap;
			content: attr(data-label); /* Use data-label for the header text */
			font-weight: bold;
			text-align: left;
		}
		/* Add data-label to each td in the HTML */
		td:nth-of-type(1)::before {
			content: "รางวัล";
		}
		td:nth-of-type(2)::before {
			content: "คะแนน";
		}
		td:nth-of-type(3)::before {
			content: "สถานะ";
		}
		td:nth-of-type(4)::before {
			content: "การจัดการ";
		}
	}
</style>
