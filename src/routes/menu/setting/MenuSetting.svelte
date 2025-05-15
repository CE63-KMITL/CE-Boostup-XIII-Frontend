<script lang="ts">
  import { theme } from "./shared.svelte";

  function changeTheme() {
    const url = new URL(window.location.href);
    theme.isDark = !theme.isDark;
    url.searchParams.set("dark", theme.isDark.toString());
    window.history.pushState({}, "", url.toString());

    localStorage.setItem("dark", url.searchParams.get("dark"));
    if (localStorage.getItem("dark") === "true") {
      document.documentElement.setAttribute("dark", "");
    } else {
      document.documentElement.removeAttribute("dark");
    }
  }
</script>

<div class="container">
  {#if !theme.isDark}
    <button onclick={changeTheme}>Enable Dark Mode</button>
  {:else}
    <button onclick={changeTheme}>Disable Dark Mode</button>
  {/if}
</div>

<style lang="scss">
  .container {
    width: 100%;
    height: 100%;
  }
</style>
