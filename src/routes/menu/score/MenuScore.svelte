<script lang="ts">
	import Frame from "$lib/components/Frame.svelte";
	import ScoreTab from "./components/ScoreTab.svelte";
	import Button from "$lib/components/Button.svelte";
	import Tab from "$lib/components/Tab.svelte";
	import * as api from "$lib/fetchApi";
	import { azScale } from "$lib/transition";
    import { IsRole } from "$lib/auth.local";
    import { Role } from "$lib/enum/role";
    import { onDestroy, onMount } from "svelte";
    import Search from "$lib/components/Icons/Search.svelte";
    import { searchParams, selectedIDStudent } from "./score";
	import { sleep } from "$lib/normalFunction";
    import type { Unsubscriber } from "svelte/store";
	import { type Student } from "$lib/constants/student";
    import { eventNames } from "process";

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
	let allStudents: (Student | string)[] = [];
	
	// let studentSelectorElement;
	// let studentDetailsElement;

	let maxPageSC;
	let oldQuerySC = "";
	let needLoad = false;
	let isloaded = false;

	/*
    -------------------------------------------------------
    Score History
    -------------------------------------------------------
    */

	// let showHistory = false;
	// function openHistory() { showHistory = true; }
	// function closeHistory() { showHistory = false; }
	// function protectClick(event) { event.stopPropagation(); }

	/*
    -------------------------------------------------------
    Help Functions
    -------------------------------------------------------
    */

	// async function getQuerySC() {
	// 	const searchQuerySC = { search: $searchParams["search"] };

	// 	const querySC = Object.entries(searchQuerySC)
	// 		.filter(
	// 			([_, value]) => 
	// 			value !== null && 
	// 			value !== "" && 
	// 			(!Array.isArray(value) || value.length > 0)
	// 		)
	// 		.map(([key, value]) => {
	// 			if (Array.isArray(value)) {
	// 				let stringSC = "";
	// 				value.forEach((elementSC) => {
	// 					stringSC += `&${key}=${elementSC}`;
	// 				});
	// 				return stringSC;
	// 			}
	// 			return `${key}=${value}`;
	// 		})
	// 		.join("&");
	// 	return querySC;
	// }

	/*
    -------------------------------------------------------
    Animation Functions Coolๆ
    -------------------------------------------------------
    */

	// async function runProblemListAnimation(dataIds: string[]) {
	// 	for (let i = 0; i < dataIds.length; i++) {
	// 		const dataId = dataIds[i];
	// 		const element: HTMLDivElement = document.querySelector(`[data-problem-id="${dataId}"]`);

	// 		if (element) {
	// 			element.style.animation = `slide-in 0.2s ease-out forwards`;
	// 			await sleep(70);
	// 		}
	// 	}
	// }

	/*
    -------------------------------------------------------
    Data Functions
    -------------------------------------------------------
    */

	// async function updateStudents(isLoadMoreSC = false) {
	// 	const querySC = await getQuerySC();
	// 	if (querySC === oldQuerySC && (!isLoadMoreSC || maxPageSC <= $searchParams.page)) return;
	// 	oldQuerySC = querySC;

	// 	if (isLoadMoreSC) {
	// 		searchParams.update((params) => ({
	// 			...params,
	// 			page: params.page + 1
	// 		}));
	// 		// $searchParams.page++;
	// 		allStudents = [...allStudents, "loading"];
	// 	} else {
	// 		$selectedIDStudent = null;
	// 		$searchParams.page = 1;
	// 		isloaded = false;
	// 		allStudents = [];
	// 	}

	// 	const getAllStudents = await api.call(
	// 		`/user/search?${querySC}$page=${Number($searchParams.page)}`,
	// 		{ withToken: true }
	// 	);

	// 	console.log(getAllStudents);

	// 	if (getAllStudents && getAllStudents.data.length > 0 ) {
	// 		if (isLoadMoreSC) {
	// 			allStudents = [...allStudents.slice(0, -1), ...getAllStudents.data];
	// 		} else {
	// 			allStudents = getAllStudents.data;
	// 			maxPageSC = getAllStudents.totalPage;
	// 			isloaded = true;
	// 		}

	// 		requestAnimationFrame(() => {
	// 			runProblemListAnimation(getAllStudents.data.map((item) => item.id));
	// 		});

	// 	} else {
	// 		if (isLoadMoreSC) {
	// 			allStudents = allStudents.slice(0, -1);
	// 			$searchParams.page--;
	// 		} else {
	// 			maxPageSC = null;
	// 			allStudents = [];
	// 			isloaded = true;
	// 		}
	// 	}
	// }

	// async function loadMoreSC() {
	// 	if (needLoad) return;
	// 	console.log("need load na");
	// 	needLoad = true;
	// 	await updateStudents(true);
	// 	needLoad = false;
	// }

	// async function updateStudentsDetail() {
	// 	if(!$selectedIDStudent) return;
	// }
	
	/*
    -------------------------------------------------------
    Cycle Na Won Won Pai
    -------------------------------------------------------
    */

	// let subscribeSelectedIDStudent: Unsubscriber;
	// let subscribeSearchParams: Unsubscriber;

	onMount(async () => {
		// studentSelectorElement = document.querySelector("#")
		// studentDetailsElement;

		// await updateStudents();

		// subscribeSearchParams = searchParams.subscribe(() => {
		// 	updateStudents();
		// });
		// subscribeSelectedIDStudent = selectedIDStudent.subscribe(async () => {
		// 	selectedStudent = null;

		// 	const studentData = 
		// 		allStudents.find((student) => typeof student === "object" && student.id === $selectedIDStudent) || selectedStudent;
		
		// 	if (studentData) {
		// 		studentData.detail = await api.call(`/user/${studentData.id}`, {
		// 			withToken: true
		// 		});
		// 	}
		// 	selectedStudent = studentData;
		// });

		if (IsRole(Role.STAFF)) {
			headerTabs = { scData: "ข้อมูล" , scEditData: "แก้ไขคะแนน" }
			activeTab = "scEditData";
		}
	});

	// onDestroy(() => {
	// 	if (subscribeSearchParams) subscribeSearchParams();
	// 	if (subscribeSelectedIDStudent) subscribeSelectedIDStudent();
	// });

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
							<span style="color: var(--sc-text)">{profile.studentId} </span>
						</div>
						<Frame id="scl-detail-top">นักผจญภัยอันดับที่ {profile.rank}</Frame>
						<div id="scl-detail-bottom">{profile.score}</div>
						<Frame id="scl-detail-top">บ้านอันดับที่ {profile.houseRank}</Frame>
						<div id="scl-detail-bottom">{profile.houseScore}</div>
						<Button class="scl-btn" filter={false}>ประวัติคะแนน</Button>
						<!-- onclick={openHistory} -->
						<!-- {#if showHistory}
							<div class="backdrop" onclick={closeHistory}>
								<div id="popup" onclick={protectClick}>
									<div>Hello, World</div>
									<Button onclick={closeHistory}>Close Ja</Button>
								</div>
							</div>
						{/if} -->
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
								border: 0; 
								background-color: transparent;
								padding: 5px;
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
							<span style="color: var(--sc-text)">{profile.studentId} </span>
						</div>
						<Frame id="scl-detail-top">นักผจญภัยอันดับที่ {profile.rank}</Frame>
						<div id="scl-detail-bottom">{profile.score}</div>
						<Frame id="scl-detail-top">บ้านอันดับที่ {profile.houseRank}</Frame>
						<div id="scl-detail-bottom">{profile.houseScore}</div>
						<Button class="scl-btn" filter={false}>ประวัติคะแนน</Button>
						<!-- onclick={openHistory} -->
						<!-- {#if showHistory}
							<div class="backdrop" onclick={closeHistory}>
								<div id="popup" onclick={protectClick}>
									<div>Hello, World</div>
									<Button onclick={closeHistory}>Close Ja</Button>
								</div>
							</div>
						{/if} -->
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

<!-- {#if showHistory}
	<div class="backdrop" onclick={closeHistory}>
		<div id="popup" onclick={protectClick}>
			<h2>Popup</h2>
			<p>Detail kub</p>
			<Button onclick={closeHistory}>Close Ja</Button>
		</div>
	</div>
{/if} -->


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
			// padding: 10% 10%;
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
	}
</style>
