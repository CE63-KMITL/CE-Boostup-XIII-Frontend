<script lang="ts">
    import IoIosEyeOff from 'svelte-icons/io/IoIosEyeOff.svelte';
    import IoLogoGoogle from 'svelte-icons/io/IoLogoGoogle.svelte';
    import './horizonmobile.scss'
    import './verticalmobile.scss'
    import '../../app.css'
    import {onMount , onDestroy} from "svelte";
    import Button from '../../components/Button.svelte';

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
    $: dynamicFontSize1 = isHorizonMobile ? "3vh" : isVerticalMobile ? "3vw" : "2vh"; 
    $: dynamicFontSize2 = isHorizonMobile ? "5.5vh" : isVerticalMobile ? "5.5vw" : "4vh"; 
    $: dynamicFontSize3 = isHorizonMobile ? "5vh" : isVerticalMobile ? "5vw" : "3.5vh"; 

    const seePassword = {
        padding: "0px",
        "border-radius": "5px",
        "border-top-left-radius": "0px",
        "border-bottom-left-radius": "0px",
    }

    $: forgetPassword = {
        display: "flex",
        padding: "0px",
        border: "none",
		background: "none",
		"border-radius": "0px",
        "font-size": dynamicFontSize1
    }

    $: logIn = {
        width: "100%",
        "border-radius": "15px",
        "font-size": dynamicFontSize2, 
        "font-weight": "500",
        "padding": "0px"
    }

    $: logInWithGoogle ={
        width: "100%",
        "border-radius": "15px",
        display: "flex",
        "padding": "0px",
        "align-items": "center",
        "justify-content": "center",
        "font-size": dynamicFontSize3,
        "font-weight": "500"
    }
</script>

<div class={"Container"}>
  <div class={"LoginBox"}>
    <h1 class={"LoginHead"}>Login</h1>
    <div class={Dynamic4}>
      <input class={Dynamic5} type="email" />
      <div class={Dynamic6}>
        <input class={Dynamic7} type="password" />
        <Button style={seePassword}>
          <div class={Dynamic8}>
            <IoIosEyeOff />
          </div>
        </Button>
      </div>
      <Button class={Dynamic9} style={forgetPassword}>Forget password?</Button>
    </div>
    <Button class={Dynamic10} style={logIn}>Login</Button>
    <p class={Dynamic11}>or</p>
    <Button class={Dynamic12} style={logInWithGoogle}>
      <div class={Dynamic13}>
        <IoLogoGoogle />
      </div>
      Login with Google
    </Button>
  </div>
</div>

<style lang="scss">
  .Container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    background-position: center;
    background-attachment: fixed;
  }
  .LoginBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;
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
        width: 4.5vh;   
        border-top-right-radius: 5px; 
        border-bottom-right-radius: 5px;
    }

    .Text {
        font-size: 3vh;
    }

    .IoLogoGoogle{
        width: 4.15vh; 
        margin-right: 5px
    }
</style>