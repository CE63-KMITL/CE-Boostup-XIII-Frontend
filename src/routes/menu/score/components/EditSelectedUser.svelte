<script lang="ts">
	import { selectData } from "../score";
	import { showPopup } from "$lib/components/PopUp.svelte";
	import { azScale } from "$lib/transition";
	import ProfileUser from "$lib/components/ProfileUser.svelte";
	import Button from "$lib/components/Button.svelte";
	import HistoryBtn from "./HistoryBtn.svelte";
	import EditScore from "./EditScore.svelte";
	import StaffClaimBtn from "./StaffClaimBtn.svelte";
	import { say } from "$lib/normalFunction";

	const profile = {
		name: "",
		studentId: "",
		rank: 23,
		score: 300,
		houseRank: 5,
		houseScore: 1200,
	};

	let editMessage: string;
	let editScore: number;
	let editMethod = "";
	let dataEditScore = {
		userId: "",
		amount: 0,
		message: "",
	};
	let showEditScore = false;

	function openEditScore() {
		showEditScore = true;
	}
	function closeEditScore() {
		showEditScore = false;
	}
	function setEditScore(setMethod: string, setUserId: string, setAmount: number, setMessage: string) {
		//setMehtod need to be "+" or "-" Naja to check method in component
		if (setAmount == null || setAmount == 0) {
			showPopup(say("กรุณาใส่คะแนนที่ต้องการแก้ไขด้วยน้า", "( •̀ ω •́ )✧"));
			return;
		} else {
			editMethod = setMethod;
			dataEditScore = {
				userId: setUserId,
				amount: setAmount,
				message: setMessage,
			};

			editMessage = null;
			editScore = null;

			openEditScore();
		}
	}
</script>

{#if $selectData != null}
	<div class="sc-instead-ntung" in:azScale={{ size: 0.99, delay: 250 }} out:azScale={{ size: 0.99, duration: 100 }}>
		<div class="sc-instead-ntung-top-profile">
			<div style="padding: 10px 20px; ">
				<ProfileUser user={$selectData.data} />
			</div>
			<div class="sc-instead-ntung-top-detail">
				<div id="detail-top">นักผจญภัยอันดับที่ {$selectData.row}</div>
				<div id="detail-bottom">{$selectData.data.score}</div>
				<div id="detail-top">บ้านอันดับที่ {$selectData.data.houseRank}</div>
				<div id="detail-bottom">{$selectData.data.houseScore}</div>
				<div id="detail-btn">
					<StaffClaimBtn currentSelectData={$selectData}></StaffClaimBtn>
					<HistoryBtn giveMeYourUserData={$selectData} />
				</div>
			</div>
		</div>
		<div class="sc-instead-ntung-middle">
			<input
				id="inputMessage"
				placeholder="หมายเหตุ* (ใส่เหตุผลในการแก้ไขคะแนนด้วยน้า ( •̀ ω •́ )✧)"
				type="string"
				bind:value={editMessage}
			/>
		</div>
		<div class="sc-instead-ntung-bottom">
			<input id="inputScore" placeholder="คะแนน" type="number" bind:value={editScore} />
			<div id="editScore-btn">
				<Button
					class="plusScore-btn"
					onclick={() => setEditScore("+", $selectData.data.id, editScore, editMessage)}
					color="var(--sc-plus)">บวกคะแนน</Button
				>
				<Button
					class="minusScore-btn"
					onclick={() => setEditScore("-", $selectData.data.id, editScore, editMessage)}
					color="var(--sc-minus)">ลบคะแนน</Button
				>
			</div>
		</div>
	</div>
{:else if $selectData == null}
	<div id="sc-below-search" in:azScale={{ size: 0.99, delay: 250 }} out:azScale={{ size: 0.99, duration: 100 }}>
		<div class="dragon-image">
			<img src={"dragon-logo.png"} alt="" />
		</div>
		<span id="dragontext">CE BOOSTUP (กรุณาเลือกผู้ใช้ที่ต้องการแก้ไข)</span>
	</div>
{/if}

<!-- 
-------------------------------------------------------
Popup Edit Score
-------------------------------------------------------
-->

{#if showEditScore}
	<EditScore getMethod={editMethod} getData={dataEditScore} />
	<div>{closeEditScore()}</div>
{/if}

<style>
	:global(#detail-btn) {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 5px;
	}
</style>
