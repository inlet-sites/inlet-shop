<script>
    import Header from "../../../../components/Header.svelte";
    let {data} = $props();
</script>

<Header/>

<div class="container">
    {#if data.order.error}
        <div class="error">
            <h1>Invalid Order</h1>
            <a href="/">Return to Shopping</a>
        </div>
    {:else}
        <h1>{data.order.vendor}</h1>
        <h2>{data.order.name}</h2>
        <h3>Something</h3>
    {/if}
</div>

<style>
    .container{
        color: var(--text);
    }

    .error{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: calc(100vh - 50px);
        width: 100vw;
    }

    .error h1{
        font-size: 45px;
    }

    .error a{
        color: var(--text);
        margin-top: 35px;
    }
</style>
