<script>
    export let data;
</script>

<img src={data} alt="icon" class="usericon" />

<style lang="scss">
	:global(.usericon) {
		width: 50px;
		height: 50px;
		border: 1px solid #ddd;
		border-radius: 50%;
		margin-left:50px;
	}
</style>
