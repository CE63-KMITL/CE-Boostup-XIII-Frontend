<script lang="ts">
	import { pushState } from "$app/navigation";
	import { onMount } from "svelte";
	import Fullscreen from "../../components/Fullscreen.svelte";
	import ProblemInMenu from "../problem/ProblemInMenu.svelte";

	export let data;
	const items = { problem: "โจทย์", score: "คะแนน" };

	if (data.role == "staff") {
		items["create_problem"] = "โปรไฟล์";
	}

	let selected = "problem";
	const updatePage = (name) => {
		if (name === selected) return;
		let url = new URL(window.location.href);
		url.searchParams.set("page", name);
		selected = name;
		pushState(url, null);
	};
</script>

<Fullscreen>
	<div id="topbar">
		<div id="start">
			<img id="logo" src="/logo.png" alt="LOGO" />
			<img id="logo-text" src="/logo-text.png" alt="CE BOOSTUP" />
		</div>
		<div id="page-selector-container">
			{#each Object.keys(items) as item}
				<button class="page-selector" data-selected={selected == item} onclick={() => updatePage(item)}>
					{items[item]}
				</button>
			{/each}
		</div>
		<img alt="icon" id="usericon" />
	</div>
	<div id="content">
		<ProblemInMenu {data}></ProblemInMenu>
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

		background: linear-gradient(90deg, var(--top-bar-left), var(--top-bar-right));
		user-select: none;
		container-type: size;
	}
	
	#usericon {
		width: 50px;
		height: 50px;
		border: 1px solid #ddd;
		border-radius: 50%;
		margin-left:50px;
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

			&:hover:not([data-selected="true"]) {
				cursor: pointer;
				background: var(--top-bar-hover);
				filter: drop-shadow(0 2px 4px var(--list-shadow));
			}

			&[data-selected="true"] {
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

		#usericon {
			width: 30px;
			height: 30px;
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
