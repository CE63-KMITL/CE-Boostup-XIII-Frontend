<script>
  import { pushState } from "$app/navigation";

  const items = [
    { name: "Problem" },
    { name: "Leaderboard" }
  ]; //ใส่ {name: "ชื่อที่ต้องการ"} เพื่อเพิ่มเมนู
  let selected = $state(-1);
  // function update URL
  const selectMethod = (name, index) => {
    selected = index;
    let url = new URL(window.location.href);
    url.searchParams.set("page", name);
    pushState(url, null);
  };
</script>

<div class="flex">
  <div class="menuBox">
    {#each items as item, index}
      {#if index === items.length - 1}
        <button
          class="last-flex-child"
          aria-label={item.name}
          aria-current={selected === index}
          onclick={() => selectMethod(item.name, index)}>{item.name}</button
        >
        <!-- onclick สามารถเพิ่มฟังชั่นได้นะ ปล.นี่คือเมนูตั้งแต่ ตัวแรก-ตัวเกือบสุดท้าย -->
      {:else}
        <button
          class="flex-child"
          aria-label={item.name}
          aria-current={selected === index}
          onclick={() => selectMethod(item.name, index)}>{item.name}</button
        >
        <!-- onclick สามารถเพิ่มฟังชั่นได้นะ ปล.นี่คือเมนูตัวขวาสุด(ตัวสุดท้าย) -->
      {/if}
    {/each}
  </div>
</div>

<style>
  .flex {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .menuBox {
    overflow: hidden;
    border: 1px solid black;
    border-radius: 5px;
    /* ปรับขนาดได้ถ้าไม่พอใจ (ขนาดของ menu ทั้งแถบ) */
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .flex-child {
    text-align: center;
    width: 100%;
    border-right: 1px solid black;
    height: 100%;
    flex: 1;
    /* ปรับขนาดได้ถ้าไม่พอใจ (ขนาดของ menu ตัวเเรก-ตัวเกือบสุดท้าย) */
    min-width: 120px;
  }
  .last-flex-child {
    text-align: center;
    width: 100%;
    height: 100%;
    flex: 1;
    /* ปรับขนาดได้ถ้าไม่พอใจ (ขนาดของ menu สุดท้าย) */
    min-width: 120px;
  }

  /* ลูกเล่นเวลากดเมนูแต่งเองได้ */
  button[aria-current="true"] {
    transform: none;
    filter: none;
    box-shadow: inset 3px 3px 4px rgba(0, 0, 0, 0.2);
  }
</style>
