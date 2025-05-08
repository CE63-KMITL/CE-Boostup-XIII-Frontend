<script lang="ts">
    import List from "$lib/components/List.svelte";
    import BadgeGold from "$lib/components/Icons/Badge_Gold.svelte";
    import BadgeSilver from "$lib/components/Icons/Badge_Silver.svelte";
    import BadgeBronze from "$lib/components/Icons/Badge_Bronze.svelte";
    
    export type House = {
		house: string;
		score: number;
	};
    
    let {index, data}: {index: number; data: House} = $props();

</script>