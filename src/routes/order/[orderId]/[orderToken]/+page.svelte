<script>
    import Header from "../../../../components/Header.svelte";
    import CartItem from "../../../../components/CartItem.svelte";

    let {data} = $props();
    console.log(data.order.items);

    const formatDate = (date)=>{
        const formDate = new Date(date);

        return formDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    }

    const formatItem = (item)=>{
        let variation;
        for(let i = 0; i < item.product.variations.length; i++){
            if(item.product.variations[i].id === item.variation){
                variation = item.product.variations[i];
                break;
            }
        }

        return {
            product: item.product,
            variation: variation,
            quantity: item.quantity
        };
    }

    const formatPrice = (price)=>{
        return `$${(price / 100).toFixed(2)}`;
    }

    const calculatePrice = ()=>{
        let price = 0;
        for(let i = 0; i < data.order.items.length; i++){
            const item = data.order.items[i];
            for(let j = 0; j < item.product.variations.length; j++){
                const variation = item.product.variations[j];
                if(variation.id === item.variation){
                    price += variation.price * item.quantity;
                }
            }
        }
        return price;
    }
</script>

<Header/>

<div class="container">
    {#if data.order.error}
        <div class="error">
            <h1>Invalid Order</h1>
            <a href="/">Return to Shopping</a>
        </div>
    {:else}
        <table>
            <tbody>
                <tr>
                    <td>Store:</td>
                    <td>{data.order.vendor[0].store}</td>
                </tr>
                <tr>
                    <td>Customer:</td>
                    <td>{data.order.name}</td>
                </tr>
                <tr>
                    <td>Shipping Address:</td>
                    <td>{data.order.address}</td>
                </tr>
                <tr>
                    <td>Order Date:</td>
                    <td>{formatDate(data.order.date)}</td>
                </tr>
                <tr>
                    <td>Price:</td>
                    <td>{formatPrice(calculatePrice())}</td>
                </tr>
                <tr>
                    <td>Shipping</td>
                    <td>???</td>
                </tr>
                <tr>
                    <td>Total:</td>
                    <td>???</td>
                </tr>
            </tbody>
        </table>

        <h2>Items</h2>
        {#each data.order.items as item}
            <CartItem
                item={formatItem(item)}
                vendor={data.order.vendor[0].store}
                edit={false}
            />
        {/each}
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
