<script lang="ts">
	export let data: any;
	$userData = data;

	import { IsRole, userData } from "$lib/auth.local";
	import { Role } from "$lib/enum/role";
	import { azScale } from "$lib/transition";
	import { onMount } from "svelte";
	import { fly } from "svelte/transition";
	import Fullscreen from "$lib/components/Fullscreen.svelte";
	import Setting from "$lib/components/Icons/Setting.svelte";
	import User from "$lib/components/Icons/User.svelte";
	import MenuCode from "./code/MenuCode.svelte";
	import MenuCreateProblem from "./create_problem/MenuCreateProblem.svelte";
	import ProblemInMenu from "./problem/MenuProblem.svelte";
	import { items, currentPage, updatePage } from "./pageManager";
	import { afterNavigate } from "$app/navigation";
	import UserIcon from "$lib/components/UserIcon.svelte";
	import * as api from "$lib/fetchApi";
	import MenuScore from "./score/MenuScore.svelte";

	if (IsRole(Role.STAFF)) {
		$items["create_problem"] = "สร้างโจทย์";
	}

	let loaded = false;
	onMount(() => {
		loaded = true;
		window.addEventListener("popstate", () => {
			updatePage(new URL(window.location.href).searchParams.get("page"), false);
		});
		let url = new URL(window.location.href);
		if (!url.searchParams.get("page")) {
			url.searchParams.append("page", "problem");
			console.log(url);
			window.history.pushState(null, null, url);
		}
		$currentPage = url.searchParams.get("page");
		document.title = $items[$currentPage];
	});

	let showMobileTopbar = false;
	function toggleMobileTopbar() {
		showMobileTopbar = !showMobileTopbar;
	}
</script>

