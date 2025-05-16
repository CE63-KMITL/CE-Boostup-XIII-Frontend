<script lang="ts">
	import Frame from "$lib/components/Frame.svelte";
	import ScoreTab from "./components/ScoreTab.svelte";
	import Button from "$lib/components/Button.svelte";
	import Tab from "$lib/components/Tab.svelte";
	import { azScale } from "$lib/transition";
	import { IsRole, userData } from "$lib/auth.local";
	import { Role } from "$lib/enum/role";
	import { onMount } from "svelte";
	import UserIcon from "$lib/components/UserIcon.svelte";
	import ProfileUser from "$lib/components/ProfileUser.svelte";
	import { selectData, selectedIDStudent } from "./score";
	import EditScore from "./components/EditScore.svelte";
	import { showPopup, closePopup } from "$lib/components/PopUp.svelte";
	import Claim from "./components/Claim.svelte";
	import { fade } from "svelte/transition";
	import StaffClaim from "./components/StaffClaim.svelte";
	import HistoryBtn from "./components/HistoryBtn.svelte";
	import EditSelectedUser from "./components/EditSelectedUser.svelte";

	const profile = {
		name: "เพ็ญพิชชา ปานจันทร์",
		studentId: "68010662",
		rank: 23,
		score: 300,
		houseRank: 5,
		houseScore: 1200,
		cardImg: "/house/warlock.png",
	};

	let headerTabs: { [key: string]: string } = { scoreDetail: "คะแนนของฉัน", claimPrice: "ของรางวัล" };
	let activeTab = "scoreDetail";

	function imageHousePath(filename: string): string {
        return `/house/${filename}.png`;
    }

	function setSelectDataToNull() {
		selectData.set(null);
	}

	onMount(async () => {
		if (IsRole(Role.STAFF)) {
			headerTabs = { scData: "ข้อมูล", scEditData: "แก้ไขคะแนน" };
			activeTab = "scEditData";
		}

		if (!$userData.id) {
			headerTabs = {};
		}
	});

</script>

<!-- 
-------------------------------------------------------
HTML Crapp
-------------------------------------------------------
-->

