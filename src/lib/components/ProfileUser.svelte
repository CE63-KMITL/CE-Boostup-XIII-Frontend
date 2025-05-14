<script lang="ts">
    import UserIcon from "./UserIcon.svelte";
    
    export let user;
</script>

<!-- {#if data}
	<img src={data} alt="icon" class="usericon" />
{/if} -->

<div class="wholeProfile">
    <div class="wholeProfile-top">
        <div id="profileImage"> <UserIcon data={user.icon}></UserIcon> </div>
        <div id="nameID">
            <span>{user.name}</span>
            <span>{user.studentId}</span>
        </div>
    </div>
    <div class="wholeProfile-bottom">
        <span>อีเมล : {user.email}</span>
        <span>บ้าน : {user.house}</span>
    </div>
</div>

<style lang="scss">

.wholeProfile {
    .wholeProfile-top {
        #profileImage {
            
        }

        #nameID {

        }
    }
    .wholeProfile-bottom {

    }
}

</style>