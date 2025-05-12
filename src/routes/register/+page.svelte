<script lang="ts">
    import { page } from '$app/stores';

    $: query = $page.url.searchParams.get('type');
</script>

<div class="registerContainer">
    <div class="registerBox">
        <h1 class="registerHead">ข้อมูลผู้ใช้</h1>
        {#if query == "student"}
            <p>student</p>
        {:else}
            <p>outsider</p>
        {/if}
    </div>
</div>

<style lang="scss">
    .registerContainer{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .registerBox{
        display: flex;
		flex-direction: column;
		align-items: center;
		height: auto;
		min-width: fit-content;
		width: 25%;
		padding: 1rem;
		padding-top: 0px;
		gap: 1rem;
		margin-left: 0.75rem;
		margin-right: 0.75rem;
		border: 1px solid var(--theme-dark);
		border-radius: 15px;
		background-color: var(--bg-50);
    }
    .registerHead{
        font-size: 3.5rem;
		font-weight: 700;
		margin-top: 2rem;
		color: var(--theme-dark-text);
    }
</style>