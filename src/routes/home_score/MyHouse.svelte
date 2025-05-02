<script lang="ts">

    export type DataMyhouse = {
      name: string;
      id: string;
      score: number;
    };
    // let { number , name , score , highlight } = $props();
    import List from "../../components/List.svelte";
    // import type { Scoredeaw } from "./scoredeaw";
    // export let homescore: Scoredeaw;
    import image1 from "./Badge_Disable.svg";
    import image2 from "./Badge_Disable(1).svg";
    import image3 from "./Badge_Disable(2).svg";
    let { index, data }: { index: number; data:DataMyhouse } = $props();
  
  
  </script>
  
  <List class="homescorelist {index < 3 ? 'top' : ''}" >
    <div class="index">
      {#if index == 0}
          <img class="image" src={image1} alt="Gold" />
        {:else if index === 1}
          <img class="image" src={image2} alt="Silver" />
        {:else if index === 2}
          <img class="image" src={image3} alt="Bronze" />
        {:else}
          {String(+index + 1).padStart(2, '0')}
        {/if}
    </div>
    <div class="name">{data.name}</div>
    <div class="id">{data.id}</div>
    <div class="house"></div>
    <div class="score">{data.score}</div>
  </List>
  
  <!-- <div class="box {highlight ? 'highlight' : ''}">
      <div style="flex-grow:1">{number}</div>
      <div style="flex-grow:5">{name}</div>
      <div style="flex-grow:7 ;"></div>
      <div style="flex-grow:1">{score}</div>
  </div> -->
  
  <!-- <style>
      .box{
          border: 1px solid #767676;
          border-radius: 20px;
          width: 98%;
          display: flex;
          justify-content: space-between;
          margin: 7px;
      }
      .box > div{
          font-family: Inter;
          color: #767676;
          justify-content: center;
          display: flex;
      }
      .box.highlight{
          background-color: #EAEAEA;
      }
  </style> -->
  
  <style>
    :global(.homescorelist) {
      display: flex;
      container-type: inline-size;
      justify-content: space-between;
      margin-top: 20px;
      padding: 10px;
      height: 50px;
      background-color: rgba(255, 255, 255, 0.8);
      box-sizing: border-box;
      overflow: visible;
      :global(> div) {
        &:nth-child(1) {
          width: 5%;
          min-width: 70px;
          max-width: 75px;
          text-align: center;
          overflow: visible;
          font-size: 22px;
          font-family: "Inter";
          z-index: 3;
          font-weight: 500;
        }
        &:nth-child(2) {
          width: 15%;
          font-weight: 500;
          text-align: center;
          min-width: 150px;
          font-size: 22px;
          font-family: "Inter";
          min-width: 200px;
        }
        &:nth-child(3) {
          width: 10%;
          font-weight: 500;
          text-align: center;
          font-family: "Inter";
          font-size: 22px;
        }
        &:nth-child(4) {
          width: 20%;
          font-weight: 500;
          text-align: center;
          font-family: "Inter";
          font-size: 22px;
        }
        &:nth-child(5) {
          width: 8%;
          font-weight: 500;
          font-size: 22px;
          font-family: "Inter";
        }
        
      }
      @container (max-width:700px) {
                  gap: 1px;
  
                  :global(.id){
                      display: none;
                  }
          
        }
        @container (max-width:500px) {
                  gap: 1px;
  
                  :global(.house){
                      display: none;
                  }
          :global(div):nth-child(1) {
            width: 5%;
            min-width: 50px;
            max-width: 55px;
            text-align: center;
            overflow: visible;
            font-size: 0.9rem;
            font-family: "Inter";
            z-index: 3;
            .image {
              transform: translateY(11px)
            }
          }
          :global(div):nth-child(2) {
            text-align: center;
            font-size: 0.9rem;
            width: auto;
            min-width: 70px;
            font-family: "Inter";
          }
          :global(div):nth-child(5) {
            width: 5%;
            min-width: 50px;
            max-width: 75px;
            text-align: center;
            font-size: 0.9rem;
            font-family: "Inter";
            
          }
          
        }
  
    }
    .image {
      margin-top: -25px;
    }
    :global(.homescorelist.top) {
    margin-top: 35px;
    margin-bottom: 35px;
   
  }
  
  </style>
  