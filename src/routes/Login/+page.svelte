<script lang="ts">
    import IoIosEyeOff from 'svelte-icons/io/IoIosEyeOff.svelte';
</script>

<div class="Container">
    <div class="RegisterBox">
        <h1 style="font-size: 6vh; font-weight: 700;">Log in</h1>
        <div class="InputBox">
            <input type="email">
            <div class="PasswordBox">
                <input type="password">
                <button>
                    <div style="width: 25px; height: 25px;"><IoIosEyeOff/></div>
                </button>
            </div>
        </div>
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
    .RegisterBox{
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 60vh;
        width: auto;
        border: 2px solid gray;
        border-radius: 25px;
        backdrop-filter: blur(15px);
    }
    .InputBox{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
    }
    .PasswordBox{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
    }
</style>
