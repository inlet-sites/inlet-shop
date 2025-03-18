<script>
    import {onMount} from "svelte";
    import "../global.css";
    import logo from "$lib/logo.png";
    import Loader from "../components/Loader.svelte";
    import Notifier from "../components/Notifier.svelte";
    import Header from "../components/Header.svelte";
    import LandingHeader from "./LandingHeader.svelte";
    import VendorCard from "./VendorCard.svelte";

    let vendors = $state([]);
    let loader = $state(false);
    let notifier = $state({type: "", message: ""});
    const apiUrl = import.meta.env.VITE_API_URL;

    const notify = (type, message)=>{
        notifier.type = type;
        notifier.message = message;

        setTimeout(()=>{
            notifier.type = "";
        }, 7500);
    }

    onMount(()=>{
        loader = true;
        fetch(`${apiUrl}/vendor`, {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    notify("error", response.error.message);
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
        flex-wrap: wrap;
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
        .container{
            padding: 15px;
        }
    }
</style>
