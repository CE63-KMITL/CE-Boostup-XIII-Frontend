<div class="loading">
	<div></div>
	<div></div>
</div>

<style lang="scss">
	/*
	-------------------------------------------------------
	Loading Container Styles
	-------------------------------------------------------
	*/
	.loading {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		height: 100%;
		aspect-ratio: 1 / 1;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		pointer-events: none;
	}

	/*
	-------------------------------------------------------
	Ripple Element Styles
	-------------------------------------------------------
	*/
	.loading div {
		position: absolute;
		border: 4px solid var(--text);
		opacity: 1;
		border-radius: 50%;
		animation: loading-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
		width: 100%;
		height: 100%;
	}

	.loading div:nth-child(2) {
		animation-delay: -0.5s;
	}

	/*
	-------------------------------------------------------
	Ripple Animation Keyframes
	-------------------------------------------------------
	*/
	@keyframes loading-ripple {
		0% {
			transform: scale(0);
			opacity: 0;
		}
		4.9% {
			transform: scale(0);
			opacity: 0;
		}
		5% {
			transform: scale(0);
			opacity: 1;
		}
		100% {
			transform: scale(1);
			opacity: 0;
		}
	}
</style>
