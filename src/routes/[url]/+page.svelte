<script>
    import "../../global.css";
    import {onMount} from "svelte";
    import {slide} from "svelte/transition";
    import logo from "$lib/logo.png";
    import Loader from "../../components/Loader.svelte";
    import Notifier from "../../components/Notifier.svelte";
    import Header from "./Header.svelte";
    import Shop from "./pages/Shop.svelte";
    import About from "./pages/About.svelte";

    let {data} = $props();
    let page = $state("shop");
    let loader = $state(false);
    let notifier = $state({type: "", message: ""});

    const changePage = (event)=>{
        page = event.detail.page;
        if(event.detail.page === "shop"){
            const event = new CustomEvent("closeProduct");
            document.dispatchEvent(event);
        }
    }

    const updateLoader = (event)=>{
        loader = event.detail.on;
    }

    const createNotifier = (type, message)=>{
        notifier.type = type;
        notifier.message = message;

        setTimeout(()=>{
            notifier.type = "";
        }, 7500);
    }

    const notify = (event)=>{
        createNotifier(event.detail.type, event.detail.message);
    }
</script>

<svelte:head>
    <title>{data.vendor.store} | Inlet.Shop</title>
</svelte:head>

{#if loader}
    <Loader/>
{/if}

{#if notifier.type}
    <Notifier
        type={notifier.type}
        message={notifier.message}
    />
{/if}

<Header
    name={data.vendor.store}
    on:changePage={changePage}
/>

{#if page === "shop"}
    <Shop
        products={data.products}
        vendorUrl={data.vendor.url}
        on:loader={updateLoader}
        on:notify={notify}
    />
{:else if page === "about"}
    <About
        vendor={data.vendor}
        on:loader={updateLoader}
        on:notify={notify}
    />
{/if}
