<script>
	import Button from "../components/Button.svelte";
</script>

<div class="full">
	<div class="main">
		ไม่มีหน้านี้นะ พิมพ์ผิดรึเปล่า 🤨
		<Button class="backButton" onclick={() => (window.location.href = "/")}>สนใจกลับไปหน้าหลักหน่อยไหม 🤓</Button>
	</div>
</div>

<style lang="scss">
	.full {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		:global(.backButton) {
			font-size: 3vw;
		}
	}
	.main {
		width: 90%;
		max-width: 1500px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		background: var(--bg-50);
		backdrop-filter: blur(5px);
		padding: 10%;
		border-radius: var(--n-border-radius);

		font-size: 4vw;
	}

	@media (max-width: 500px) {
		.main {
			font-size: 10vw;
		}

		.full {
			:global(.backButton) {
				font-size: 5vw;
			}
		}
	}
</style>
