<script lang="ts">
	import UserIcon from "./UserIcon.svelte";

	export let user: any;
</script>

<div class="wholeProfile">
	<div class="wholeProfile-top">
		<div id="profileImage"><UserIcon name={user?.name} data={user?.icon}></UserIcon></div>
		<div id="nameID">
			<span class="name">{user?.name}</span>
			<span style="color: var(--sc-orangedark);">{user?.studentId}</span>
		</div>
	</div>
	<div class="wholeProfile-bottom">
		<div class="email" title={user?.email}>อีเมล : {user?.email}</div>
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
				width: 50px;
			}
			#nameID {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: left;
				margin-left: 10px;
				width: 100%;
				overflow: hidden;
				white-space: nowrap;

				.name {
					text-overflow: ellipsis;
					overflow: hidden;
				}
			}
		}
		.wholeProfile-bottom {
			display: flex;
			flex-direction: column;

			.email {
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
		}
	}
</style>
