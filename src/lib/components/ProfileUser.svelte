<script lang="ts">
	import UserIcon from "./UserIcon.svelte";

	export let user: any;
</script>

<div class="wholeProfile">
	<div class="wholeProfile-top">
		<div id="profileImage"><UserIcon data={user?.icon}></UserIcon></div>
		<div id="nameID">
			<span>{user?.name}</span>
			<span style="color: var(--sc-orangedark);">{user?.studentId}</span>
		</div>
	</div>
	<div class="wholeProfile-bottom">
		<span>อีเมล : {user?.email}</span>
		<span>บ้าน : {user?.house}</span>
	</div>
</div>

<style lang="scss">
	.wholeProfile {
		display: flex;
		flex-direction: column;

		.wholeProfile-top {
			display: flex;
			flex-direction: row;
			margin-bottom: 5px;

			#profileImage {
				width: 25%;
			}
			#nameID {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: left;
				margin-left: 10px;
			}
		}
		.wholeProfile-bottom {
			display: flex;
			flex-direction: column;
		}
	}
</style>
