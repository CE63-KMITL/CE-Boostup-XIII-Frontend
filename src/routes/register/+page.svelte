<script lang="ts">
    import { page } from '$app/stores';
    import Button from '$lib/components/Button.svelte';
    import IoIosEye from "svelte-icons/io/IoIosEye.svelte";
	import IoIosEyeOff from "svelte-icons/io/IoIosEyeOff.svelte";

    $: query = $page.url.searchParams.get('type');
    let text_password: string = "";
    let text_re_password: string = "";
    let see_password: boolean = false;
    let recheck_password: boolean = false;
</script>

<div class="registerContainer">
    <div class="registerBox">
        <h1 class="registerHead">ข้อมูลผู้ใช้</h1>
        {#if query != "student"}
            <div class="nameBox">
                <p class="Text">ชื่อผู้ใช้</p>
                <input type="text" class="name" placeholder="ชื่อผู้ใช้" />
            </div>
        {/if}
         <div class="passwordBox">
            <p class="Text">รหัสผ่าน</p>
            <div class="wrap">
                <input 
                    type={see_password ? "text" : "password"} 
                    class="password" 
                    placeholder="รหัสผ่าน" 
                    bind:value={text_password} 
                />
                <button
                    class="IoIosEyeOff"
                    on:click={() => {
                        see_password = !see_password;
                    }}
                >
                    {#if see_password}
                        <IoIosEye />
                    {:else}
                        <IoIosEyeOff />
                    {/if}
                </button>
            </div>
        </div>
        <div class="recheckBox">
            <p class="Text">ยืนยันรหัสผ่าน</p>
            <div class="wrap">
                <input 
                    type={recheck_password ? "text" : "password"}
                    class="recheck" 
                    placeholder="ยืนยันรหัสผ่าน" 
                    bind:value={text_re_password}
                />
                <button
                    class="IoIosEyeOff"
                    on:click={() => {
                        recheck_password = !recheck_password;
                    }}
                >
                    {#if recheck_password}
                        <IoIosEye />
                    {:else}
                        <IoIosEyeOff />
                    {/if}
                </button>
            </div>
        </div>
        <Button class="confirm">ยืนยัน</Button>
    </div>
</div>

<style lang="scss">
    .registerContainer{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .registerBox{
        display: flex;
		flex-direction: column;
		align-items: center;
		height: auto;
		min-width: fit-content;
		width: 25%;
		padding: 1rem;
		padding-top: 0px;
		gap: 1rem;
		margin-left: 0.75rem;
		margin-right: 0.75rem;
		border: 1px solid var(--theme-dark);
		border-radius: 15px;
		background-color: var(--bg-50);
    }
    .registerHead{
        font-size: 3.5rem;
		font-weight: 700;
		margin-top: 2rem;
		color: var(--theme-dark-text);
    }
    .nameBox{
        display: flex;
		align-self: self-start;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		gap: 5px;
    }
    .name{
        padding: 0.125rem;
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		width: 100%;
		max-width: 25rem;
		background-color: var(--bg);
		border: 1px solid var(--theme-dark);
		border-radius: 5px;
		font-size: 1.125rem;
    }
    .name::placeholder {
		color: var(--theme-dark);
		font-weight: 400;
	}
    .passwordBox{
        display: flex;
		align-self: self-start;
		flex-direction: column;
		justify-content: center;
		width: 100%;
        max-width: 25rem;
        gap: 5px;
    }
    .password {
        padding: 0.125rem;
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		width: 100%;
		background-color: var(--bg);
		border: 1px solid var(--theme-dark);
		border-radius: 5px;
		font-size: 1.125rem;
    }
    .password::placeholder {
        color: var(--theme-dark);
		font-weight: 400;
    }
    .recheckBox {
        display: flex;
		align-self: self-start;
		flex-direction: column;
		justify-content: center;
		width: 100%;
        max-width: 25rem;
        gap: 5px;
        margin-bottom: 2rem;
    }
    .recheck {
        padding: 0.125rem;
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		width: 100%;
		background-color: var(--bg);
		border: 1px solid var(--theme-dark);
		border-radius: 5px;
		font-size: 1.125rem;
    }
    .recheck::placeholder {
        color: var(--theme-dark);
		font-weight: 400;
    }
    :global(.confirm) {
        margin-bottom: 1rem;
    }
    .wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }
    .Text {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--theme-dark);
	}
    .IoIosEyeOff {
		width: 2rem;
	}
	.IoIosEyeOff :global(svg) {
		fill: var(--theme-dark);
	}
</style>