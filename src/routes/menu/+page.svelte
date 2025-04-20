<script lang="ts">
	import { pushState } from "$app/navigation";
	import { onMount } from "svelte";
	import Fullscreen from "../../components/Fullscreen.svelte";
	import ProblemInMenu from "../problem/ProblemInMenu.svelte";

	export let data;
	const items = { problem: "โจทย์", score: "คะแนน" };

	if (data.role == "staff") {
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
		<dir id="end"></dir>
	</div>
	<div id="content">
		<ProblemInMenu {data} show={currentPage == "problem"}></ProblemInMenu>
	</div>
</Fullscreen>

<style lang="scss">
	#content {
		position: relative;
		height: calc(100% - 70px);
	}

	#start {
		display: flex;
		flex-direction: row;
		height: 100%;
		align-items: center;
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
		width: 50%;
		justify-content: center;

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

	@media (max-width: 600px) {
		#topbar {
			height: 50px;
			padding-inline: 5px;
		}

		#logo-text {
			display: none;
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
	}
</style>
