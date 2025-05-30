<script lang="ts">
	import { azScale } from "$lib/transition";
	import { onMount, onDestroy } from "svelte";
	import { fade } from "svelte/transition";

	//-------------------------------------------------------
	// Props
	//-------------------------------------------------------
	export let src: string;
	export let alt: string = "";
	export let onClose: () => void;

	//-------------------------------------------------------
	// State
	//-------------------------------------------------------
	let currentScale = 1;
	let offsetX = 0;
	let offsetY = 0;
	let isDragging = false;
	let lastPointerX: number;
	let lastPointerY: number;
	let imgElement: HTMLImageElement;
	let popupOverlayElement: HTMLDivElement;
	let portalContainer: HTMLDivElement | null = null;

	//-------------------------------------------------------
	// Event Handlers
	//-------------------------------------------------------
	function closePopup() {
		onClose();
	}

	function handleWheelZoom(event: WheelEvent) {
		event.preventDefault();
		const zoomIntensity = 0.1;
		const direction = event.deltaY < 0 ? 1 : -1;
		const newScale = Math.max(0.5, Math.min(currentScale + direction * zoomIntensity, 5));

		currentScale = newScale;
		if (currentScale === 1) resetZoomAndPan();
	}

	function startPan(event: MouseEvent | TouchEvent) {
		event.preventDefault();

		if (currentScale === 1 && event.type === "mousedown" && (event.target as HTMLElement) !== imgElement) return;
		if (currentScale === 1 && event.type === "touchstart" && (event.target as HTMLElement) !== imgElement) return;

		isDragging = true;
		lastPointerX = "touches" in event ? event.touches[0].clientX : event.clientX;
		lastPointerY = "touches" in event ? event.touches[0].clientY : event.clientY;
		if (imgElement) imgElement.style.cursor = "grabbing";
	}

	function panImage(event: MouseEvent | TouchEvent) {
		if (!isDragging || currentScale === 1) return;
		const currentX = "touches" in event ? event.touches[0].clientX : event.clientX;
		const currentY = "touches" in event ? event.touches[0].clientY : event.clientY;
		offsetX += currentX - lastPointerX;
		offsetY += currentY - lastPointerY;
		lastPointerX = currentX;
		lastPointerY = currentY;
	}

	function endPan() {
		isDragging = false;
		if (imgElement) imgElement.style.cursor = currentScale > 1 ? "grab" : "default";
	}

	function resetZoomAndPan() {
		currentScale = 1;
		offsetX = 0;
		offsetY = 0;
	}

	function adjustScale(amount: number) {
		currentScale = Math.max(0.5, Math.min(currentScale + amount, 5));
		if (currentScale === 1) resetZoomAndPan();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Escape") {
			closePopup();
		}
	}

	onMount(() => {
		portalContainer = document.createElement("div");
		document.body.appendChild(portalContainer);

		if (popupOverlayElement && portalContainer) {
			portalContainer.appendChild(popupOverlayElement);
		}

		window.addEventListener("keydown", handleKeydown);
		if (imgElement) {
			imgElement.addEventListener("touchstart", startPan, { passive: false });
			imgElement.addEventListener("touchmove", panImage, { passive: false });
			imgElement.addEventListener("touchend", endPan);
			imgElement.addEventListener("touchcancel", endPan);
		}
	});

	onDestroy(() => {
		window.removeEventListener("keydown", handleKeydown);
		if (imgElement) {
			imgElement.removeEventListener("touchstart", startPan);
			imgElement.removeEventListener("touchmove", panImage);
			imgElement.removeEventListener("touchend", endPan);
			imgElement.removeEventListener("touchcancel", endPan);
		}
		if (portalContainer && portalContainer.parentNode === document.body) {
			document.body.removeChild(portalContainer);
		}
		portalContainer = null;
	});
</script>

<svelte:window on:mousemove={panImage} on:mouseup={endPan} on:mouseleave={endPan} />

<div bind:this={popupOverlayElement} class="image-popup-overlay" on:click={closePopup} transition:fade>
	<div transition:azScale class="popup-content" on:click|stopPropagation on:wheel={handleWheelZoom}>
		<button class="close-button" on:click={closePopup} aria-label="Close image viewer">&times;</button>
		<div class="image-container" on:mousedown={startPan}>
			<img
				bind:this={imgElement}
				{src}
				{alt}
				style="transform: translate({offsetX}px, {offsetY}px) scale({currentScale}); cursor: {currentScale >
				1
					? 'grab'
					: 'default'};"
			/>
		</div>
		<div class="zoom-controls">
			<button on:click={() => adjustScale(-0.2)} aria-label="Zoom out">-</button>
			<span>{Math.round(currentScale * 100)}%</span>
			<button on:click={() => adjustScale(0.2)} aria-label="Zoom in">+</button>
			<button on:click={resetZoomAndPan} aria-label="Reset zoom">รีเซ็ต</button>
		</div>
	</div>
</div>

<style>
	.image-popup-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.8);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1050;
	}
	.popup-content {
		background-color: var(--list-bg);
		color: var(--text);
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
		position: relative;
		max-width: 90%;
		height: 90%;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	.close-button {
		position: absolute;
		top: 10px;
		right: 15px;
		background: var(--bg);
		border-radius: 999px;
		box-shadow: 0 2px 5px var(--list-shadow);
		border: none;
		font-size: 2rem;
		cursor: pointer;
		color: var(--description);
		z-index: 10;
		line-height: 1;
		aspect-ratio: 1/1;
		height: 30px;
	}
	.close-button:hover {
		color: var(--text);
	}
	.image-container {
		flex-grow: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		width: 100%;
		height: 100%;
	}
	.image-container img {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
		transition: transform 0.1s ease-out;
		will-change: transform;
		user-select: none;
		-webkit-user-drag: none;
	}
	.zoom-controls {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
		margin-top: 15px;
		padding-top: 10px;
		border-top: 1px solid var(--hover-list-outline);
	}
	.zoom-controls button {
		padding: 6px 12px;
		background-color: var(--hover-list-bg);
		border: 1px solid var(--hover-list-outline);
		border-radius: 4px;
		cursor: pointer;
		color: var(--text);
	}
	.zoom-controls button:hover {
		background-color: var(--selected-list-bg);
	}
	.zoom-controls span {
		min-width: 50px;
		text-align: center;
		font-size: 0.9rem;
	}
</style>
