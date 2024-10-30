<script>
    import "../../global.css";
    import logo from "$lib/logo.png";
    import Loader from "../../components/Loader.svelte";
    import Notifier from "../../components/Notifier.svelte";
    import Header from "./Header.svelte";

    let {data} = $props();
    let page = $state("products");
    let loader = $state(false);
    let vendor = $state({});
</script>

{#if loader}
    <Loader/>
{/if}

<Header name={vendor.name}/>

{#if page === "products"}

{/if}
