<script>
    import "$lib/global.css";
    import {setContext} from "svelte";
    import {goto} from "$app/navigation";
    import Loader from "$lib/Loader.svelte";
    import Notifier from "$lib/Notifier.svelte";
    import Header from "$lib/Header.svelte";

    let {children, data} = $props();
    let loader = $state(false);
    let notifier = $state(null);

    const setLoader = (on)=>{
        loader = on;
    }

    const notify = (type, message)=>{
        notifier = {
            type: type,
            message: message
        };

        setTimeout(()=>{
            notifier = null;
        }, 7500);
    }

    const changePage = (page)=>{
        switch(page){
            case "about": goto(`/${data.vendor.url}`); break;
            case "shop": goto(`/${data.vendor.url}/shop`); break;
        }
    }

    setContext("loader", setLoader);
    setContext("notify", notify);
</script>

{#if loader}
    <Loader/>
{/if}

{#if notifier}
    <Notifier
        type={notifier.type}
        message={notifier.message}
    />
{/if}

<Header
    storeUrl={data.vendor.url}
    storeName={data.vendor.store}
    changePage={changePage}
/>

{@render children()}
