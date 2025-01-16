<script>
    import "../../../global.css";
    import Loader from "../../../components/Loader.svelte";
    import Notifier from "../../../components/Notifier.svelte";
    import Items from "./Items.svelte";
    import CustomerInfo from "./CustomerInfo.svelte";
    import StripeCheckout from "./StripeCheckout.svelte";

    let {data} = $props();
    let loader = $state(false);
    let notifier = $state({type: "", message: ""});
    let checkoutStage = $state("customerInfo");
    let orderData = $state();
    let total = $state();

    const setLoader = (event)=>{
        loader = event.detail.on;
    }

    const notify = (event)=>{
        notifier.type = event.detail.type;
        notifier.message = event.detail.message;

        setTimeout(()=>{
            notifier.type = "";
        }, 7500);
    }

    const createOrder = (event)=>{
        loader = true;
        const cart = JSON.parse(localStorage.getItem("cart"));
        orderData = event.detail.data;
        orderData.vendor = data.vendorId;
        orderData.items = cart[data.vendorId];

        fetch(`${import.meta.env.VITE_API_URL}/order`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderData)
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    notify({
                        detail: {
                            type: "error",
                            message: response.error.message
                        }
                    });
                }else{
                    orderData = response;
                    updateCart();
                    checkoutStage = "stripe";
                }
            })
            .catch((err)=>{
                notify({
                    detail: {
                        type: "error",
                        message: "Something went wrong, try refreshing the page"
                    }
                });
            })
            .finally(()=>{
                loader = false;
            });
    }

    const updateCart = ()=>{
        const cart = JSON.parse(localStorage.getItem("cart"));
        cart[data.vendorId] = undefined;
        localStorage.setItem("cart", JSON.stringify(cart));
    }
</script>

<svelte:head>
    <title>Checkout | Inlet.Shop</title>
    <script src="https://js.stripe.com/v3/"></script>
</svelte:head>

{#if loader}
    <Loader/>
{/if}

{#if notifier.type}
    <Notifier type={notifier.type} message={notifier.message}/>
{/if}

<div class="container">
    <Items
        vendorId={data.vendorId}
        on:loader={setLoader}
        on:notify={notify}
        on:setTotal={(event)=>{total = event.detail.total}}
    />

    {#if checkoutStage === "customerInfo"}
        <CustomerInfo
            on:next={createOrder}
            on:notify={notify}
        />
    {:else if checkoutStage === "stripe"}
        <StripeCheckout
            publishableKey={orderData.publishableKey}
            clientSecret={orderData.clientSecret}
            orderId={orderData.orderId}
            orderToken={orderData.orderToken}
            total={total}
            on:loader={setLoader}
        />
    {/if}
</div>

<style>
    .container{
        display: flex;
        height: 100vh;
        width: 100vw;
    }

    @media screen and (max-width: 1200px){
        .container{
            flex-direction: column-reverse;
            height: initial;
        }
    }
</style>
