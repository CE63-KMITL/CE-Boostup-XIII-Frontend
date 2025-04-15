<script>
	let { number, name, score, highlight } = $props();
</script>

<div class="box {highlight ? 'highlight' : ''}">
	<div style="flex-grow:1">{number}</div>
	<div style="flex-grow:5">{name}</div>
	<div style="flex-grow:7 ;"></div>
	<div style="flex-grow:1">{score}</div>
</div>

<style>
	.box {
		border: 1px solid #767676;
		border-radius: 20px;
		width: 98%;
		display: flex;
		justify-content: space-between;
		margin: 7px;
	}
	.box > div {
		font-family: Inter;
		color: #767676;
		justify-content: center;
		display: flex;
	}
	.box.highlight {
		background-color: #eaeaea;
	}
</style>
