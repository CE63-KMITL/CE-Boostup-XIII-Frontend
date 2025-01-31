<script lang="ts">
    import IoIosEyeOff from 'svelte-icons/io/IoIosEyeOff.svelte';
    import IoLogoGoogle from 'svelte-icons/io/IoLogoGoogle.svelte'
    import Popup from './popup.svelte';
</script>

<Popup/>

<div class="Container">
    <div class="LoginBox">
        <h1 style="font-size: 6vh; font-weight: 700;">Login</h1>
        <div class="InputBox" style="align-self: self-start;">
            <input class = "Email" type="email" style="font-size: 2vh;">
            <div class="PasswordBox" style="gap: 5px;">
                <input class = "Password" type="password" style="font-size: 2vh;">
                <button>
                    <div style="width: 25px; height: 25px;"><IoIosEyeOff/></div>
                </button>
            </div>
            <button style="display: flex; font-size: 1.5vh">
                Forget password?
            </button>
        </div>
        <button class="Login" style="font-size: 2.5vh; font-weight: 500;">
            Login
        </button>
        <p style="font-size: 2vh;">
            or
        </p>
        <button class="Google" style=" display: flex; align-items: center; justify-content: center; font-size: 2vh; font-weight: 500;">
            <div style="width: 20px; height: 20px; margin-right: 5px"><IoLogoGoogle/></div>
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
        width: auto;
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
        margin-top: 30px;
        gap: 10px;
    }
    .PasswordBox{
        display: flex;
        align-items: center;
        justify-content: center;
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
        background-color: transparent;
        border: 1px solid gray;
        border-radius: 5px;
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