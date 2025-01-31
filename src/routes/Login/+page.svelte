<script lang="ts">
    import IoIosEyeOff from 'svelte-icons/io/IoIosEyeOff.svelte';
    import IoLogoGoogle from 'svelte-icons/io/IoLogoGoogle.svelte'
    import Popup from './popup.svelte';
</script>

<Popup/>

<div class="Container">
    <div class="LoginBox">
        <h1 style="font-size: 6.5vh; font-weight: 700;">Login</h1>
        <div class="InputBox" style="align-self: self-start;">
            <input class = "Email" type="email" style="font-size: 2vh;">
            <div class="PasswordBox">
                <input class = "Password" type="password" style="font-size: 2vh;">
                <button>
                    <div style="width: 3.15vh; border: 1px solid gray;  border-top-right-radius: 5px; border-bottom-right-radius: 5px;">
                        <IoIosEyeOff/>
                    </div>
                </button>
            </div>
            <button style="display: flex; font-size: 2vh">
                Forget password?
            </button>
        </div>
        <button class="Login" style="font-size: 3vh; font-weight: 500;">
            Login
        </button>
        <p style="font-size: 2vh;">
            or
        </p>
        <button class="Google" style=" display: flex; align-items: center; justify-content: center; font-size: 2.5vh; font-weight: 500;">
            <div style="width: 3.15vh; margin-right: 5px">
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
        background-image: url(./LoginImage/4428788.jpg);
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
        border: 2px solid gray;
        border-radius: 25px;
        backdrop-filter: blur(15px);
    }
    .InputBox{
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        margin-top: 30px;
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
        border: 1px solid gray;
        border-radius: 5px;
    }

    .Password {
        padding-left: 10px;
        padding-right: 10px;
        width: 100%;
        background-color: transparent;
        border: 1px solid gray;
        border-right: 0px;
        border-radius: 5px;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
    }

    .Login {
        background-color: wheat;
        width: 100%;
        border: 1px solid gray;
        border-radius: 25px;
    }

    .Google {
        width: 100%;
        border: 1px solid gray;
        border-radius: 15px;
    }
</style>