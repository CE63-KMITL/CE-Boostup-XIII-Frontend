<script lang="ts">
  import User from "./Icons/User.svelte";
  import Cropper from "svelte-easy-crop";
  import Button from "./Button.svelte";

  let showCrop = false;
  let initalCropPosition = { x: 0, y: 0 };

  export let data;
  let base64Image = "";
  const maxFileSize = 100 * 1024; // Limit file size to 100kb

  async function handleUpload(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (!file) return;
    if (file.size > maxFileSize) {
      alert(`Image size must not exceed ${maxFileSize / 1024} kb`);
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      data = reader.result as string;
      showCrop = true;
    };

    reader.readAsDataURL(file);
  }

  async function createImage(url) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
      image.src = url;
    });
  }

  async function getCroppedImage(imageSrc, pixelCrop) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return null;
    }
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      canvas,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return canvas.toDataURL("image/jpeg");
  }

  async function handleImageCrop(e) {
    try {
      // Convert image to Base64
      const reader = new FileReader();
      reader.onload = async () => {
        base64Image = (reader.result as string).split(",")[1]; // remove data:image/...;base64,
        data = reader.result as string;

        // Send to backend
        const response = await fetch("/api/profile/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64Image }),
        });

        if (response.ok) {
          const result = await response.json();
        } else {
          console.error("Upload failed");
        }
      };
    } catch (e) {}
  }
</script>

{#if showCrop}
  <div>
    <div class="crop-container">
      <Cropper
        image={data}
        crop={initalCropPosition}
        cropShape={"round"}
        aspect={1}
      />
    </div>
    <Button onclick={handleImageCrop}>Crop Image</Button>
  </div>
{:else}
  <div class="profile-upload-wrapper">
    {#if data}
      <img class="profile-image" src={data} alt="Profile" />
    {:else}
      <User></User>
    {/if}

    <label class="overlay">
      <input type="file" accept="image/*" onchange={handleUpload} />
      <span class="upload-text">Upload</span>
    </label>
  </div>
{/if}

<style lang="scss">
  .crop-container {
    position: relative;
    width: 300px;
    max-width: 300px; // prevent it from stretching too wide
    aspect-ratio: 1 / 1; // maintain square shape
    touch-action: none;
  }
  .profile-upload-wrapper {
    position: relative;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;

    .profile-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
      display: block;
      border: 1px solid #ddd;
    }

    .overlay {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
      cursor: pointer;

      input {
        display: none;
      }

      .upload-text {
        font-weight: bold;
        font-size: 1rem;
      }
    }

    &:hover .overlay {
      opacity: 1;
    }
  }
</style>
