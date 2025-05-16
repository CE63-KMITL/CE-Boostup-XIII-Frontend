<script lang="ts">
	import { userData } from "$lib/auth.local";
	import { popup, selectData } from "../score";
	import { azScale } from "$lib/transition";
	import { fade } from "svelte/transition";
	import Button from "$lib/components/Button.svelte";
	import History from "./History.svelte";

	export let giveMeYourUserData;

	let currentSelectData = null;

	let showHistoryPopup = false;
	let historyWay;

	function showUserHistory(userHistory: any) {
		if (userHistory == $userData) {
			historyWay = userHistory;
			currentSelectData = userHistory;
		} else if (userHistory == $selectData) {
			historyWay = userHistory.data;
		}
		showHistoryPopup = true;

		$popup = thisPopup;
	}

	function closeUserHistory(userHistory: any) {
		if (userHistory.id === $userData.id) {
			currentSelectData = null;
		}
		showHistoryPopup = false;

		$popup = null;
	}

	function protectClick(event) {
		event.stopPropagation();
	}
</script>

<Button class="scl-btn" onclick={() => showUserHistory(giveMeYourUserData)} filter={false}>ประวัติคะแนน</Button>

<!-- 
-------------------------------------------------------
Popup Score History
-------------------------------------------------------
-->

{#snippet thisPopup()}
	<div id="popup-top">ประวัติคะแนน</div>
	<div id="popup-middle"><History userDataHistory={historyWay}></History></div>
	<div id="popup-bottom">
		<button class="sc-history-btn" onclick={() => closeUserHistory(historyWay)}>ปิด</button>
	</div>
{/snippet}