<div id="Score">
	<!-- SC-Left Side -->

	<Tab id="sc-left" class="side" headers={headerTabs} bind:activeTab {...$$restProps}>
		{#if $userData.id}
			{#if activeTab == "scoreDetail"}
				<div id="scoreTab" class="full" in:azScale={{ delay: 250 }} out:azScale>
					<div class="scl-image">
						<img src={profile.cardImg} alt="" />
					</div>
					<div id="scl-main">
						<div class="scl-top">
							<!-- ยังขาดข้อมูล rank, houseRank, houseScore -->

							<div id="scl-top-userIcon"><UserIcon data={$userData.icon}></UserIcon></div>
							<span>{$userData.name}</span>
							<span style="color: var(--sc-orangedark)">{$userData.studentId} </span>
						</div>
						<Frame id="scl-detail-top">นักผจญภัยอันดับที่ {profile.rank}</Frame>
						<div id="scl-detail-bottom">{$userData.score}</div>
						<Frame id="scl-detail-top">บ้านอันดับที่ {profile.houseRank}</Frame>
						<div id="scl-detail-bottom">{profile.houseScore}</div>
						<!-- <Button class="scl-btn" onclick={() => showUserHistory($userData)} filter={false}
							>ประวัติคะแนน</Button
						> -->
						<HistoryBtn giveMeYourUserData={$userData}></HistoryBtn>
					</div>
				</div>
			{:else if activeTab == "claimPrice"}
				<div id="scoreTab-claim" class="full" in:azScale={{ delay: 250 }} out:azScale>
					<Claim></Claim>
				</div>
			{:else if activeTab == "scEditData"}
				<div id="scoreTab-editscore" class="full" in:azScale={{ delay: 250 }} out:azScale>
					<EditSelectedUser></EditSelectedUser>
				</div>
			{/if}
		{:else}
			กรุณาเข้าสู่ระบบก่อนใช้งาน
		{/if}
	</Tab>

	<!-- SC-Right Side -->
	<Frame id="sc-right" full="" blur-bg border={false}>
		<ScoreTab></ScoreTab>
	</Frame>

	<div id="sc-bottom" class:show={$selectData != null}>
		{#if $selectData != null}
			<div in:azScale={{ delay: 250 }} out:azScale class="full">
				<Button onclick={setSelectDataToNull}>ปิด</Button>
			</div>
		{/if}
	</div>
</div>

<!-- 
-------------------------------------------------------
Style SCSS Na
-------------------------------------------------------
-->

<style lang="scss">
	:global(#sc-bottom) {
		height: 70%;
		opacity: 1;
		position: absolute;
		bottom: 0;
		width: 100%;
		left: 0;
		flex-direction: column;
		display: none;
		background: var(--bg-50);
		padding: 10px;
		border: 1px solid var(--outline);
		border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
		backdrop-filter: blur(5px);
		transition: all 0.25s ease-out;
	}

	:global(#sc-bottom:not(.show)) {
		height: 0;
		padding: 0;
		opacity: 0;
	}

	// :global(#sc-bottom.show) {
	// }

	#Score {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		gap: 1%;
		padding: 2% 5%;
		box-sizing: border-box;
		container-type: size;

		:global(#sc-left) {
			border-radius: 20px;
			width: 35%;
		}

		:global(#sc-right) {
			display: flex;
			flex-direction: column;
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
			width: 90%;
			height: auto;
			padding: 5%;
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

				#scl-top-userIcon {
					width: 15%;
					height: 100%;
				}
			}

			:global(#scl-detail-top) {
				background-color: var(--sc-orangelight);
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
				background-color: var(--sc-orangelight);
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
	:global(#scoreTab-editscore) {
		padding: 1% 20px;
		display: flex;
		flex-direction: column;
		align-items: center;

		:global(#sc-below-search) {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			:global(.dragon-image) {
				width: 60%;
			}
			:global(#dragontext) {
				filter: drop-shadow(0 2px 3px var(--list-shadow));
			}
		}
	}

	// -------------------------------------------------------
	// 	Score History Pop-up
	// -------------------------------------------------------

	:global(.sc-instead-ntung) {
		width: 100%;
		height: 100%;
		margin: 10px 0;
		border-radius: 10px;
		overflow-y: auto;

		:global(.sc-instead-ntung-top-profile) {
			display: flex;
			flex-direction: column;
			border: 1px solid var(--outline);
			background-color: var(--sc-bg);
			width: 100%;
			height: auto;
			padding-bottom: 20px;
			margin-bottom: 10px;
			border-radius: 10px;

			:global(.sc-instead-ntung-top-detail) {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 0 50px;

				:global(#detail-top) {
					background-color: var(--sc-orangelight);
					border: 1px solid var(--outline);
					border-radius: 10px 10px 0 0;
					text-align: center;
					padding: 1.5%;
					width: 100%;
				}

				:global(#detail-bottom) {
					background-color: var(--bg);
					border: 1px solid var(--outline);
					border-radius: 0px 0px 10px 10px;
					text-align: center;
					margin-bottom: 15px;
					padding: 1.5%;
					width: 100%;
				}

				:global(#detail-btn) {
					margin-top: 20px;
				}
			}
		}

		:global(.sc-instead-ntung-middle) {
			width: 100%;
			height: auto;
			margin-bottom: 10px;
		}

		:global(.sc-instead-ntung-bottom) {
			border: 1px solid var(--outline);
			background-color: var(--sc-bg);
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: auto;
			padding: 20px 0;
			border-radius: 10px;

			:global(#inputScore) {
				text-align: center;
				background-color: transparent;
				margin-bottom: 10px;
				width: 55%;
			}

			:global(#editScore-btn) {
				display: flex;
				flex-direction: row;
				gap: 30px;
				width: 80%;

				:global(.plusScore-btn) {
					padding: 10px 20px;
				}
				:global(.minusScore-btn) {
					padding: 10px 20px;
				}
			}
		}
	}

	// -------------------------------------------------------
	// 	Score History Pop-up
	// -------------------------------------------------------

	:global(.backdrop) {
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
		inset: 0;
		background-color: var(--sc-shadow);
	}

	:global(#popup) {
		display: flex;
		flex-direction: column;
		background-color: var(--sc-bg);
		box-shadow: 0 0 20px var(--list-shadow);
		padding: 15px;
		border-radius: 20px;
		width: 90%;
		height: 75%;
		max-width: 500px;

		:global(#popup-middle) {
			display: flex;
			flex-direction: column;
			margin-top: 10px;
			padding: 1%;
			overflow-y: auto;
		}

		:global(#popup-bottom) {
			text-align: center;
			margin-top: 15px;

			:global(.sc-history-btn) {
				background-color: var(--sc-orangelight);
				color: var(--text);
				width: 50%;
				padding: 10px;
				border-radius: 10px;
				font-size: 1rem;
				font-weight: 500;
				transition: background-color 0.3s ease;
			}

			:global(.sc-history-btn:hover) {
				background-color: var(--sc-orangedark);
			}
		}
	}

	// -------------------------------------------------------
	// 	Mobile phone Mode
	// -------------------------------------------------------

	:global(html[mobile]) {
		:global(#sc-bottom) {
			display: flex;
		}

		#Score {
			flex-direction: column;

			:global(#sc-left) {
				width: 100%;
				height: 35%;
			}

			:global(#sc-right) {
				width: auto;
				height: 60%;
			}
		}

		:global(#scoreTab) {
			flex-direction: row;
			align-items: start;
			justify-content: center;

			:global(div.scl-image) {
				height: auto;
				width: 90%;
				padding: 0px;
				margin-top: 0px;
			}
		}

		:global(#scoreTab-editscore) {
			display: flex;
			align-items: center;
			flex-direction: column;

			:global(.scl-image) {
				width: 80%;
			}

			:global(div#sc-below-search) {
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;

				:global(.dragon-image) {
					width: 30%;
				}
			}
		}

		:global(#popup) {
			max-width: 500px;
		}
	}

	@media (max-height: 550px) {
		:global(#scoreTab-editscore) {
			:global(div#sc-below-search) {
				padding: 20% 0;
			}
		}
	}
</style>
