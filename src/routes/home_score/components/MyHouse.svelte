<script lang="ts">
    import List from "$lib/components/List.svelte";
    import BadgeGold from "$lib/components/Icons/Badge_Gold.svelte";
    import BadgeSilver from "$lib/components/Icons/Badge_Silver.svelte";
    import BadgeBronze from "$lib/components/Icons/Badge_Bronze.svelte";
    
    export type MyHouse = {
		name: string;
		id: string;
		score: number;
	};
    
    let {index, data}: {index: number; data: MyHouse} = $props();

</script>