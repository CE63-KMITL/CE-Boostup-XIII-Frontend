<script lang="ts">
	export let data;

	import { pushState } from "$app/navigation";
	import { IsRole, userData } from "$lib/auth.local";
	import { Role } from "$lib/enum/role";
	import { azScale } from "$lib/transition";
	import { onMount } from "svelte";
	import Fullscreen from "../../components/Fullscreen.svelte";
	import Setting from "../../components/Icons/Setting.svelte";
	import User from "../../components/Icons/User.svelte";
	import ProblemInMenu from "../problem/Menu-Problem.svelte";

	const items = { problem: "โจทย์", score: "คะแนน" };

	if (IsRole(Role.STAFF)) {
		items["create_problem"] = "สร้างโจทย์";
	}

	let currentPage;
	const updatePage = (name) => {
		if (name == currentPage) return;
		let url = new URL(window.location.href);
		url.searchParams.set("page", name);
		currentPage = name;
		pushState(url, null);
		document.title = items[currentPage];
	};

	onMount(() => {
		let url = new URL(window.location.href);
		if (!url.searchParams.get("page")) {
			url.searchParams.append("page", "problem");
			console.log(url);
			window.history.pushState(null, null, url);
		}
		currentPage = url.searchParams.get("page");
		document.title = items[currentPage];
	});
</script>

<Fullscreen>
	<div id="topbar">
		<div id="start">
			<img id="logo" src="/logo.png" alt="LOGO" />
			<img id="logo-text" src="/logo-text.png" alt="CE BOOSTUP" />
		</div>
		<div id="page-selector-container">
			{#each Object.keys(items) as item}
				<button
					class="page-selector"
					data-currentPage={currentPage == item}
					onclick={() => updatePage(item)}
				>
					{items[item]}
				</button>
			{/each}
		</div>
		<dir id="end">
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<div
				class="circle-bg"
				role="button"
				tabindex="0"
				onclick={(e) => {
					if ($userData.role == null) {
						window.location.href = "/login";
					}
				}}
			>
				{#if $userData.role == null}
					ล็อคอิน
				{:else if data.icon}
					<img src={data.icon} alt="Icon" class="circular-icon" />
				{:else}
					<User></User>
				{/if}
			</div>
			<div class="circle-bg">
				<Setting></Setting>
			</div>
		</dir>
	</div>
	<div id="content">
		{#if currentPage == "problem"}
			<div class="full" in:azScale out:azScale>
				<ProblemInMenu {data}></ProblemInMenu>
			</div>
		{/if}
	</div>
</Fullscreen>

<style lang="scss">
	.circle-bg {
		height: 40px;
		width: auto;
		// aspect-ratio: 1/1 !important;
		background: var(--bg);
		padding: 10px;
		border-radius: 999px;
	}

	#start {
		display: flex;
		flex-direction: row;
		height: 100%;
		align-items: center;
		z-index: 2;
	}

	#content {
		position: relative;
		height: calc(100% - 70px);
	}

	#end {
		display: flex;
		flex-direction: row;
		gap: 10px;
		z-index: 2;
	}

	#logo {
		height: 100%;
	}

	#logo-text {
		height: 30%;
	}

	#topbar {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 70px;
		justify-content: space-between;
		align-items: center;
		padding-inline: 20px;
		padding-block: 10px;

		background: linear-gradient(var(--top-bar-deg), var(--top-bar-left), var(--top-bar-right));
		user-select: none;
		container-type: size;
	}

	:global([dark] #topbar) {
		backdrop-filter: blur(5px);
	}

	#page-selector-container {
		display: flex;
		flex-direction: row;
		gap: 20px;
		width: 100%;
		justify-content: center;
		position: absolute;

		.page-selector {
			color: var(--top-bar-text);
			text-align: center;
			padding-inline: 70px;
			padding-block: 5px;
			border-radius: 99px;
			font-size: 1.2rem;
			transition: all 0.2s ease-out;

			&:hover:not([data-currentPage="true"]) {
				cursor: pointer;
				background: var(--top-bar-hover);
				filter: drop-shadow(0 2px 4px var(--list-shadow));
			}

			&[data-currentPage="true"] {
				background: var(--top-bar-selected);
			}
		}
	}

	@media (max-width: 800px) {
		#topbar {
			height: 50px;
			padding-inline: 5px;
		}

		#page-selector-container {
			.page-selector {
				font-size: 0.8rem;
				padding-inline: 30px;
			}

			gap: 10px;
		}

		#content {
			height: calc(100% - 50px);
		}

		.circle-bg {
			height: 30px;
			padding: 5px;
		}
	}

	@media (max-width: 300px) {
		#logo-text {
			display: none;
		}
	}
</style>
