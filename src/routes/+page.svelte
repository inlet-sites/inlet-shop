<script>
    import "../global.css";
    import logo from "$lib/logo.png";
    import Loader from "../components/Loader.svelte";
    import Notifier from "../components/Notifier.svelte";
    import Header from "../components/Header.svelte";
    import LandingHeader from "./LandingHeader.svelte";
    import VendorCard from "./VendorCard.svelte";

    let {data} = $props();
    let {vendors} = data;
    let loader = $state(false);
    let notifier = $state({type: "", message: ""});

    const notify = (type, message)=>{
        notifier.type = type;
        notifier.message = message;

        setTimeout(()=>{
            notifier.type = "";
        }, 7500);
    }
</script>

<svelte:head>
    <title>Inlet.Shop</title>
</svelte:head>

{#if notifier.type}
    <Notifier type={notifier.type} message={notifier.message}/>
{/if}

{#if loader}
    <Loader/>
{/if}

<Header/>

<LandingHeader/>

<div class="container">
    <div class="vendors">
        {#each vendors as vendor}
            <VendorCard
                vendor={vendor}
            />
        {/each}
    </div>
</div>

<style>
    .container{
        padding: 35px;
    }

    .vendors{
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    @media screen and (max-width: 600px){
        .container{
            padding: 15px;
        }
    }
</style>
