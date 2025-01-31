<script lang="ts">
    import {onMount , onDestroy} from "svelte";
    import MdScreenRotation from 'svelte-icons/md/MdScreenRotation.svelte'

    let popUp = false

    function checkWidthAndHeight() {
        let mobile = false
        let horizon = false

        if(window.innerWidth <= 1000){
            mobile = true
        }
        if(window.innerWidth > window.innerHeight){
            horizon = true
        }

        popUp = mobile && horizon
    }

    onMount(() => {
        checkWidthAndHeight();
        window.addEventListener('resize' , checkWidthAndHeight);
        window.addEventListener('orientationchange' , checkWidthAndHeight);
    })

    onDestroy(() => {
        window.removeEventListener('resize' , checkWidthAndHeight);
        window.removeEventListener('orientationchange' , checkWidthAndHeight);
    })
</script>

{#if popUp}
    <div class="PopupContainer">
        <p style="color: white; font-size: 16px">
            Please rotate your phone
        </p>
        <div class= "RotateIcon" style="width: 25px; height: 25px; color: white; margin-left: 10px;">
            <MdScreenRotation/>
        </div>
    </div>
{/if}

<style>
    @keyframes rotateAnimation {
        0% { transform: rotate(0deg); }
        50% { transform: rotate(90deg); }
        100% { transform: rotate(0deg); }
    }

    .PopupContainer{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background-color: black;
    }

    .RotateIcon {
        animation: rotateAnimation 1.5s infinite ease-in-out;
    }
</style>