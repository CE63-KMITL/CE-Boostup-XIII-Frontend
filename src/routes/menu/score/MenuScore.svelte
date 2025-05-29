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
	import { popup, selectData } from "./score";
	import { closePopup } from "$lib/components/PopUp.svelte";
	import Claim from "./components/Claim.svelte";
	import { fade } from "svelte/transition";
	import HistoryBtn from "./components/HistoryBtn.svelte";
	import EditSelectedUser from "./components/EditSelectedUser.svelte";
	import * as api from "$lib/fetchApi";

	//-------------------------------------------------------
	// Component State
	//-------------------------------------------------------
	let headerTabs: { [key: string]: string } = { scoreDetail: "คะแนนของฉัน", claimPrice: "ของรางวัล" };
	let activeTab = "scoreDetail";

	//-------------------------------------------------------
	// Functions
	//-------------------------------------------------------
	function setSelectDataToNull() {
		selectData.set(null);
	}

	//-------------------------------------------------------
	// Lifecycle
	//-------------------------------------------------------
	onMount(async () => {
		if (!$userData?.id) {
			headerTabs = {};
			activeTab = "";
			return;
		}

		let fetchedUserData;
		try {
			const result = await api.call(`/user/full-data/${$userData.id}`, {
				withToken: true,
			});

			if (result && Object.keys(result).length > 0) {
				$userData = { ...$userData, ...result };
				fetchedUserData = $userData;
			} else {
				console.warn(`No data returned or empty data for user ID: ${$userData.id}`);
				headerTabs = {};
				activeTab = "";
				return;
			}
		} catch (error) {
			console.error("Failed to fetch user data:", error);
			headerTabs = {};
			activeTab = "";
			return;
		}

		if (IsRole(Role.STAFF)) {
			headerTabs = { scoreDetail: "ข้อมูล", scEditData: "แก้ไขคะแนน" };
			activeTab = "scEditData";
		} else {
			headerTabs = { scoreDetail: "คะแนนของฉัน", claimPrice: "ของรางวัล" };
			activeTab = "scoreDetail";
		}
	});
</script>

{#if $popup}
	<div class="backdrop" onclick={closePopup} in:fade out:fade>
		<div id="popup" in:azScale out:azScale>
			{@render $popup()}
		</div>
	</div>
{/if}

<!--
-------------------------------------------------------
 Main Component Structure
-------------------------------------------------------
-->
<div id="Score">
	<Tab id="sc-left" class="side" headers={headerTabs} bind:activeTab {...$$restProps}>
		{#if $userData?.id}
			{#if activeTab == "scoreDetail"}
				<div id="scoreTab" class="full" in:azScale={{ delay: 250 }} out:azScale>
					<div class="scl-image">
						<img src="/house/{$userData.house}.jpg" alt="" />
					</div>
					<div id="scl-main">
						<div class="scl-top">
							<div id="scl-top-userIcon">
								<UserIcon name={$userData.name} data={$userData.icon}></UserIcon>
							</div>
							<span class="scl-top-name">{$userData.name}</span>
							<span style="color: var(--sc-orangedark)">{$userData.studentId} </span>
						</div>
						<Frame id="scl-detail-top">นักผจญภัยอันดับที่ {$userData?.rank}</Frame>
						<div id="scl-detail-bottom">{$userData?.score}</div>
						<Frame id="scl-detail-top">บ้านอันดับที่ {$userData?.houseRank}</Frame>
						<div id="scl-detail-bottom">{$userData?.houseScore}</div>

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

	<Frame id="sc-right" full="" blur-bg border={false}>
		<ScoreTab></ScoreTab>
	</Frame>

	<div id="sc-bottom" class:show={$selectData != null}>
		{#if $selectData != null}
			<div in:azScale={{ delay: 250 }} out:azScale class="full">
				<EditSelectedUser></EditSelectedUser>
				<Button
					color="var(--bg)"
					hoverColor="var(--status-not-started)"
					textColor="var(--status-not-started)"
					outline="var(--status-not-started)"
					onclick={setSelectDataToNull}>ปิด</Button
				>
			</div>
		{/if}
	</div>
</div>

<!--
-------------------------------------------------------
 Styles
-------------------------------------------------------
-->
<style lang="scss">
	.scl-top-name {
		width: 100%;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.backdrop {
		z-index: 1;
	}
	:global(#sc-bottom) {
		height: 90%;
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
			border: transparent;
		}

		:global(#sc-right) {
			display: flex;
			flex-direction: column;
			border-radius: 20px;
			box-shadow: 0 4px 24px var(--list-shadow);
			padding: 1% 2%;
			width: 60%;
			height: 100%;
			overflow: hidden;
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
			height: 50%;
			padding: 1%;

			img {
				min-width: fit-content;
				height: 100%;
				border-radius: var(--n-border-radius);
				box-shadow: 0 4px 24px var(--list-shadow);
			}
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
				align-items: center;
				gap: 5px;

				#scl-top-userIcon {
					min-width: 50px;
					width: 15%;
					height: 100%;
					aspect-ratio: 1/1;
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
				display: none;
			}

			:global(#sc-right) {
				width: auto;
				height: 100%;
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
