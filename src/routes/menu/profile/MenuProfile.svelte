<script lang="ts">
	import { userData } from "$lib/auth.local";
	import { onMount } from "svelte";
	import * as api from "$lib/fetchApi";
	import UserIcon from "$lib/components/UserIcon.svelte";
	import Button from "$lib/components/Button.svelte";
	import History from "../score/components/History.svelte";
	import { fade } from "svelte/transition";
	import { azScale } from "$lib/transition";
	import { showPopup } from "$lib/components/PopUp.svelte";
	import { say } from "$lib/normalFunction";

	let isEditing = false;
	let editedUserData = { ...$userData };
	let uploadInput: HTMLInputElement;
	let showHistoryPopup = false;

	onMount(async () => {
		const result = await api.call(`/user/full-data/${$userData.id}`, {
			method: "GET",
			withToken: true,
		});

		if (result) {
			$userData = { ...$userData, ...result };
		}
	});

	function startEdit() {
		editedUserData = { ...$userData };
		isEditing = true;
	}

	async function saveEdit() {
		const payload = {
			name: editedUserData.name,
			studentId: editedUserData.studentId,
			email: editedUserData.email,
			house: editedUserData.house,
		};
		const result = await api.call("/user/set-data", {
			method: "POST",
			data: payload,
			withToken: true,
		});

		if (result?.data) {
			$userData = { ...$userData, ...result.data };
			isEditing = false;
			alert("ข้อมูลถูกบันทึกแล้ว");
		} else {
			console.error("Failed to save user data:", result?.error);
			alert("บันทึกข้อมูลไม่สำเร็จ: " + result?.error?.message || "Unknown error");
		}
	}

	function cancelEdit() {
		isEditing = false;
		editedUserData = { ...$userData };
	}

	async function handleUpload(event: Event) {
		const file = (event.target as HTMLInputElement)?.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = async () => {
			const img = new Image();
			img.onload = async () => {
				const canvas = document.createElement("canvas");
				const ctx = canvas.getContext("2d");
				canvas.width = 100;
				canvas.height = 100;
				ctx.drawImage(img, 0, 0, 100, 100);

				const base64Image = canvas.toDataURL("image/png");

				await api.call("/user/upload-icon", {
					method: "POST",
					data: { iconBase64: base64Image },
					withToken: true,
				});
				showPopup(say("อัปโหลดรูปภาพสําเร็จ!", "(^▽^)"), {
					"เย่!~": () => {
						window.location.reload();
					},
				});
			};
			img.src = reader.result as string;
		};

		reader.readAsDataURL(file);
	}

	function triggerUpload() {
		uploadInput.click();
	}

	function toggleHistoryPopup() {
		showHistoryPopup = !showHistoryPopup;
	}
</script>

