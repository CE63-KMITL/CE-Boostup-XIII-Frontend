<script lang="ts">
    import { pushState } from "$app/navigation";
    import { goto } from '$app/navigation';
    const items = [
      { name: "Overall" },
      { name: "House" },
    { name: "My House" }
    ]; //ใส่ {name: "ชื่อที่ต้องการ"} เพื่อเพิ่มเมนู
    let selected = $state(0);
    // function update URL
    const selectMethod = (name: string, index: number) => {
  selected = index;
  goto(`?page=${name}`);
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
      width: 100%;
    }
    .menuBox {
      overflow: hidden;
      border: 1px solid black;
      border-radius: 20px;
      /* ปรับขนาดได้ถ้าไม่พอใจ (ขนาดของ menu ทั้งแถบ) */
      width: 80%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .flex-child {
      text-align: center;
      width: 100%;
      height: 30px;
      flex: 1;
      /* ปรับขนาดได้ถ้าไม่พอใจ (ขนาดของ menu ตัวเเรก-ตัวเกือบสุดท้าย) */

    }
    .last-flex-child {
      text-align: center;
      width: 100%;
      height: 30px;
      flex: 1;
      /* ปรับขนาดได้ถ้าไม่พอใจ (ขนาดของ menu สุดท้าย) */

    }
  
    /* ลูกเล่นเวลากดเมนูแต่งเองได้ */
    button[aria-current="true"] {
      background-color: #5F4B5E;
      color: white;
    }
  </style>
  