<script lang="ts">
    // let { number , name , score , highlight } = $props();
    import List from "../../components/List.svelte";
    import type { Scoredeaw } from "./scoredeaw";
    // export let homescore: Scoredeaw;
</script>
<List class="homescorelist" >
	<div class="index">1</div>
	<div class="name">Veerapat Pirultham</div>
	<div class="id">67010852</div>
	<div class="house">bard</div>
	<div class="score">700</div>
</List>
<style>
    :global(.homescorelist){
        display: flex;
        justify-content: space-between;
        margin: 7px;
        padding: 10px;
        background-color: rgba(255, 255, 255, 0.8);
        box-sizing: border-box;
        :global(> div) {
				&:nth-child(1) {
					width: 5%;
					min-width: 70px;
					text-align: center;
				}
				&:nth-child(2) {
					width: 15%;
                    text-align: center;
				}
				&:nth-child(3) {
					width: 10%;
					text-align: center;
				}
				&:nth-child(4) {
					width: 20%;
					text-align: center;
				}
				&:nth-child(5) {
					width: 8%;
				
				}
			}
    }

</style>
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