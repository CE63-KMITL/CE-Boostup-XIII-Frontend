<script lang="ts">
  import { theme } from "./shared.svelte";
  function addDarkParam() {
    const url = new URL(window.location.href);
    theme.isDark = !theme.isDark;
    window.history.pushState({}, "", `${url.toString()}&dark=${theme.isDark}`); // update URL without reloading
  }
</script>

<div class="container">
  <button on:click={addDarkParam}>Enable Dark Mode</button>
</div>

<style lang="scss">
  .container {
    width: 100%;
    height: 100%;
  }
</style>
