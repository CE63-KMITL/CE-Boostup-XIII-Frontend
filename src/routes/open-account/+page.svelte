<script lang="ts">
	import { page } from "$app/stores";
	import Button from "$lib/components/Button.svelte";
	import IoIosEye from "svelte-icons/io/IoIosEye.svelte";
	import * as api from "$lib/fetchApi";
	import IoIosEyeOff from "svelte-icons/io/IoIosEyeOff.svelte";
	import { showPopup } from "$lib/components/PopUp.svelte";
	import { setCookie } from "$lib/cookie";

	$: editName = $page.url.searchParams.get("editName");
	$: email = $page.url.searchParams.get("email");
	$: otp = $page.url.searchParams.get("otp");

	let text_password: string = "";
	let text_re_password: string = "";
	let see_password: boolean = false;
	let recheck_password: boolean = false;
	let name: string;

	async function onOpenAccount() {
		if (text_password == "" || text_re_password == "") {
			showPopup("กรุณากรอกรหัสผ่าน");
			return;
		}

		if (text_password != text_re_password) {
			showPopup("รหัสผ่านไม่ตรงกัน");
			return;
		}

		const res = await api.call("/auth/open-account", {
			method: "PATCH",
			data: {
				email: email,
				otp: otp,
				password: text_password,
				name: editName == "false" ? name : null,
			},
		});

		if (res) {
			setCookie("token", res.token);
			window.location.href = "/menu";
		}
	}
</script>

<div class="registerContainer">
	<div class="registerBox">
		<h1 class="registerHead">ข้อมูลผู้ใช้</h1>
		{#if editName != "false"}
			<div class="nameBox">
				<p class="Text">ชื่อผู้ใช้</p>
				<input type="text" class="name" placeholder="ชื่อผู้ใช้" bind:value={name} />
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
		<Button class="confirm" onclick={onOpenAccount}>ยืนยัน</Button>
	</div>
</div>

<style lang="scss">
	.registerContainer {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.registerBox {
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
	.registerHead {
		font-size: 3.5rem;
		font-weight: 700;
		margin-top: 2rem;
		color: var(--theme-dark-text);
	}
	.nameBox {
		display: flex;
		align-self: self-start;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		gap: 5px;
	}
	.name {
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
	.passwordBox {
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
