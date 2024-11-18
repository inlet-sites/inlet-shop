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
    let page = $state("about");
    let loader = $state(false);
    let vendor = $state({});
    let products = $state([]);
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

    onMount(()=>{
        loader = true;
        fetch(`${import.meta.env.VITE_API_URL}/vendor/${data.url}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    createNotifier("error", response.message);
                }else{
                    vendor = response;
                    return fetch(`${import.meta.env.VITE_API_URL}/product/vendor/${vendor.id}`, {
                        method: "get",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                }
            })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    createNotifier("error", response.message);
                }else{
                    products = response;
                }
            })
            .catch((err)=>{
                console.log(err);
                createNotifier("error", "Something went wrong, try refreshing the page");
            })
            .finally(()=>{
                loader = false;
            });
    });
</script>

<svelte:head>
    <title>{vendor.store} | Inlet.Shop</title>
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
    name={vendor.store}
    on:changePage={changePage}
/>

{#if page === "shop"}
    <Shop
        products={products}
        vendorUrl={vendor.url}
        singleProduct={null}
        on:loader={updateLoader}
        on:notify={notify}
    />
{:else if page === "about"}
    <About
        vendor={vendor}
        on:loader={updateLoader}
        on:notify={notify}
    />
{/if}