<div class="Container">
	<div class="profile">
		<h1>ข้อมูลนักผจญภัย</h1>
		<div class="profile_box">
			<div>
				{#if $userData?.house}
					<div class="houseicon">
						<img src="/house/{$userData?.house}.png" alt="" class="icon" />
					</div>
				{/if}
				<table class="score_table">
					<thead>
						<tr>
							<th class="score_header">คะแนนนักผจญภัย</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="score_body">{$userData.score}</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="profile_info">
				<div class="bio_info">
					<div class="usericon-container">
						<button class="upload-trigger" on:click={triggerUpload}>
							<UserIcon name={$userData.name} data={$userData.icon} />
							<div class="upload-overlay">เปลี่ยนรูป</div>
						</button>
						<input
							type="file"
							accept="image/*"
							bind:this={uploadInput}
							on:change={handleUpload}
							style="display: none;"
						/>
					</div>
					<div class="name_id">
						{#if isEditing}
							<input type="text" bind:value={editedUserData.name} class="name-input" />
							<div class="id-display">{editedUserData.studentId}</div>
						{:else}
							<div class="name">{$userData.name}</div>
							<div class="id">{$userData.studentId}</div>
						{/if}
					</div>
				</div>
				{#if !isEditing}
					<button class="edit-icon-button" on:click={startEdit}>
						<svg
							class="edit-icon"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path
								d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.114l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.091l-.65 2.882a.75.75 0 00.926.926l2.882-.65a5.25 5.25 0 002.091-1.32l8.4-8.4z"
							/>
						</svg>
					</button>
				{/if}

				<div>
					<div class="personal_info">
						<div>อีเมล : {$userData.email}</div>
						<div>บ้าน : {$userData.house}</div>
					</div>
				</div>
			</div>
		</div>

		{#if isEditing}
			<div class="edit-actions">
				<Button onclick={saveEdit}>บันทึก</Button>
				<Button onclick={cancelEdit}>ยกเลิก</Button>
			</div>
		{/if}

		<Button onclick={() => (window.location.href = "/login?clear")}>Logout</Button>
	</div>

	<div class="history-button-mobile">
		<Button onclick={toggleHistoryPopup}>ประวัติคะแนน</Button>
	</div>

	<div class="score_history">
		<h2>ประวัติคะแนน</h2>
		<div class="score_table">
			<History userDataHistory={$userData} />
		</div>
	</div>

	{#if showHistoryPopup}
		<div class="history-popup-overlay" transition:fade={{ duration: 200 }} on:click={toggleHistoryPopup}>
			<div transition:azScale class="history-popup-content" on:click|stopPropagation>
				<h2>ประวัติคะแนน</h2>
				<div class="score_table">
					<History userDataHistory={$userData} />
				</div>
				<Button onclick={toggleHistoryPopup}>ปิด</Button>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	h1 {
		font-size: 2rem;
		font-weight: 700;
		text-align: center;
		margin-top: 4.5vh;
		color: var(--text);
	}

	h2 {
		font-size: 1.3rem;
		font-weight: 4000;
		text-align: left;
		margin-top: 3vh;
		margin-left: 2vw;
		color: var(--text);
	}

	.Container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		overflow: auto;
		gap: var(--n-gap);
		padding: 2rem var(--n-gap) 5rem;
		box-sizing: border-box;
		height: 100%;
	}

	.profile,
	.score_history {
		flex: 1;
		max-width: 45vw;
		min-height: 80vh;
		height: auto;
		overflow: auto;
		background-color: var(--profile-bg);
		border-radius: var(--n-border-radius);
		outline: 2px solid var(--list-border);
		padding: 1rem;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		backdrop-filter: blur(5px);
		filter: drop-shadow(0 0 4px var(--list-shadow)); /* Use color variable */
	}

	.profile_box {
		display: flex;
		flex-direction: row;
		gap: var(--n-gap);
	}

	.houseicon {
		width: 13vw;
		height: auto;
		background-color: var(--profile-bg);
		border-radius: var(--n-border-radius);
	}

	.profile .icon {
		aspect-ratio: 3/4;
		width: 100%;
		height: auto;
		border-radius: 15px;
	}

	.profile .score_table {
		margin-top: 2vh;
		text-align: center;
		width: 12.9vw;
		background-color: var(--profile-bg);
		border-radius: 10px;
		overflow: hidden;
		outline: 1px solid var(--list-border);
	}

	.profile .score_header {
		font-size: 1rem;
		background: var(--sc-orangelight);
		padding: 0.5rem;
		color: var(--text);
	}

	.profile .score_body {
		font-size: 1rem;
		background-color: var(--list-bg);
		padding: 2vh 0;
		color: var(--text);
	}

	.profile_info {
		flex: 1;
		min-width: 200px;
		border-radius: var(--n-border-radius);
		outline: 1px solid var(--list-border);
		background-color: var(--profile-bg);
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		box-sizing: border-box;
		position: relative;
		filter: drop-shadow(1px 1px 2px var(--list-shadow)); /* Use color variable */
	}

	.bio_info {
		display: flex;
		align-items: center;
		gap: 1rem;
		/* position: relative; */ /* Remove relative from bio_info */
	}

	.usericon-container {
		position: relative;
		width: 4rem;
		height: 4rem;
		border-radius: 15px;
		overflow: hidden;
		cursor: pointer;
	}

	.upload-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		opacity: 0;
		transition: opacity 0.2s ease-in-out;
		font-size: 0.8rem;
		text-align: center;
		border-radius: 50%;
	}

	.usericon-container:hover .upload-overlay {
		opacity: 1;
	}

	.upload-trigger {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		width: 100%;
		height: 100%;
	}

	.usericon-container :global(.user-icon) {
		width: 100%;
		height: 100%;
		display: block;
	}

	.name_id {
		flex: 1;
		font-size: 1.1rem;
		display: flex;
		flex-direction: column;
		color: var(--text);
		overflow: hidden; /* Add overflow handling */
	}
	.name_id .name {
		font-weight: bold;
		overflow: hidden; /* Add overflow handling */
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.name_id .id {
		color: var(--theme-dark);
		overflow: hidden; /* Add overflow handling */
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.name-input,
	.id-input,
	.info-input {
		padding: 0.2rem 0.4rem;
		border: 1px solid var(--list-border);
		border-radius: 5px;
		font-size: 1rem;
		margin-bottom: 0.2rem;
		color: var(--text);
		background-color: var(--profile-bg);
		width: 100%;
		box-sizing: border-box;
		overflow: hidden; /* Add overflow handling */
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.id-display {
		padding: 0.2rem 0.4rem;
		font-size: 1rem;
		margin-bottom: 0.2rem;
		color: var(--theme-dark); /* Match the color of the non-editing state */
		width: 100%;
		box-sizing: border-box;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.edit-icon-button {
		position: absolute;
		bottom: 0.5rem; /* Adjust position from bottom */
		right: 0.5rem; /* Adjust position from right */
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.5rem;
		color: var(--text);
	}

	.edit-icon {
		width: 1.2rem;
		height: 1.2rem;
		fill: currentColor;
	}

	.personal_info {
		font-size: 1.1rem;
		color: var(--text);
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.edit-actions {
		display: flex;
		justify-content: center;
		gap: 1rem;
		margin-top: 2rem;
	}

	.score_history .score_table {
		margin: 1rem;
	}

	.history-button-mobile {
		display: none;
		width: 100%;
		max-width: 45vw;
		margin-top: var(--n-gap);
	}

	.history-popup-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.7);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.history-popup-content {
		background-color: var(--profile-bg);
		border-radius: var(--n-border-radius);
		padding: 1rem;
		max-width: 90vw;
		max-height: 80vh;
		overflow-y: auto;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.history-popup-content h2 {
		margin: 0 0 1rem 0;
		text-align: center;
	}

	.history-popup-content .score_table {
		margin: 0;
	}

	.history-popup-content .sc-history-score-main {
		width: auto;
	}

	:global(html[mobile]) {
		.Container {
			flex-direction: column;
			align-items: center;
			padding: 1rem var(--n-gap) 3rem;
		}

		.profile {
			width: 100%;
			max-width: 90vw;
			height: auto;
			min-height: unset;
			backdrop-filter: blur(5px);
			filter: drop-shadow(0 0 4px var(--list-shadow)); /* Use color variable for mobile */
		}

		.score_history {
			display: none;
		}

		.history-button-mobile {
			display: block;
			width: 100%;
			max-width: 90vw;
			margin-top: var(--n-gap);
			margin-bottom: 1rem;
		}

		.profile_box {
			flex-direction: column;
			align-items: center;
			margin: 1rem 0;
			gap: 1rem;
		}

		.houseicon {
			width: 30vw;
			max-width: 200px;
		}

		.profile .score_table {
			width: 30vw;
			max-width: 200px;
			margin-top: 1rem;
			margin-left: auto;
			margin-right: auto;
		}

		.profile_info {
			width: 100%;
			max-width: 500px;
			height: auto;
			min-height: unset;
			margin: 1rem auto;
			position: relative;
			filter: drop-shadow(0 0 4px var(--list-shadow)); /* Use color variable for mobile */
		}

		.bio_info {
			flex-direction: column;
			align-items: center;
			gap: 0.5rem;
			position: static; /* bio_info can be static on mobile */
		}

		.edit-icon-button {
			position: absolute; /* Keep absolute positioning */
			bottom: 0.5rem; /* Adjust position from bottom */
			right: 0.5rem; /* Adjust position from right */
			margin-top: 0; /* Remove margin-top */
		}

		.usericon-container {
			width: 6rem;
			height: 6rem;
		}

		.name_id,
		.personal_info {
			align-items: center;
			width: 100%;
		}

		.name-input,
		.id-input,
		.info-input,
		.id-display {
			width: 90%;
			max-width: 300px;
			text-align: center;
		}

		h1 {
			margin-top: 1rem;
			margin-bottom: 1rem;
		}

		h2 {
			margin-top: 1rem;
			margin-left: 1rem;
		}

		.score_history .score_table {
			margin: 1rem;
		}
	}

	@media (max-width: 600px) {
		h1 {
			font-size: 1.8rem;
		}

		h2 {
			font-size: 1.4rem;
		}

		.profile {
			padding: 0.5rem;
		}

		.profile_info {
			padding: 0.8rem;
		}

		.usericon-container {
			width: 5rem;
			height: 5rem;
		}

		.name_id {
			font-size: 1rem;
		}

		.personal_info {
			font-size: 1rem;
		}

		.name-input,
		.id-input,
		.info-input,
		.id-display {
			font-size: 0.9rem;
			padding: 0.1rem 0.3rem;
		}

		.edit-icon {
			width: 1rem;
			height: 1rem;
		}

		.edit-actions {
			flex-direction: column;
			align-items: center;
			gap: 0.5rem;
			margin-top: 1rem;
		}

		.profile .score_table {
			width: 40vw;
			max-width: 180px;
		}

		.houseicon {
			width: 40vw;
			max-width: 180px;
		}

		.history-button-mobile {
			max-width: 90vw;
		}

		.history-popup-content {
			max-width: 95vw;
			padding: 0.8rem;
		}
	}

	@media (max-width: 400px) {
		h1 {
			font-size: 1.5rem;
		}

		h2 {
			font-size: 1.2rem;
		}

		.usericon-container {
			width: 4rem;
			height: 4rem;
		}

		.name_id {
			font-size: 0.9rem;
		}

		.personal_info {
			font-size: 0.9rem;
		}

		.name-input,
		.id-input,
		.info-input,
		.id-display {
			font-size: 0.8rem;
		}

		.profile .score_table {
			width: 50vw;
			max-width: 150px;
		}

		.houseicon {
			width: 50vw;
			max-width: 150px;
		}
	}
</style>
