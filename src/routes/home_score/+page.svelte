<script lang="ts">
	import Fullscreen from "$lib/components/Fullscreen.svelte";
	import Frame from "$lib/components/Frame.svelte";
	import ScoreTab from "./components/ScoreTab.svelte";
	import Button from "$lib/components/Button.svelte";
	import Tab from "$lib/components/Tab.svelte";
	import { azScale } from "$lib/transition";

	let headerTabs: { [key: string]: string } = { scoreDetail: "คะแนนของฉัน", claimPrice: "ของรางวัล" };
	let activeTab = "scoreDetail";

	const profile = {
		name: "เพ็ญพิชชา ปานจันทร์",
		studentId: "68010662",
		rank: 23,
		score: 300,
		houseRank: 5,
		houseScore: 1200,
		cardImg: "/house/warlock.png",
	};
</script>

<Fullscreen>
	<div id="Score">
		<!-- SC-Left Side -->
		<Tab id="sc-left" class="side" headers={headerTabs} bind:activeTab {...$$restProps}>
			{#if activeTab == "scoreDetail"}
				<div id="scoreTab" class="full" in:azScale={{ delay: 250 }} out:azScale>
					<div class="scl-image">
						<img src={profile.cardImg} alt="" />
					</div>
					<div id="scl-main">
						<div class="scl-top">
							<span>{profile.name}</span>
							<span style="color: var(--sc-text)">{profile.studentId} </span>
						</div>
						<Frame id="scl-detail-top">นักผจญภัยอันดับที่ {profile.rank}</Frame>
						<div id="scl-detail-bottom">{profile.score}</div>
						<Frame id="scl-detail-top">บ้านอันดับที่ {profile.houseRank}</Frame>
						<div id="scl-detail-bottom">{profile.houseScore}</div>
						<Button class="scl-btn" filter={false}>ประวัติคะแนน</Button>
					</div>
				</div>
			{:else if activeTab == "claimPrice"}
				<div class="full">claimPrice naja</div>
			{/if}
		</Tab>

		<!-- SC-Right Side -->
		<Frame id="sc-right" full="" blur-bg border={false}>
			<ScoreTab></ScoreTab>
		</Frame>
	</div>
</Fullscreen>

<style lang="scss">
	// -------------------------------------------------------
	// Left Side SC GUI
	// -------------------------------------------------------

	#Score {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		gap: 1%;
		padding: 2% 5% 2% 5%;
		box-sizing: border-box;
		container-type: size;

		// -------------------------------------------------------
		// Left Side SC GUI
		// -------------------------------------------------------

		:global(#sc-left) {
			border-radius: 20px;
			width: 35%;
		}

		// -------------------------------------------------------
		// Right Side SC GUI
		// -------------------------------------------------------

		:global(#sc-right) {
			border-radius: 20px;
			box-shadow: 0 4px 24px var(--list-shadow);
			padding: 1% 2%;
			width: 60%;
			height: 100%;
		}
	}

	:global(.side) {
		box-shadow: 0 4px 24px var(--list-shadow);
	}

	:global(#scoreTab) {
		padding: 1% 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		div.scl-image {
			height: auto;
			width: 70%;
		}

		:global(#scl-main) {
			display: flex;
			flex-direction: column;
			background-color: var(--bg);
			border: 0.5px solid var(--outline);
			border-radius: 10px;
			margin: 0;
			padding: 2px;
			width: 100%;

			.scl-top {
				display: flex;
				justify-content: space-between;
				padding: 5% 5% 0 5%;
			}

			:global(#scl-detail-top) {
				background-color: var(--sc-bg);
				border: 1px solid var(--outline);
				border-radius: 10px 10px 0 0;
				margin: 3% 20px 0px 20px;
				padding: 1.5%;
				display: flex;
				flex-direction: column;
				align-items: center;
				height: 80%;
			}

			#scl-detail-bottom {
				background-color: var(--bg);
				border: 1px solid var(--outline);
				border-top-width: 0;
				border-radius: 0px 0px 10px 10px;
				margin: 0px 20px;
				padding: 1.5%;
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 15px;
				width: auto;
			}

			:global(Button.scl-btn) {
				background-color: var(--sc-bg);
				border: 1px solid var(--outline);
				font-size: 14px;
				padding: 2%;
				box-shadow: 0 3px 5px var(--list-shadow);
				width: auto;
				margin: 5% 20px;
				color: var(--text);
			}
		}
	}

	@media (max-width: 920px) {
		#Score {
			flex-direction: column;

			:global(#sc-left) {
				width: 100%;
				height: 35%;
				// flex-direction: row;
			}

			:global(#sc-right) {
				width: auto;
				height: 60%;
			}
		}

		:global(#scoreTab) {
			flex-direction: row;
			align-items: start;
		}
	}
</style>
