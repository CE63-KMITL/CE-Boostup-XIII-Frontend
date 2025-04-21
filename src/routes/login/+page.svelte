<script lang="ts">
	import { goto } from "$app/navigation";
	import { setCookie } from "$lib/cookie";
	import * as api from "$lib/fetchApi";
	import { onMount } from "svelte";
	import IoIosEye from "svelte-icons/io/IoIosEye.svelte";
	import IoIosEyeOff from "svelte-icons/io/IoIosEyeOff.svelte";
	import "../../app.css";
	import Button from "../../components/Button.svelte";

	let email: string = "";
	let password: string = "";
	let see_password: boolean = false;

	async function Login() {
		const res = await api.call("/auth/login", { method: "POST", data: { email, password } });
		if (res.token) {
			setCookie("token", res.token);
			goto("/menu");
		} else {
			alert(`Login failed\n\n${JSON.stringify(res.message)}`);
		}
	}
</script>

<div class="Container">
	<h1 class="Head">ยินดีต้นรับเหล่านักผจญภัย</h1>
	<div class="LoginBox">
		<h1 class="LoginHead">เข้าสู่ระบบ</h1>
		<div class="InputBox">
			<div class="EmailBox">
				<p class="Text">อีเมล</p>
				<input class="Email" type="email" placeholder="อีเมล" bind:value={email} />
			</div>
			<div class="PasswordBox">
				<p class="Text">รหัสผ่าน</p>
				<div class="WrapPasswordInput">
					<input
						class="Password"
						id="Password"
						type={see_password ? "text" : "password"}
						placeholder="รหัสผ่าน"
						bind:value={password}
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
			<p class="ForgetPassword">ลืมรหัสผ่าน</p>
		</div>
		<Button class="Login" onclick={() => Login()}>Login</Button>
	</div>
</div>

<style lang="scss">
	.Container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 3rem;
		min-height: 100%;
		width: 100%;
		padding-top: 2.5rem;
		padding-bottom: 2.5rem;
	}

	.Head {
		color: var(--tag-text);
		text-shadow: 0px 4px var(--list-shadow);
		text-align: center;
		font-size: 3.5rem;
		font-weight: 700;
	}

	.LoginBox {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: auto;
		min-width: fit-content;
		width: 25%;
		padding: 1rem;
		padding-top: 0px;
		margin-left: 0.75rem;
		margin-right: 0.75rem;
		border: 1px solid var(--theme-dark-text);
		border-radius: 15px;
		background-color: var(--bg-50);
		opacity: 50;
	}

	.LoginHead {
		font-size: 3.5rem;
		font-weight: 700;
		margin-top: 3rem;
		color: var(--theme-dark-text);
	}

	.InputBox {
		display: flex;
		align-self: self-start;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		gap: 10px;
	}

	.WrapPasswordInput {
		display: flex;
		align-items: center;
		justify-content: start;
		width: 100%;
		gap: 5px;
	}

	.Email {
		padding: 0.125rem;
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		width: 100%;
		max-width: 25rem;
		background-color: transparent;
		border: 1px solid var(--theme-dark-text);
		border-radius: 5px;
		font-size: 1.125rem;
	}

	.Email::placeholder {
		color: var(--theme-dark-text);
		font-weight: 400;
	}

	.Password {
		padding: 0.125rem;
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		width: 100%;
		max-width: 25rem;
		background-color: transparent;
		border: 1px solid var(--theme-dark-text);
		border-radius: 5px;
		font-size: 1.125rem;
	}

	.Password::placeholder {
		color: var(--theme-dark-text);
		font-weight: 400;
	}

	.IoIosEyeOff {
		width: 2rem;
	}

	.IoIosEyeOff :global(svg) {
		fill: var(--theme-dark-text);
	}

	.ForgetPassword {
		color: var(--theme-dark-text);
		cursor: pointer;
		font-size: 1.125rem;
		text-decoration: underline;
	}

	:global(.Login) {
		margin-bottom: 3rem;
	}

	.Text {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--theme-dark-text);
	}

	@media only screen and (max-width: 500px) {
		.Container {
			padding: 0px;
			padding-top: 2rem;
			justify-content: flex-start;
			gap: 1.5rem;
		}
	}
</style>