<Fullscreen>
	{#if loaded}
		<div in:fly={{ y: -30, duration: 500 }} id="topbar">
			<div id="start" onclick={() => (window.location.href = "/")}>
				<img id="logo" src="/logo.png" alt="LOGO" />
				<img id="logo-text" src="/logo-text.png" alt="CE BOOSTUP" />
			</div>

			<div id="page-selector-container" data-pc="true">
				{#each Object.keys($items) as item}
					<button
						class="page-selector"
						data-currentPage={$currentPage == item}
						onclick={() => updatePage(item)}
					>
						{$items[item]}
					</button>
				{/each}
			</div>

			<div id="moblie-page-selector-container">
				<button id="page-selector-toggle" data-selected={showMobileTopbar} onclick={toggleMobileTopbar}>
					≡
				</button>
			</div>

			{#if showMobileTopbar}
				<div in:fly={{ y: 20 }} out:fly={{ y: 20 }} id="page-selector-container" data-mobile="true">
					{#each Object.keys($items) as item}
						<button
							class="page-selector"
							data-currentPage={$currentPage == item}
							onclick={() => updatePage(item)}
						>
							{$items[item]}
						</button>
					{/each}
				</div>
			{/if}

			<dir id="end">
				<div
					data-currentPage={$currentPage == "profile"}
					class="circle-bg"
					onclick={(e) => {
						if ($userData.role == null) {
							window.location.href = "/login";
						} else {
							updatePage("profile");
						}
					}}
				>
					{#if $userData.role == null}
						ล็อคอิน
					{:else if $userData.icon}
						<img src={$userData.icon} alt="Icon" class="circular-icon" />
					{:else}
						<UserIcon data={$userData.icon}/>
					{/if}
				</div>

				<div
					data-currentPage={$currentPage == "setting"}
					class="circle-bg"
					onclick={() => {
						updatePage("setting");
					}}
				>
					<Setting></Setting>
				</div>
			</dir>
		</div>
	{/if}
	<div id="content">
		{#if $currentPage == "code"}
			<div class="full" in:azScale={{ delay: 250 }} out:azScale>
				<MenuCode></MenuCode>
			</div>
		{:else if $currentPage == "problem"}
			<div class="full" in:azScale={{ delay: 250 }} out:azScale>
				<ProblemInMenu></ProblemInMenu>
			</div>
		{:else if $currentPage == "score"}
			<div class="full" in:azScale={{ delay: 250 }} out:azScale>
				<MenuScore></MenuScore>
			</div>
		{:else if $currentPage == "create_problem"}
			<div class="full" in:azScale={{ delay: 250 }} out:azScale>
				<MenuCreateProblem></MenuCreateProblem>
			</div>
		{/if}
	</div>
</Fullscreen>

<style lang="scss">
	#moblie-page-selector-container {
		display: none;
		width: 100%;
		position: absolute;
		justify-content: center;
	}

	#page-selector-toggle {
		height: 100%;
		color: var(--top-bar-text);
		display: flex;
		padding: 10px;
		align-items: center;
		border: 1px solid transparent;
		border-radius: 999px;
		width: auto;
		aspect-ratio: 1/1;
		text-align: center;
		transition: all 0.2s;

		&[data-selected="true"] {
			color: var(--top-bar-selected);
			border-color: var(--outline);
			background: var(--bg);
		}
	}

	.circle-bg {
		display: flex;
		height: 40px;
		width: auto;
		// aspect-ratio: 1/1 !important;
		background: var(--bg);
		padding: 10px;
		border-radius: 999px;
		border: 1px solid transparent;
		transition: all 0.2s ease-out;
		cursor: pointer;
		justify-content: center;
		align-items: center;

		&:hover:not([data-currentPage="true"]) {
			background: var(--top-bar-hover);
			border: 1px solid var(--outline);
		}

		&[data-currentPage="true"] {
			background: var(--top-bar-circle-selected);
		}
	}

	#start {
		display: flex;
		flex-direction: row;
		height: 100%;
		align-items: center;
		z-index: 2;
		cursor: pointer;
		transition: all 0.2s;
          gap: var(--n-gap);

		&:hover {
			transform: scale(1.1);
		}
	}

	#content {
		position: relative;
		height: calc(100% - 70px);
		z-index: -1;
	}

	#end {
		display: flex;
		flex-direction: row;
		gap: var(--n-gap);
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
		z-index: 1;
	}

	:global([dark] #topbar) {
		backdrop-filter: blur(5px);
	}

	#page-selector-container {
		display: flex;
		flex-direction: row;
		gap: 20px;
		width: calc(100% - 10px);
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
			border: none;

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

	#page-selector-container[data-mobile] {
		display: none;
		top: 60px;
		background: var(--bg-50);
		border-radius: var(--n-border-radius);
		padding: 10px;
		backdrop-filter: blur(10px);
		outline: 1px solid var(--outline);

		.page-selector {
			color: var(--text);

			&[data-currentPage="true"] {
				color: var(--bg);
			}
		}
	}

	@media (max-width: 1300px) {
		#topbar {
			height: 60px;
		}

		#page-selector-container {
			.page-selector {
				font-size: 0.9rem;
				padding-inline: 30px;
			}
		}
	}

	@media (max-width: 1000px) or (max-height: 800px) {
		#topbar {
			height: 50px;
			padding-inline: 5px;
		}

		#logo-text {
			display: none;
		}

		:global(.usericon) {
			width: 30px;
			height: 30px;
		}

		#page-selector-container {
			.page-selector {
				font-size: 0.8rem;
				padding-inline: 30px;
			}

			gap: var(--n-gap);
		}

		#content {
			height: calc(100% - 50px);
		}

		.circle-bg {
			height: 30px;
			padding: 5px;
		}
	}

	@media (max-width: 700px) {
		#page-selector-container {
			.page-selector {
				width: 30%;
				padding-inline: 5px;
			}
		}

		#page-selector-container[data-pc] {
			display: none;
		}

		#page-selector-container[data-mobile] {
			display: flex;
		}

		#moblie-page-selector-container {
			display: flex;
		}
	}

	@media (max-width: 350px) {
		#logo-text {
			display: none;
		}

		#page-selector-container {
			.page-selector {
				font-size: 0.7rem;
				padding-inline: 0px;
				height: 30px;
			}
		}
	}
</style>
