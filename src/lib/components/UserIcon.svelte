<script lang="ts">
  import User from "./Icons/User.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  export let data;
  let base64Image = "";

  async function handleUpload(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (!file) return;

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
        dispatch("uploaded", result); // let parent know
      } else {
        console.error("Upload failed");
      }
    };

    reader.readAsDataURL(file);
  }
</script>

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

<style lang="scss">
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
