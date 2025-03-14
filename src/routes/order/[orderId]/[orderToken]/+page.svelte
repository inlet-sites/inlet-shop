<script>
    import Header from "../../../../components/Header.svelte";
    import CartItem from "../../../../components/CartItem.svelte";

    let {data} = $props();

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
        let shipping = 0;
        for(let i = 0; i < data.order.items.length; i++){
            const item = data.order.items[i];
            for(let j = 0; j < item.product.variations.length; j++){
                const variation = item.product.variations[j];
                if(variation.id === item.variation){
                    shipping += variation.shipping * item.quantity;
                    price += variation.price * item.quantity;
                }
            }
        }
        return {
            price: price,
            shipping: shipping,
            total: price + shipping
        };
    }
    let {price, shipping, total} = calculatePrice();

    const getStatus = ()=>{
        switch(data.order.status){
            case "incomplete": return "Payment Processing";
            case "paid": return "Awaiting Vendor Confirmation";
            case "paymentFailed": return "Payment Failed";
            case "declined": return "Declined by Vendor";
            case "confirmed": return "Confirmed. Awaiting Shipment";
            case "shipped": return "Shipped";
        }
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
        {#if data.order.status === "incomplete"}
            <p class="statusDescription">Your payment is currently being processed.</p>
        {:else if data.order.status === "paid"}
            <p class="statusDescription">Payment has been processed and the order is awaiting confirmation from the vendor.</p>
        {:else if data.order.status === "paymentFailed"}
            <p class="statusDescription">Payment failed and order has been cancelled.</p>
        {:else if data.order.status === "declined"}
            <p class="statusDescription">Vendor has declined the order and will issue a refund. Contact vendor with information below if refund is not recieved within 10 business days.</p>
        {:else if data.order.status === "confirmed"}
            <p class="statusDescription">Vendor has confirmed your order and you will be notified when it has shipped</p>
        {:else if data.order.status === "shipped"}
            <p class="statusDescription">This order has been shipped and is completed.</p>
        {/if}

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
                    <td>{formatPrice(price)}</td>
                </tr>
                <tr>
                    <td>Shipping</td>
                    <td>{formatPrice(shipping)}</td>
                </tr>
                <tr>
                    <td>Total:</td>
                    <td>{formatPrice(total)}</td>
                </tr>
                <tr class="status">
                    <td>Current Status:</td>
                    <td>{getStatus()}</td>
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

        <p class="contactNote">If there are any issues with your order, please contact the vendor with the below information:</p>

        {#if data.order.vendor[0].contact?.phone}
            <div class="contact">
                <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
                    <path d="M18.1182 14.702L14 15.5C11.2183 14.1038 9.5 12.5 8.5 10L9.26995 5.8699L7.81452 2L4.0636 2C2.93605 2 2.04814 2.93178 2.21654 4.04668C2.63695 6.83 3.87653 11.8765 7.5 15.5C11.3052 19.3052 16.7857 20.9564 19.802 21.6127C20.9668 21.8662 22 20.9575 22 19.7655L22 16.1812L18.1182 14.702Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
                <a href="tel:{data.order.vendor[0].contact.phone}">{data.order.vendor[0].contact.phone}</a>
            </div>
        {/if}
        {#if data.order.vendor[0].contact?.email}
            <div class="contact">
                <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
                    <path d="M7 9L12 12.5L17 9" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M2 17V7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17Z" stroke="#ffffff" stroke-width="1.5"></path>
                </svg>
                <a href="mailto:{data.order.vendor[0].contact.email}">{data.order.vendor[0].contact.email}</a>
            </div>
        {/if}
    {/if}
</div>

<style>
    .container{
        color: var(--text);
        padding: 35px;
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

    .statusDescription{
        margin: 35px;
        padding: 15px;
        font-size: 28px;
        border-bottom: 1px solid white;
    }

    h2{
        margin-top: 35px;
    }

    table{
        font-size: 22px;
    }

    .contactNote{
        margin-top: 35px;
    }

    td:first-of-type{
        text-align: right;
        padding-right: 35px;
    }

    .status{
        color: rgba(255, 150, 0, 0.75);
    }

    .contact{
        display: flex;
        align-items: center;
    }

    a{
        color: var(--text);
        margin: 15px 0 15px 15px;
    }

    @media screen and (max-width: 700px){
        .container{
            padding: 15px;
        }

        table{
            font-size: 18px;
            margin: 0 auto;
        }

        td{
            border: 1px solid rgba(255, 255, 255, 0.5);
            padding: 5px;
        }
    }
</style>
