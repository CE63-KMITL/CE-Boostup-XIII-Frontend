<script lang="ts">
  import IoIosEyeOff from "svelte-icons/io/IoIosEyeOff.svelte";
  import IoLogoGoogle from "svelte-icons/io/IoLogoGoogle.svelte";
  import "./horizonmobile.scss";
  import "./verticalmobile.scss";
  import "../../app.css";
  import Button from "../../components/Button.svelte";
</script>

<div class={"Container"}>
  <div class={"LoginBox"}>
    <h1 class={"LoginHead"}>Login</h1>
    <div class={"InputBox"}>
      <input class={"Email"} type="email" />
      <div class={"PasswordBox"}>
        <input class={"Password"} type="password" />
        <Button>
          <div class={"IoIosEyeOff"}>
            <IoIosEyeOff />
          </div>
        </Button>
      </div>
      <Button class={"Text"}>Forget password?</Button>
    </div>
    <Button class={"Text"}>Login</Button>
    <p class={"Text"}>or</p>
    <Button class={"Text"}>
      <div class={"IoLogoGoogle"}>
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
    .LoginBox{
        display: flex;
        flex-direction: column;
        align-items: center;
        height: auto;
        min-width: fit-content;
        padding: 1rem;
        padding-top: 0px;
        margin-left: 0.75rem;
        margin-right: 0.75rem;
        gap: 1rem;
        border: 2px solid var(--outline);
        border-radius: 25px;
        backdrop-filter: blur(15px);
    }

  .LoginHead {
    font-size: 4rem;
    font-weight: 700;
  }

  .InputBox {
    display: flex;
    align-self: self-start;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin-top: 1rem;
    gap: 10px;
  }

  .PasswordBox {
    display: flex;
    align-items: center;
    justify-content: start;
    width: 100%;
    margin-top: 10px;
  }

  .Email {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    background-color: transparent;
    border: 1px solid var(--outline);
    border-radius: 5px;
    font-size: 1.5rem;
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
    font-size: 1.5rem;
  }

  .IoIosEyeOff {
    width: 2rem;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .Text {
    font-size: 1.875rem;
  }

  .IoLogoGoogle {
    width: 3rem;
    margin-right: 5px;
  }
</style>