<script lang="ts">
	import { goto } from "$app/navigation";
	import { setCookie } from "$lib/cookie";
	import * as api from "$lib/fetchApi";
	import IoIosEye from "svelte-icons/io/IoIosEye.svelte";
	import IoIosEyeOff from "svelte-icons/io/IoIosEyeOff.svelte";
	import "../../app.css";
	import Button from "../../lib/components/Button.svelte";
	import { showPopup, type ShowPopupInputs } from "../../lib/components/PopUp.svelte";
	import { onMount } from "svelte";
	import { fade, fly } from "svelte/transition";
	import { azScale } from "$lib/transition";
	import { flip } from "svelte/animate";

	let email: string = "";
	let password: string = "";
	let see_password: boolean = false;

	async function Login() {
		//-------------------------------------------------------
		// Form Validation
		//-------------------------------------------------------
		if (!email || !password) {
			await showPopup("โปรดกรอกอีเมลและรหัสผ่าน");
			return;
		}

		//-------------------------------------------------------
		// Email Format Validation
		//-------------------------------------------------------
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			await showPopup("รูปแบบอีเมลไม่ถูกต้อง");
			return;
		}

		//-------------------------------------------------------
		// API Call
		//-------------------------------------------------------
		const res = await api.call("/auth/login", { method: "POST", data: { email, password } });
		if (res.token) {
			setCookie("token", res.token);
			goto("/menu");
		} else {
			await showPopup(res.message);
		}
	}

	async function onCreateAccount() {
		const inputsForCreate: ShowPopupInputs = [
			{
				type: "text",
				name: "email",
				label: "อีเมล",
				placeholder: "อีเมลของคุณ",
				required: true,
			},
		];

		showPopup(
			"สร้างบัญชีผู้ใช้",
			{
				ยืนยัน: {
					primary: true,
					callback: async (formData) => {
						if (formData && formData.email) {
							await api.call(`/auth/register-open-account`, {
								method: "POST",
								data: { email: formData.email },
							});
							await showPopup("เราได้ทำการส่งอีเมลให้คุณแล้ว!\nกรุณาตรวจสอบอีเมลของคุณ (❁´◡`❁)", {
								ตกลง: () => {},
							});
						}
					},
				},
				ยกเลิก: { cancel: true, callback: () => {} },
			},
			"large",
			inputsForCreate
		);
	}

	//-------------------------------------------------------
	// Request Password Reset
	//-------------------------------------------------------
	//-------------------------------------------------------
	// Request Password Reset
	//-------------------------------------------------------
	async function onRequestResetPassword() {
		const inputsForReset: ShowPopupInputs = [
			{
				type: "text",
				name: "email",
				label: "อีเมล",
				placeholder: "อีเมลของคุณ",
				required: true,
			},
		];

		showPopup(
			"รีเซ็ตรหัสผ่าน",
			{
				ยืนยัน: {
					primary: true,
					callback: async (formData) => {
						if (formData && formData.email) {
							try {
								const res = await api.call("/auth/request-reset-password", {
									method: "POST",
									data: { email: formData.email },
								});
								if (res) {
									await showPopup(res, {
										ตกลง: () => {},
									});
								} else {
									await showPopup("เราได้ทำการส่งการรีเซ็ตรหัสผ่านไปยังอีเมลของคุณแล้ว!", {
										ตกลง: () => {},
									});
								}
							} catch (error: any) {
								console.error("Error requesting password reset:", error);
								await showPopup(error.message || "เกิดข้อผิดพลาดในการร้องขอรีเซ็ตรหัสผ่าน");
							}
						} else {
							await showPopup("โปรดกรอกอีเมลเพื่อรีเซ็ตรหัสผ่าน");
						}
					},
				},
				ยกเลิก: { cancel: true, callback: () => {} },
			},
			"large",
			inputsForReset
		);
	}

	let loaded = false;
	onMount(() => {
		loaded = true;
	});
</script>

<div class="Container">
	{#if loaded}
		<h1 in:fly={{ y: 100, duration: 500 }} class="Head">ยินดีต้นรับเหล่านักผจญภัย</h1>
		<div in:azScale={{ delay: 100, duration: 700 }} class="LoginBox">
			<h1 in:fly={{ y: 100, delay: 100, duration: 700 }} class="LoginHead">เข้าสู่ระบบ</h1>
			<div class="InputBox">
				<div in:fly={{ y: 100, delay: 140, duration: 700 }} class="EmailBox">
					<p class="Text">อีเมล</p>
					<input
						class="Email"
						type="email"
						placeholder="อีเมล"
						bind:value={email}
						on:keydown={(event) => {
							if (event.key === "Enter") {
								event.preventDefault();
								document.getElementById("Password")?.focus();
							}
						}}
					/>
				</div>
				<div in:fly={{ y: 100, delay: 300, duration: 700 }} class="PasswordBox">
					<p class="Text">รหัสผ่าน</p>
					<div class="WrapPasswordInput">
						<input
							class="Password"
							id="Password"
							type={see_password ? "text" : "password"}
							placeholder="รหัสผ่าน"
							bind:value={password}
							on:keydown={(event) => {
								if (event.key === "Enter") {
									event.preventDefault();
									Login();
								}
							}}
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
				<div in:fly={{ y: 100, delay: 350, duration: 700 }} class="ForgetAndCreate">
					<p class="ForgetPassword" on:click={onRequestResetPassword}>ลืมรหัสผ่าน</p>
					<p class="ForgetPassword" on:click={onCreateAccount}>สร้างบัญชี</p>
				</div>
			</div>
			<div in:fly={{ y: 100, delay: 400, duration: 700 }} class="full">
				<Button class="Login" on:click={() => Login()}>Login</Button>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.ForgetAndCreate {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
	}
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
		backdrop-filter: blur(5px);
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

	.LoginHead {
		font-size: 3.5rem;
		font-weight: 700;
		margin-top: 2rem;
		color: var(--theme-dark-text);
	}

	.InputBox {
		display: flex;
		align-self: self-start;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		gap: var(--n-gap);
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
		background-color: var(--bg);
		border: 1px solid var(--theme-dark);
		border-radius: 5px;
		font-size: 1.125rem;
	}

	.Email::placeholder {
		color: var(--theme-dark);
		font-weight: 400;
	}

	.Password {
		padding: 0.125rem;
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		width: 100%;
		background-color: var(--bg);
		border: 1px solid var(--theme-dark);
		border-radius: 5px;
		font-size: 1.125rem;
	}

	.Password::placeholder {
		color: var(--theme-dark);
		font-weight: 400;
	}

	.IoIosEyeOff {
		width: 2rem;
	}

	.IoIosEyeOff :global(svg) {
		fill: var(--theme-dark);
	}

	.ForgetPassword {
		color: var(--theme-dark);
		cursor: pointer;
		font-size: 1.125rem;
		text-decoration: underline;
	}

	:global(.Login) {
		margin-bottom: 2rem;
	}

	.Text {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--theme-dark);
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
