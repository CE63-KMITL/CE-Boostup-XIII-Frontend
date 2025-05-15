<script lang="ts">
	import Frame from "$lib/components/Frame.svelte";
	import ScoreTab from "./components/ScoreTab.svelte";
	import Button from "$lib/components/Button.svelte";
	import Tab from "$lib/components/Tab.svelte";
	import { azScale } from "$lib/transition";
	import { IsRole, userData } from "$lib/auth.local";
	import { Role } from "$lib/enum/role";
	import { onMount } from "svelte";
	import Search from "$lib/components/Icons/Search.svelte";
	import History from "./components/History.svelte";
    import UserIcon from "$lib/components/UserIcon.svelte";
    import ProfileUser from "$lib/components/ProfileUser.svelte";
	import { selectData } from "./score";
    import EditScore from "./components/EditScore.svelte";

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
	let historyWay;
	let currentSelectData = null;

	// Edit Score (Add+ & Substract(Minus-))
	let editMessage: string;
	let editScore: number;

	let editMethod = "";
	let dataEditScore = {
		userId: "",
		amount: 0,
		message: "" }
	let showEditScore = false;
	// let showEditScore = true;
	
		// Plus & Substract 
	function callEditScore() { showEditScore = true; }
	function setEditScore(setMethod: string, setUserId: string, setAmount: number, setMessage: string) {
		
		//setMehtod need to be "+" or "-" Naja to check method in component
		editMethod = setMethod;
		dataEditScore = {
			userId: setUserId,
			amount: setAmount,
			message: setMessage, }
		
		callEditScore();
	}

	// Pop-up Score History
	let showHistoryPopup = false;
	function showUserHistory(userHistory: any) {
		if (userHistory == $userData) {
			historyWay = userHistory;
			currentSelectData = userHistory;
		} else if (userHistory == $selectData) {
			historyWay = userHistory.data;
		} 
		showHistoryPopup = true;
	}

	function closeUserHistory(userHistory: any) {
		if (userHistory.id === $userData.id) {
			currentSelectData = null;
		}
		showHistoryPopup = false;
	}

	function protectClick(event) { event.stopPropagation(); }

	onMount(async () => {

		if (IsRole(Role.STAFF)) {
			headerTabs = { scData: "ข้อมูล", scEditData: "แก้ไขคะแนน" };
			activeTab = "scEditData";
		}
	});

	$: console.log("This is your currentData na",currentSelectData);

	$: console.log("Your selectData has changed.",$selectData);
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

							<!-- ยังขาดข้อมูล rank, houseRank, houseScore -->

							<div id="scl-top-userIcon"> <UserIcon data={$userData.icon}></UserIcon> </div>
							<span>{$userData.name}</span>
							<span style="color: var(--sc-orangedark)">{$userData.studentId} </span>
						</div>
						<Frame id="scl-detail-top">นักผจญภัยอันดับที่ {profile.rank}</Frame>
						<div id="scl-detail-bottom">{$userData.score}</div>
						<Frame id="scl-detail-top">บ้านอันดับที่ {profile.houseRank}</Frame>
						<div id="scl-detail-bottom">{profile.houseScore}</div>
						<Button class="scl-btn" onclick={() => showUserHistory($userData)} filter={false}>ประวัติคะแนน</Button>
					</div>
				</div>
			{:else if activeTab == "claimPrice"}
				<div class="full">claimPrice naja</div>
			{:else if activeTab == "scEditData"}
				<div id="scoreTab-editscore" class="full" in:azScale={{ delay: 250 }} out:azScale>
					<Frame id="sc-search-frame">
						<Search></Search>
						<input
							id="search"
							placeholder="ชื่อ / รหัสนักศึกษา"
							oninput={(e: any) => {
								// $searchParams["search"] = e.target.value;
								// $searchParams["page"] = e.target.value;
							}}
							bind:value={isSearching}
							style="
							border: 0px;
							background-color: transparent;
							"
						/>
					</Frame>
					{#if $selectData != null}
						<div class="sc-instead-ntung" in:azScale={{ size: 0.99, delay: 250 }} out:azScale={{ size: 0.99, duration: 100 }}>
							<div class="sc-instead-ntung-top-profile">
								<div style="padding: 10px 20px;"> 

									<!-- ยังขาดข้อมูล rank, houseRank, houseScore -->

									<ProfileUser user={$selectData.data}/> 
								</div>
								<div class="sc-instead-ntung-top-detail">
									<div id="detail-top">นักผจญภัยอันดับที่ {profile.rank}</div>
									<div id="detail-bottom">{$selectData.data.score}</div>
									<div id="detail-top">บ้านอันดับที่ {profile.houseRank}</div>
									<div id="detail-bottom">{profile.houseScore}</div>
									<Button id="detail-btn" onclick={() => showUserHistory($selectData)} filter={false}>ประวัติคะแนน</Button>
								</div>
							</div>
							<div class="sc-instead-ntung-middle">
								<input 
									id="inputMessage" 
									placeholder="หมายเหตุ* (ใส่เหตุผลในการแก้ไขคะแนนด้วยน้า ( •̀ ω •́ )✧)" 
									type="string" 
									bind:value={editMessage}/>
							</div>
							<div class="sc-instead-ntung-bottom">
								<input 
									id="inputScore" 
									placeholder="คะแนน" 
									type="number" 
									bind:value={editScore} />
								<div id="editScore-btn">
									<Button class="plusScore-btn" onclick={() => setEditScore("+", $selectData.data.id, editScore, editMessage)} 
										color="var(--sc-plus)">บวกคะแนน</Button>
									<Button class="minusScore-btn" onclick={() => setEditScore("-", $selectData.data.id, editScore, editMessage)} 
										color="var(--sc-minus)">ลบคะแนน</Button>
								</div>
							</div>
						</div>
					{:else if $selectData == null && isSearching == ""}
						<div id="sc-below-search" in:azScale={{ size: 0.99, delay: 250 }} out:azScale={{ size: 0.99, duration: 100 }}>
							<div class="dragon-image">
								<img src={"dragon-logo.png"} alt="" />
							</div>
							<span id="dragontext">CE BOOSTUP</span>
						</div>
					{/if}
				</div>
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

{#if showHistoryPopup}


	<div class="backdrop" onclick={() => closeUserHistory(currentSelectData)} in:azScale out:azScale>
		<div id="popup" onclick={protectClick} in:azScale out:azScale>
			<div id="popup-top">ประวัติคะแนน</div>
			<div id="popup-middle"><History userDataHistory={historyWay}></History></div>
			<div id="popup-bottom"> 
				<button class="sc-history-btn" onclick={() => closeUserHistory(historyWay)}>ปิด</button> 
			</div>
		</div>
	</div>
{/if}

<!-- 
-------------------------------------------------------
Popup Score History
-------------------------------------------------------
-->

{#if showEditScore}
	<EditScore getMethod={editMethod} getData={dataEditScore}/>
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
			height: 70%;
			padding: 5%;
			margin-top: 25%;
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

		:global(#sc-search-frame) {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 0px;
			padding-inline: 10px;
			width: 100%;
			border-radius: 25px;
		}

		:global(#sc-below-search) {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.dragon-image { width: 60%; }
			#dragontext { filter: drop-shadow( 0 2px 3px var(--list-shadow)); }

		}
	}

	// -------------------------------------------------------
	// 	Score History Pop-up
	// -------------------------------------------------------

	.sc-instead-ntung {
		width: 100%;
		height: 100%;
		margin: 10px 0;
		border-radius: 10px;
		overflow-y: auto;

		.sc-instead-ntung-top-profile {
			display: flex;
			flex-direction: column;
			border: 1px solid var(--outline);
			background-color: var(--sc-bg);
			width: 100%;
			height: auto;
			padding-bottom: 20px;
			margin-bottom: 10px;
			border-radius: 10px;

			.sc-instead-ntung-top-detail {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 0 50px;

				#detail-top {
					background-color: var(--sc-orangelight);
					border: 1px solid var(--outline);
					border-radius: 10px 10px 0 0;
					text-align: center;
					padding: 1.5%;
					width: 100%;
				}

				#detail-bottom {
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

		.sc-instead-ntung-middle {
			width: 100%;
			height: auto;
			margin-bottom: 10px;

		}

		.sc-instead-ntung-bottom {
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

			#inputScore {
				text-align: center;
				background-color: transparent;
				margin-bottom: 10px;
				width: 55%;

			}
			
			#editScore-btn {
				display: flex;
				flex-direction: row;
				gap: 30px;
				width: 80%;

				:global(.plusScore-btn) { padding: 10px 20px; }
				:global(.minusScore-btn) { padding: 10px 20px; }

			}
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
		background-color: var(--sc-bg);
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

	@media (max-width: 920px){
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

			.scl-image {
				width: 80%;
			}

			:global(div#sc-below-search) {
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				
				.dragon-image { width: 30%; }
			}
		}

		#popup {
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
