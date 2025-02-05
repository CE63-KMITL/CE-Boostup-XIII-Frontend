<script lang="ts">
    import IoIosEyeOff from 'svelte-icons/io/IoIosEyeOff.svelte';
    import IoLogoGoogle from 'svelte-icons/io/IoLogoGoogle.svelte';
    import './horizonmobile.scss'
    import './verticalmobile.scss'
    import '../../app.css'
    import {onMount , onDestroy} from "svelte";

    let isHorizonMobile = false
    let isVerticalMobile = false

    let Dynamic1, Dynamic2, Dynamic3, Dynamic4, Dynamic5, Dynamic6, Dynamic7,Dynamic8 ;
    let Dynamic9, Dynamic10, Dynamic11,Dynamic12, Dynamic13 ; 

    function checkWidthAndHeight() {
        if (typeof window === "undefined") return;

        let mobile = false
        let horizon = false
        let vertical = false

        if(window.innerWidth <= 1000){
            mobile = true
        }
        if(window.innerWidth > window.innerHeight){
            horizon = true
        }
        if(window.innerHeight > window.innerWidth && window.innerHeight <= 1000){
            vertical = true
        }

        isHorizonMobile = mobile && horizon
        isVerticalMobile = mobile && vertical
    }

    onMount(() => {
        if (typeof window === "undefined") return;
        checkWidthAndHeight();
        window.addEventListener('resize' , checkWidthAndHeight);
        window.addEventListener('orientationchange' , checkWidthAndHeight);
    })

    onDestroy(() => {
        if (typeof window === "undefined") return;
        window.removeEventListener('resize' , checkWidthAndHeight);
        window.removeEventListener('orientationchange' , checkWidthAndHeight);
    })

    $: Dynamic1 = isHorizonMobile ? "HorizonContainer" : isVerticalMobile ? "VerticalContainer" : "Container";
    $: Dynamic2 = isHorizonMobile ? "HorizonLoginBox" : isVerticalMobile ? "VerticalLoginBox" : "LoginBox";
    $: Dynamic3 = isHorizonMobile ? "HorizonLoginHead" : isVerticalMobile ? "VerticalLoginHead" : "LoginHead";
    $: Dynamic4 = isHorizonMobile ? "HorizonInputBox" : isVerticalMobile ? "VerticalInputBox" : "InputBox";
    $: Dynamic5 = isHorizonMobile ? "HorizonEmail" : isVerticalMobile ? "VerticalEmail" : "Email";
    $: Dynamic6 = isHorizonMobile ? "HorizonPasswordBox" : isVerticalMobile ? "VerticalPasswordBox" : "PasswordBox";
    $: Dynamic7 = isHorizonMobile ? "HorizonPassword" : isVerticalMobile ? "VerticalPassword" : "Password";
    $: Dynamic8 = isHorizonMobile ? "HorizonIoIosEyeOff" : isVerticalMobile ? "VerticalIoIosEyeOff" : "IoIosEyeOff";
    $: Dynamic9 = isHorizonMobile ? "HorizonForgetPassword" : isVerticalMobile ? "VerticalForgetPassword" : "ForgetPassword";
    $: Dynamic10 = isHorizonMobile ? "HorizonLogin" : isVerticalMobile ? "VerticalLogin" : "Login";
    $: Dynamic11 = isHorizonMobile ? "HorizonText" : isVerticalMobile ? "VerticalText" : "Text";
    $: Dynamic12 = isHorizonMobile ? "HorizonGoogle" : isVerticalMobile ? "VerticalGoogle" : "Google";
    $: Dynamic13 = isHorizonMobile ? "HorizonIoLogoGoogle" : isVerticalMobile ? "VerticalIoLogoGoogle" : "IoLogoGoogle";

</script>

<div class={Dynamic1}>
    <div class={Dynamic2}>
        <h1 class={Dynamic3}>
            Login
        </h1>
        <div class={Dynamic4}>
            <input class ={Dynamic5} type="email">
            <div class={Dynamic6}>
                <input class = {Dynamic7} type="password">
                <button>
                    <div class={Dynamic8}>
                        <IoIosEyeOff/>
                    </div>
                </button>
            </div>
            <button class={Dynamic9}>
                Forget password?
            </button>
        </div>
        <button class={Dynamic10}>
            Login
        </button>
        <p class={Dynamic11}>
            or
        </p>
        <button class={Dynamic12}>
            <div  class={Dynamic13}>
                <IoLogoGoogle/>
            </div>
            Login with Google
        </button>
    </div>
</div>

<style lang="scss">
    .Container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        background-color: var(--bg);
        background-position: center;
        background-attachment: fixed;
    }
    .LoginBox{
        display: flex;
        flex-direction: column;
        align-items: center;
        height: auto    ;
        width: 20vw;
        min-width: fit-content;
        padding: 20px;
        padding-top: 0px;
        gap: 15px;
        border: 2px solid var(--outline);
        border-radius: 25px;
        backdrop-filter: blur(15px);
    }

    .LoginHead{
        font-size: 7.5vh; 
        font-weight: 700;
    }

    .InputBox{
        display: flex;
        align-self: self-start;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        margin-top: 20px;
        gap: 10px;
    }

    .PasswordBox{
        display: flex;
        align-items: center;
        justify-content: start;
        width: 100%;
        margin-top: 10px;
    }

    .Email {
        padding-left: 10px;
        padding-right: 10px;
        background-color: transparent;
        border: 1px solid var(--outline);
        border-radius: 5px;
        font-size: 3vh;
    }

    .Password {
        padding-left: 10px;
        padding-right: 10px;
        width: 100%;
        background-color: transparent;
        border: 1px solid var(--outline);
        border-right: 0px;
        border-radius: 5px;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        font-size: 3vh;
    }

    .IoIosEyeOff{
        width: 4.65vh; 
        border: 1px solid var(--outline);  
        border-top-right-radius: 5px; 
        border-bottom-right-radius: 5px;
    }

    .ForgetPassword {
        display: flex;
        font-size: 2vh
    }

    .Login {
        background-color: var(--darker-50);
        width: 100%;
        border: 1px solid var(--outline);
        border-radius: 15px;
        font-size: 4vh; 
        font-weight: 500;
    }

    .Text {
        font-size: 3vh;
    }

    .Google {
        width: 100%;
        border: 1px solid var(--outline);
        border-radius: 15px;
        background-color: var(--darker-50);
        display: flex; 
        align-items: center; 
        justify-content: center; 
        font-size: 3.5vh; 
        font-weight: 500;
    }

    .IoLogoGoogle{
        width: 4.15vh; 
        margin-right: 5px
    }
</style>