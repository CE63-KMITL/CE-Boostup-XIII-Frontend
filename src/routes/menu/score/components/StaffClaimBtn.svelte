<script lang="ts">
    import { fade } from "svelte/transition";
    import { azScale } from "$lib/transition";
    import { Role } from "$lib/enum/role";
    import { IsRole, userData } from "$lib/auth.local";
    import { showPopup, closePopup } from "$lib/components/PopUp.svelte";
    import StaffClaim from "./StaffClaim.svelte";
    import Button from "$lib/components/Button.svelte";

    export let currentSelectData;

    //Pop-up Staff Cliam
    let showStaffClaim = false;
    function openStaffClaim() { showStaffClaim = true;}
    function closeStaffClaim() { showStaffClaim = false; }
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

<Button class="claim-btn" onclick={openStaffClaim}>เช็ครางวัล</Button>

{#if showStaffClaim && IsRole(Role.STAFF)}
	<div class="backdrop" onclick={closePopup} in:fade out:fade>
		<div id="popup" onclick={protectClick} in:azScale out:azScale>
			<StaffClaim onClose={closeStaffClaim} selectedUser={currentSelectData} />
		</div>
	</div>
{/if}

<style lang="scss">
    .claim-btn {
        
    }
</style>