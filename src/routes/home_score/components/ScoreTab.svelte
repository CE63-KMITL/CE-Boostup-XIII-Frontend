<script lang="ts">
    import Frame from "../../../components/Frame.svelte";

    export let headers = {};
	export let activeTab: string;

    function selectTab(tabName: string) {
        activeTab = tabName;
    }

</script>