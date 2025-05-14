<script lang="ts">
	//import NavBar from '../../components/NavBar.svelte'
	import { onMount } from "svelte";
	import * as api from "$lib/fetchApi";
	import houseIcon from "./house-placeholder.png";
	import UserIcon from "$lib/components/UserIcon.svelte";

	// convert date to dd/mm format
	function convertDate(dateString) {
		const date = new Date(dateString);
		const options: Intl.DateTimeFormatOptions = {
			day: "2-digit",
			month: "numeric",
		};
		return date.toLocaleDateString("th-TH", options);
	}

	let user = null;
	let scoreInfo = null;
	let scoreLog = null;

	onMount(async () => {
		// Fetch user data
		user = await api.call("/user/me", { method: "GET", withToken: true });
		scoreInfo = await api.call("/user/me/scorelog", { method: "GET", withToken: true });
		scoreLog = scoreInfo.scoreLogs;
	});
</script>

<div class="Container">
	<div class="profile">
		<h1>ข้อมูลนักผจญภัย</h1>
		<div class="profile_box">
			<div>
				<img src={houseIcon} alt="house" class="icon" />
				<table class="score_table">
					<thead>
						<tr>
							<th class="score_header">คะแนนนักผจญภัย</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="score_body">{user?.score}</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="profile_info">
				<div class="bio_info">
					<UserIcon data={user?.icon} />
					<div class="name_id">
						<div class="name">{user?.name}</div>
						<div class="id">{user?.studentId ? user?.studentId : "NULL"}</div>
					</div>
				</div>

				<div>
					<div CLASS="personal_info">
						<div>อีเมล : {user?.email ? user?.email : "NULL"}</div>
						<div>บ้าน : {user?.house ? user?.house : "NULL"}</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="score_history">
		<h2>ประวัติคะแนน</h2>
		<div class="score_table">
			{#each scoreLog as log, i}
				<div class="score_body">
					<div class="score_number">{scoreLog[i]?.amount}</div>
					<div class="staff_and_time">
						<div class="staff">{scoreLog[i]?.modifiedBy?.name}</div>
						<div class="time">{convertDate(scoreLog[i]?.date)}</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	h1 {
		font-size: 2vw;
		font-weight: 700;
		text-align: center;
		margin-top: 4.5vh;
		color: var(--text);
	}

	h2 {
		font-size: 1.3vw;
		font-weight: 4000;
		text-align: left;
		margin-top: 3vh;
		margin-left: 2vw;
		color: var(--text);
	}

	.Container {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 2vw;
		min-height: 100vh;
		width: 100vw;
		padding-top: 2.5vh;
		padding-bottom: 2.5vh;
	}

	.profile {
		width: 45vw;
		height: 80vh;
		background-color: var(--profile-bg);
		border-radius: 20px;
		outline: 2px solid;
		border-color: var(--list-border);
	}

	.profile_box {
		display: flex;
		margin-top: 1.5vh;
	}

	.score_history {
		width: 45vw;
		height: 80vh;
		background-color: var(--profile-bg);
		border-radius: 20px;
		outline: 2px solid;
		border-color: var(--list-border);
	}

	.score_history .score_table {
		overflow-y: auto;
		width: 45vw;
		height: 70vh;
		padding-bottom: 1.2vh;
	}

	.score_history .score_table .score_body {
		display: flex;
		height: 10vh;
		width: 40vw;
		margin-top: 3vh;
		margin-left: auto;
		margin-right: auto;
		background-color: var(--list-bg);
		border-radius: 10px;
		outline: 1px solid;
	}

	.score_history .score_table .score_body .score_number {
		font-size: 1.2vw;
		color: green;
		margin-top: auto;
		margin-bottom: auto;
		margin-left: 1.5vw;
	}

	.score_history .score_table .score_body .staff_and_time {
		font-size: 1vw;
		margin-top: auto;
		margin-bottom: auto;
		margin-left: auto;
		margin-right: 1.2vw;
		text-align: center;
	}

	.score_history .score_table .score_body .staff_and_time .time {
		font-weight: 600;
		color: var(--theme-dark-text);
	}

	.score_history .score_table .score_body .staff_and_time .staff {
		font-weight: 600;
		color: var(--text);
	}

	.profile .icon {
		width: 13vw;
		height: 40vh;
		margin-top: 5vh;
		margin-left: 4vw;
		border-radius: 15px;
	}
	.profile .score_table {
		margin-top: 2vh;
		margin-left: 4vw;
		text-align: center;
		height: 10vh;
		width: 13vw;
		background-color: var(--profile-bg);
	}

	.profile .score_header {
		font-size: 1vw;
		background: var(--light-yellow, #f1d5a1);
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		outline: 1px solid;
	}

	.profile .score_body {
		font-size: 1vw;
		background-color: var(--list-bg);
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
		padding-top: 2vh;
		padding-bottom: 2vh;
		outline: 1px solid;
	}

	.profile_info {
		width: 20vw;
		height: 53vh;
		margin-left: 2.5vw;
		margin-top: 5vh;
		border-radius: 20px;
		outline: 1px solid;
		border-color: var(--list-border);
		background-color: var(--profile-bg);
	}

	.bio_info {
		display: flex;
	}

	:global(.usericon) {
		width: 50px;
		height: 50px;
		border: 1px solid #ddd;
		border-radius: 50%;
		margin-top: 3vh;
		margin-left: 2vw;
	}

	.bio_info .name_id {
		font-size: 1.1vw;
		margin-top: 4vh;
		margin-left: 1.5vw;
	}
	.bio_info .name_id .name {
		color: var(--text);
	}
	.bio_info .name_id .id {
		color: var(--theme-dark-text);
	}

	.personal_info {
		font-size: 1.1vw;
		margin-top: 3vh;
		margin-left: 2vw;
		color: var(--text);
	}
	@media only screen and (max-width: 1024px) and (min-height: 600px) {
		h1 {
			font-size: 6vw;
			margin-top: 3vh;
		}

		h2 {
			font-size: 4.5vw;
			margin-top: 2vh;
			margin-left: 5vw;
		}

		.Container {
			flex-direction: column;
			gap: 3vh;
			padding-top: 2vh;
			padding-bottom: 2vh;
		}

		.profile,
		.score_history {
			width: 90vw;
			height: auto;
			min-height: 60vh;
			margin-bottom: 2vh;
		}

		.profile_box {
			flex-direction: column;
		}

		.score_history .score_table {
			width: 100%;
			height: 60vh;
		}

		.score_history .score_table .score_body {
			width: 85vw;
			height: auto;
			min-height: 8vh;
			margin-top: 2vh;
			flex-direction: column;
			padding: 1vh 0;
		}

		.score_history .score_table .score_body .score_number {
			font-size: 4vw;
			margin-left: 5vw;
			margin-bottom: 1vh;
		}

		.score_history .score_table .score_body .staff_and_time {
			font-size: 3.5vw;
			margin-left: 5vw;
			margin-right: 5vw;
			text-align: left;
		}

		.profile .icon {
			width: 40vw;
			height: 45vh;
			margin: 3vh auto;
		}

		.profile .score_table {
			width: 85vw;
			margin: 2vh auto;
		}

		.profile .score_header,
		.profile .score_body {
			font-size: 3.5vw;
		}

		.profile_info {
			width: 85vw;
			height: auto;
			margin: 3vh auto;
			padding-bottom: 2vh;
		}

		.bio_info {
			flex-direction: column;
			align-items: center;
		}

		:global(.usericon) {
			width: 150px;
			height: 150px;
			margin: 2vh auto;
		}

		.bio_info .name_id {
			font-size: 4vw;
			margin: 1vh auto;
			text-align: center;
		}

		.personal_info {
			font-size: 4vw;
			margin-left: 5vw;
			margin-right: 5vw;
		}
	}

	@media only screen and (max-width: 430px) and (min-height: 500px) {
		.profile .icon {
			width: 60vw;
			height: 45vh;
			margin: 3vh auto;
		}

		:global(.usericon) {
			width: 100px;
			height: 100px;
			margin: 2vh auto;
		}
	}
</style>
