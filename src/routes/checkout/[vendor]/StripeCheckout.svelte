<script>
    import {onMount, createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();
    let {publishableKey, clientSecret} = $props();

    const stripe = Stripe(publishableKey);
    const appearance = {theme: "stripe"};
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
        const {error} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${import.meta.env.VITE_URL}/checkout/complete`
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

    onMount(stripeSetup);
</script>

<div class="StripeCheckout">
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

    .paymentForm{
        width: 100%;
    }

    .submitBtn{
        width: 100%;
        margin-top: 35px;
        background: green;
    }
</style>
