<script lang="ts">
	import { fade } from "svelte/transition";
	import { azScale } from "$lib/transition";
	import { Role } from "$lib/enum/role";
	import { IsRole, userData } from "$lib/auth.local";
	import { showPopup, closePopup } from "$lib/components/PopUp.svelte";
	import StaffClaim from "./StaffClaim.svelte";
	import Button from "$lib/components/Button.svelte";
	import { popup } from "../score";

	export let currentSelectData;

	//Pop-up Staff Cliam
	let showStaffClaim = false;
	function openStaffClaim() {
		showStaffClaim = true;

		$popup = thisPopup;
	}
	function closeStaffClaim() {
		showStaffClaim = false;

		$popup = null;
	}
	//

	function protectClick(event) {
		event.stopPropagation();
	}
</script>

<!-- 
-------------------------------------------------------
Staff Claim
-------------------------------------------------------
-->

{#snippet thisPopup()}
	<StaffClaim onClose={closeStaffClaim} selectedUser={currentSelectData} />
{/snippet}

<Button class="claim-btn" onclick={openStaffClaim}>เช็ครางวัล</Button>
