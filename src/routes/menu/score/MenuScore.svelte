<script lang="ts">
	import Frame from "$lib/components/Frame.svelte";
	import ScoreTab from "./components/ScoreTab.svelte";
	import Button from "$lib/components/Button.svelte";
	import Tab from "$lib/components/Tab.svelte";
	import * as api from "$lib/fetchApi";
	import { azScale } from "$lib/transition";
    import { IsRole, userData } from "$lib/auth.local";
    import { Role } from "$lib/enum/role";
    import { onDestroy, onMount } from "svelte";
    import Search from "$lib/components/Icons/Search.svelte";
    import { searchParams, selectedIDStudent } from "./score";
	import { sleep } from "$lib/normalFunction";
    import type { Unsubscriber } from "svelte/store";
	import { type Student } from "$lib/constants/student";
	import History from "./components/History.svelte";

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
	
	let isSearching = "";
	let selectedStudent = null;

	let showPopup = false;
	function openPopup() { showPopup = true; }
	function closePopup() { showPopup = false; }
	function protectClick(event) { event.stopPropagation(); }

	function test() {

		// $userData
		// $userData.icon , $userData.id etc.
		// icon, id(userId), name, studentId, role, house, score

		// method: "POST" or method: "GET"
		// data: {...}
		// withToken: true


		// --------------------- GET ---------------------

		// 💜💜💜 //
		// House - get All house score (use ASC or DESC)
		// let houseScore = api.call(`/houseScores?order=ASC`);
			// get score by house name (one by one)
			// let houseScore = api.call(`/houseScores/barbarian`);


		// MyHouse - get all users in a specific house  /house/ชื่อบ้าน
		// let houseScore = api.call(`/house/barbarian`);

		// Pop-up - ใช้ userId หาเอา score กับ scoreLogs ที่เก็บ history มา
		// let user = api.call(`/user/score/${$userData.id}`);
		
		// Selected user to get N'tung page - ใช้ userId หา data ทั้งหมดของคนนั้นๆ
		// let user = api.call(`/user/${$userData.id}`, {withToken: true});


		// --------------------- Editing Data ---------------------

		// + Score to selected user
		// let user = api.call(`/user/score/add`, {
		// 	method: "POST",
		// 	data: { userId: "userที่จะเพิ่มคะแนน", amount: 100, message: "จ๊ะเอ๋~ ตัวเองง" },
		// 	withToken: true
		// });

		// - Score to selected user
		// let user = api.call(`/user/score/subtract`, {
		// 	method: "POST",
		// 	data: { userId: "userที่จะเพิ่มคะแนน", amount: 100, message: "จ๊ะเอ๋~ ตัวเองง" },
		// 	withToken: true
		// });
		

		// --------------------- Search ---------------------
		// /user/search?page=1&limit=16&orderByScore=true&role=dev


		// console.log(houseScore);
		// console.log(user);

	}

	onMount(async () => {

		if (IsRole(Role.STAFF)) {
			headerTabs = { scData: "ข้อมูล" , scEditData: "แก้ไขคะแนน" }
			activeTab = "scEditData";
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
	{#if IsRole(Role.STAFF)}
		<Tab id="sc-left" class="side" headers={headerTabs} bind:activeTab {...$$restProps}>
			{#if activeTab == "scData"}
				<div id="scoreTab" class="full" in:azScale={{ delay: 250 }} out:azScale>
					<div class="scl-image">
						<img src={profile.cardImg} alt="" />
					</div>
					<div id="scl-main">
						<div class="scl-top">
							<span>{profile.name}</span>
							<span style="color: var(--sc-orangedark)">{profile.studentId} </span>
						</div>
						<Frame id="scl-detail-top">นักผจญภัยอันดับที่ {profile.rank}</Frame>
						<div id="scl-detail-bottom">{profile.score}</div>
						<Frame id="scl-detail-top">บ้านอันดับที่ {profile.houseRank}</Frame>
						<div id="scl-detail-bottom">{profile.houseScore}</div>
						<Button class="scl-btn" onclick={test} filter={false}>ประวัติคะแนน</Button>
					</div>
				</div>
			{:else if activeTab == "scEditData"}
				<div id="scoreTab-editscore" class="full" in:azScale={{ delay: 250 }} out:azScale>
					<Frame id="sc-search-frame">
						<Search></Search>
						<input 
							id="search"
							placeholder="ชื่อ / รหัสนักศึกษา"
							oninput={(e: any) => {
								$searchParams["search"] = e.target.value;
							}}
							bind:value={isSearching}
							style="
							border: 0px;
							background-color: transparent;
							"

						/>
					</Frame>
					{#if selectedStudent == null && isSearching == ""}
						<div id="sc-below-search" in:azScale={{ size: 0.99, delay: 250 }} out:azScale={{ size: 0.99, duration: 100 }}>
							<div class="scl-image">
								<img src={"dragon-logo.png"} alt="" />
							</div>
							<span id="dragontext">CE BOOSTUP</span>
						</div>
					{/if}
				</div>
			{/if}
		</Tab>
	{:else if IsRole(Role.MEMEBER)}
		<Tab id="sc-left" class="side" headers={headerTabs} bind:activeTab {...$$restProps}>
			{#if activeTab == "scoreDetail"}
				<div id="scoreTab" class="full" in:azScale={{ delay: 250 }} out:azScale>
					<div class="scl-image">
						<img src={profile.cardImg} alt="" />
					</div>
					<div id="scl-main">
						<div class="scl-top">
							<span>{profile.name}</span>
							<span style="color: var(--sc-orangedark)">{profile.studentId} </span>
						</div>
						<Frame id="scl-detail-top">นักผจญภัยอันดับที่ {profile.rank}</Frame>
						<div id="scl-detail-bottom">{profile.score}</div>
						<Frame id="scl-detail-top">บ้านอันดับที่ {profile.houseRank}</Frame>
						<div id="scl-detail-bottom">{profile.houseScore}</div>
						<Button class="scl-btn" onclick={openPopup} filter={false}>ประวัติคะแนน</Button>
					</div>
				</div>
			{:else if activeTab == "claimPrice"}
				<div class="full">claimPrice naja</div>
			{/if}
		</Tab>
	{/if}
	
	<!-- SC-Right Side -->
	<Frame id="sc-right" full="" blur-bg border={false}>
		<ScoreTab></ScoreTab>
	</Frame>
</div>

<!-- 
-------------------------------------------------------
Popup Score History
-------------------------------------------------------
-->

{#if showPopup}
	<div class="backdrop" onclick={closePopup} in:azScale out:azScale>
		<div id="popup" onclick={protectClick} in:azScale out:azScale>
			<div id="popup-top">ประวัติคะแนน</div>
			<div id="popup-middle"><History></History></div>
			<div id="popup-bottom"> 
				<button class="sc-history-btn" onclick={closePopup}>ปิด</button> 
			</div>
		</div>
	</div>
{/if}

<!-- 
-------------------------------------------------------
Style SCSS Na
-------------------------------------------------------
-->

<style lang="scss">
	#Score {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		gap: 1%;
		padding: 2% 5% 2% 5%;
		box-sizing: border-box;
		container-type: size;

		:global(#sc-left) {
			border-radius: 20px;
			width: 35%;
		}

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
			// height: auto;
			// width: auto;
			width: 100%;
			height: 70%;
			margin: 60px 0px 0px 0px;
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

		:global(#sc-search-frame) {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 0%;
			padding-inline: 10px;
			width: 100%;
			border-radius: 25px;
		}

		:global(#sc-below-search) {
			width: 55%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

		span#dragontext {
			filter: drop-shadow( 0 2px 3px var(--list-shadow));
			font-size: 16px;
		}
	}


// -------------------------------------------------------
// 	Score History Pop-up
// -------------------------------------------------------

	.backdrop {
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
		inset: 0;
		background-color: var(--sc-shadow);
	}

	#popup {
		display: flex;
		flex-direction: column;
		background-color: var(--sc-bg-popup);
		box-shadow: 0 0 20px var(--list-shadow);
		padding: 15px;
		border-radius: 20px;
		width: 90%;
		height: 75%;
		max-width: 500px;

		#popup-middle {
			display: flex;
			flex-direction: column;
			margin-top: 10px;
			padding: 1%;
			overflow-y: auto;
		}

		#popup-bottom {
			text-align: center;
			margin-top: 15px;

			.sc-history-btn {
				background-color: var(--sc-orangelight);
				color: var(--text);
				width: 50%;
				padding: 10px;
				border-radius: 10px;
				font-size: 1rem;
				font-weight: 500;
				transition: background-color 0.3s ease;
			}

			.sc-history-btn:hover {
				background-color: var(--sc-orangedark);
			}
		}
	}

	

// -------------------------------------------------------
// 	Mobile phone Mode
// -------------------------------------------------------


	@media (max-width: 920px) {
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

			div.scl-image {
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

			// :global(#sc-below-search) {
			// 	display: none;
			// }

			.scl-image {
				width: 80%;
			}
		}

		#popup {
			max-width: 500px;
		}
	}
</style>
