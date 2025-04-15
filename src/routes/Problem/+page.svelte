<script lang="ts">
	import Frame from "../../components/Frame.svelte";
	import Fullscreen from "../../components/Fullscreen.svelte";
	import List from "./List.svelte";

	const testData = {
		ID: "000",

		Title: "Testawdwadwadawdawdwadwad",
		Author: "Some user",
		Description: "YOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO",

		Default_Code: "",
		Difficulty: "⭐⭐⭐⭐⭐",
		Tags: ["Physics", "Science", "Math", "Math", "Math", "Math", "Math", "Math", "Math"],
	};
</script>

<!-- <div style="">ว้าวหน้าหลักสุดยอดไปเลย</div> -->

<Fullscreen>
	<div id="container">
		<div id="left">
			{#each Array(10) as _, i}
				<List
					Problem_OBJ={{
						Data: testData,
						Status: "Not started",
					}}
				/>
			{/each}
		</div>
		<div id="right"></div>
	</div>
</Fullscreen>

<style lang="scss">
	#container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		gap: 10px;
	}

	#left {
		width: 60%;
		height: 100%;
	}

	#right {
		width: 40%;
		height: 100%;
	}
</style>
