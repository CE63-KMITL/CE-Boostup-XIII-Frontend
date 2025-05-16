<script lang="ts">
	import icon from "./placeholder.jpg";

	async function handleUpload(event: Event) {
		const file = (event.target as HTMLInputElement)?.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = async () => {
			const base64Image = (reader.result as string).split(",")[1]; // remove data:image/...;base64,

			const response = await fetch("/api/profile/upload", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ image: base64Image }),
			});

			if (response.ok) {
				const result = await response.json();
			} else {
				console.error("Upload failed");
			}
		};

		reader.readAsDataURL(file);
	}
</script>

<div class="Container">
	<div class="profile">
		<h1>ข้อมูลนักผจญภัย</h1>
		<div class="profile_box">
			<div>
				<img src={icon} alt="การ์ดนักผจญภัย" class="icon" />
				<table class="score_table">
					<thead>
						<tr>
							<th class="score_header">คะแนนนักผจญภัย</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="score_body">(score)</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="profile_info">
				<div class="bio_info">
					<!--TODO: EDIT PROFILE-->
					<img src={icon} alt="รูปนักผจญภัย" class="icon" />
					<div class="name_id">
						<div>(name)</div>
						<div class="id">(id)</div>
					</div>
				</div>

				<div>
					<div CLASS="personal_info">
						<div>(EMAIL)</div>
						<div>(HOUSE)</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="score_history">
		<h2>ประวัติคะแนน</h2>
	</div>
</div>

<style lang="scss">
	h1 {
		font-size: 2vw;
		font-weight: 700;
		text-align: center;
		margin-top: 4.5vh;
	}

	h2 {
		font-size: 1.3vw;
		font-weight: 4000;
		text-align: left;
		margin-top: 3vh;
		margin-left: 2vw;
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
		margin-top: 2vh;
	}

	.score_history {
		width: 45vw;
		height: 80vh;
		background-color: var(--profile-bg);
		border-radius: 20px;
		outline: 2px solid;
		border-color: var(--list-border);
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

	.bio_info .icon {
		width: 6vw;
		height: 12vh;
		border-radius: 50%;
		margin-top: 2vh;
		margin-left: 2vw;
	}

	.bio_info .name_id {
		font-size: 1vw;
		margin-top: 3vh;
		margin-left: 1vw;
	}

	.bio_info .name_id .id {
		color: var(--theme-dark-text);
	}

	.personal_info {
		font-size: 1vw;
		margin-top: 3vh;
		margin-left: 2vw;
	}
	@media only screen and (max-width: 500px) {
		h1 {
			font-size: 24px;
			font-weight: 700;
			text-align: center;
			margin-top: 20px;
		}

		h2 {
			font-size: 18px;
			font-weight: 700; /* Changed from 4000 which is invalid */
			text-align: left;
			margin-top: 15px;
			margin-left: 10px;
		}

		.Container {
			display: flex;
			flex-direction: column; /* Stack items vertically on mobile */
			align-items: center;
			justify-content: flex-start; /* Changed from center for better mobile flow */
			gap: 15px;
			min-height: 100vh;
			width: 100%;
			padding: 15px 10px;
			box-sizing: border-box;
		}

		.profile {
			width: 100%;
			max-width: 480px;
			height: auto;
			min-height: 300px;
			background-color: var(--profile-bg);
			border-radius: 15px;
			outline: 2px solid;
			border-color: var(--list-border);
			padding: 10px;
			box-sizing: border-box;
		}

		.profile_box {
			display: flex;
			flex-direction: column; /* Stack items vertically */
			margin-top: 10px;
		}

		.score_history {
			width: 100%;
			max-width: 480px;
			height: auto;
			min-height: 300px;
			background-color: var(--profile-bg);
			border-radius: 15px;
			outline: 2px solid;
			border-color: var(--list-border);
			padding: 10px;
			box-sizing: border-box;
		}

		.profile .icon {
			width: 98px;
			height: 147px;
			margin: 15px auto; /* Centered */
			border-radius: 15px;
		}

		.profile .score_table {
			margin: 15px auto;
			text-align: center;
			height: auto;
			width: 80%;
		}

		.profile .score_header {
			font-size: 14px;
			background: var(--light-yellow, #f1d5a1);
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			outline: 1px solid;
			padding: 8px;
		}

		.profile .score_body {
			font-size: 14px;
			background-color: var(--list-bg);
			border-bottom-left-radius: 10px;
			border-bottom-right-radius: 10px;
			padding: 10px;
			outline: 1px solid;
		}

		.profile_info {
			width: 100%;
			height: auto;
			margin: 15px 0;
			border-radius: 15px;
			outline: 1px solid;
			border-color: var(--list-border);
			background-color: var(--profile-bg);
			padding: 10px;
			box-sizing: border-box;
		}

		.bio_info {
			display: flex;
			flex-direction: column; /* Stack items vertically */
			align-items: center;
		}

		.bio_info .icon {
			width: 80px;
			height: 80px;
			border-radius: 50%;
			margin: 10px auto;
		}

		.bio_info .name_id {
			font-size: 16px;
			margin: 10px auto;
			text-align: center;
		}

		.bio_info .name_id .id {
			color: var(--theme-dark-text);
			display: block;
			margin-top: 5px;
		}

		.personal_info {
			font-size: 14px;
			margin: 15px 10px;
			line-height: 1.5;
		}
	}
</style>
