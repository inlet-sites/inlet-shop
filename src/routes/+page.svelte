<script>
    import {onMount} from "svelte";
    import "../global.css";
    import logo from "$lib/logo.png";
    import Loader from "../components/Loader.svelte";
    import Notifier from "../components/Notifier.svelte";
    import Header from "../components/Header.svelte";

    let vendors = $state([]);
    let loader = $state(false);
    let notifier = $state({type: "", message: ""});

    const notify = (type, message)=>{
        notifier.type = type;
        notifier.message = message;

        setTimeout(()=>{
            notifier.type = "";
        }, 7500);
    }

    onMount(()=>{
        loader = true;
        fetch(`${import.meta.env.VITE_API_URL}/vendor`, {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    notify("error", response.message);
                }else{
                    vendors = response;
                }
            })
            .catch((err)=>{
                notify("error", "Something went wrong, try refreshing the page");
            })
            .finally(()=>{
                loader = false;
            });
    });
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

<Header home={true}/>

<div class="vendors">
    {#each vendors as vendor}
        <a href="/{vendor.url}" class="vendor">
            {#if vendor.image}
                <img src="{import.meta.env.VITE_API_URL}/document/{vendor.image}" alt={vendor.store}>
            {:else}
                <img src="{import.meta.env.VITE_API_URL}/document/defaultVendorImage.png" alt={vendor.store}>
            {/if}
            <h3>{vendor.store}</h3>
            <p>{vendor.slogan}</p>
        </a>
    {/each}
</div>

<style>
    .vendors{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .vendor{
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 250px;
        width: 250px;
        border: 1px solid white;
        margin: 25px;
        text-decoration: none;
        background: white;
        border-radius: 15px;
        color: black;
    }

    .vendor h3{
        text-decoration: underline;
        margin: auto 0;
    }

    .vendor img{
        max-width: 100%;
        max-height: 75%;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
    }

    @media screen and (max-width: 600px){
        header{
            flex-direction: column;
            padding: 0;
            margin-bottom: 35px;
        }

        header a{
            margin: 0;
        }
    }
</style>
