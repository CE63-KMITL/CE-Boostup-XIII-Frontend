<script lang="ts">
	export let difficulty = 0;

	function getDifficultyStars(difficulty: number): string {
		return (
			"★".repeat(Math.floor(difficulty)) +
			"⯪".repeat(Math.ceil(difficulty) - Math.floor(difficulty)) +
			"☆".repeat(5 - Math.ceil(difficulty))
		);
	}
</script>

<div class="difficulty">{getDifficultyStars(difficulty)}</div>

<style lang="scss">
	.difficulty {
		color: #d4b977;
		font-size: 2rem;
		letter-spacing: 2px;
	}
</style>
