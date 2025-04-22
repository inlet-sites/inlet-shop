<script>
    import {onMount, createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();
    let {
        publishableKey,
        connectedId,
        clientSecret,
        orderId,
        orderToken,
        total,
        vendorId
    } = $props();

    const stripe = Stripe(publishableKey, {stripeAccount: connectedId});
    const appearance = {theme: "night"};
    const elements = stripe.elements({
        appearance: appearance,
        clientSecret: clientSecret
    });

    const stripeSetup = ()=>{
        const paymentElementOptions = {
            layout: "accordion"
        };
        const paymentElement = elements.create("payment", paymentElementOptions);
        paymentElement.mount("#payment-element");
    }

    const handleSubmit = async ()=>{
        dispatch("loader", {on: true});
        
        const cart = JSON.parse(localStorage.getItem("cart"));
        cart[vendorId] = undefined;
        localStorage.setItem("cart", JSON.stringify(cart));

        const {error} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${import.meta.env.VITE_API_URL}/order/${orderId}/${orderToken}`
            }
        });

        if(error.type === "card_error" || error.type === "validation_error"){
            dispatch("notify", {
                type: "error",
                message: error.message
            });
        }else{
            dispatch("notify", {
                type: "error",
                message: "An unexpected error occured"
            });
        }
    }

    const formatPrice = (num)=>{
        return `$${(num / 100).toFixed(2)}`;
    }

    onMount(stripeSetup);
</script>

<div class="StripeCheckout">
    <h1>{formatPrice(total)}</h1>
    <form class="paymentForm" onsubmit={handleSubmit}>
        <div id="payment-element"></div>
        <button class="submitBtn button">
            <div class="spinner hidden" id="spinner"></div>
            <span id="button-text">Pay now</span>
        </button>
        <div id="payment-message" class="hidden"></div>
    </form>
</div>

<style>
    .StripeCheckout{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 35px;
        flex-basis: 50%;
        flex-grow: 1;
    }

    h1{
        color: rgb(133, 217, 150);
        margin-bottom: 15px;
        font-size: 35px;
    }

    .paymentForm{
        width: 100%;
    }

    .submitBtn{
        width: 100%;
        margin-top: 35px;
        background: rgb(133, 217, 150);
    }
</style>
