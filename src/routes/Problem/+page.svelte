<script lang="ts">
	import Frame from "../../components/Frame.svelte";
	import List from "./List.svelte";
</script>

<!-- <div style="">ว้าวหน้าหลักสุดยอดไปเลย</div> -->

<Frame>
	<List
		Problem_OBJ={{
			Data: {
				ID: "000",

				Title: "Testawdwadwadawdawdwadwad",
				Author: "Some user",
				Description:
					"YOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO",

				Default_Code: "",
				Difficulty: "⭐⭐⭐⭐⭐",
				Tags: ["Physics", "Science", "Math", "Math", "Math", "Math", "Math", "Math", "Math"],
			},
			Status: "Not started",
		}}
	></List>
</Frame>

<style lang="scss">
</style>
