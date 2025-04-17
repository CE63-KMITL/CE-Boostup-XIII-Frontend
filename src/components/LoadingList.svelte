<script lang="ts">
	import Loading from "./Loading.svelte";
</script>

<div data-list {...$$restProps}>
	<Loading></Loading>
</div>

<style lang="scss">
	div {
		height: 50px;
		position: relative;
		border-radius: var(--n-border-radius);
		overflow: hidden;
	}
</style>
