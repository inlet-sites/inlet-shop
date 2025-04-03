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
        flex-direction: column;
        flex-wrap: wrap;
    }

    @media screen and (max-width: 600px){
        .container{
            padding: 15px;
        }
    }
</style>
