<script>
    import "../../global.css";
    import {onMount} from "svelte";
    import logo from "$lib/logo.png";
    import Loader from "../../components/Loader.svelte";
    import Notifier from "../../components/Notifier.svelte";
    import Header from "./Header.svelte";
    import Shop from "./pages/Shop.svelte";

    let {data} = $props();
    let page = $state("about");
    let loader = $state(false);
    let vendor = $state({});
    let notifier = $state({type: "", message: ""});

    const changePage = (event)=>{
        page = event.detail.page;
    }

    const updateLoader = (event)=>{
        loader = event.detail.on;
    }

    const notify = (event)=>{
        notifier.type = event.detail.type;
        notifier.message = event.detail.message;
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
                    notifier.type = "error";
                    notifier.message = response.message;
                }else{
                    vendor = response;
                }
            })
            .catch((err)=>{
                notifier.type = "erro";
                notifier.message = "Something went wrong, try refreshing the page"
            })
            .finally(()=>{
                loader = false;
            });
    });
</script>

{#if loader}
    <Loader/>
{/if}

<Notifier
    type={notifier.type}
    message={notifier.message}
/>

<Header
    name={vendor.store}
    on:changePage={changePage}
/>

{#if page === "shop"}
    <Shop
        vendorId={vendor.id}
        on:loader={updateLoader}
        on:notify={notify}
    />
{/if}
