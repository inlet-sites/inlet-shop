<script>
    import Items from "./Items.svelte";
    import Loader from "../../../components/Loader.svelte";
    import Notifier from "../../../components/Notifier.svelte";

    let {data} = $props(); //data.vendorId
    let loader = $state(false);
    let notifier = $state({type: "", message: ""});

    const setLoader = (event)=>{
        loader = event.detail.on;
    }

    const notify = (event)=>{
        notifier.type = event.detail.type;
        notifier.message = event.detail.message;

        setTimeout(()=>{
            notifier.type = "";
        }, 7500);
    }
</script>

<svelte:head>
    <title>Checkout | Inlet.Shop</title>
    <!--<script src="https://js.stripe.com/v3/"></script>-->
</svelte:head>

{#if loader}
    <Loader/>
{/if}

<div class="container">
    <Items
        vendorId={data.vendorId}
        on:loader={setLoader}
        on:notify={notify}
    />
</div>

<style>
    .container{
        display: flex;
        height: 100vh;
        width: 100vw;
    }
</style>
