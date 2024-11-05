<script>
    import {onMount} from "svelte";
    import "../global.css";
    import logo from "$lib/logo.png";
    import Loader from "../components/Loader.svelte";
    import Notifier from "../components/Notifier.svelte";

    let vendors = $state([]);
    let loader = $state(false);
    let notifier = $state({type: "", message: ""});

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
                    notifier.message = response.message;
                    notifier.type = "error";
                }else{
                    vendors = response;
                }
            })
            .catch((err)=>{
                notifier.message = "Something went wrong, try refreshing the page";
                notifier.type = "error";
            })
            .finally(()=>{
                loader = false;
            });
    });
</script>

<svelte:head>
    <title>Inlet Shop</title>
</svelte:head>

{#if loader}
    <Loader/>
{/if}

<header>
    <div class="logoContainer">
        <img src={logo} alt="Inlet Shop logo">
        <h2>Inlet.Shop</h2>
    </div>

    <a href="https://vendor.inlet.shop">Become a Vendor</a>
</header>

<div class="vendors">
    {#each vendors as vendor}
        <a href="/{vendor.url}" class="vendor">
            <h2>{vendor.store}</h2>
            <img src="{import.meta.env.VITE_API_URL}/document/{vendor.image}" alt={vendor.name}>
        </a>
    {/each}
</div>

<style>
    header{
        display: flex;
        align-items: center;
        height: 100px;
        width: 100vw;
        padding-left: 35px;
    }

    .logoContainer{
        display: flex;
        align-items: center;
        height: 100%;
    }

    header img{
        height: 75%;
        margin-right: 15px;
    }

    header h2{
        color: var(--text);
        font-size: 38px;
    }

    header a{
        margin: 0 35px 0 auto;
        color: var(--text);
    }

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
        width: 350px;
        border: 1px solid white;
        margin: 25px;
        text-decoration: none;
    }

    .vendor h2{
        color: white;
    }

    .vendor img{
        max-width: 75%;
        max-height: 75%;
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
