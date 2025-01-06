<script>
    import {onMount} from "svelte";
    import "../../global.css";
    import Notifier from "../../components/Notifier.svelte";
    import Loader from "../../components/Loader.svelte";

    let cart = $state();
    let currentVendor = $state(0);
    let notifier = $state({type: "", message: ""});
    let loader = $state(false);
    $inspect(cart);

    const createNotifier = (type, message)=>{
        notifier.type = type;
        notifier.message = message;

        setTimeout(()=>{
            notifier.type = "";
        }, 7500);
    }

    const getCart = ()=>{
        loader = true;
        const cartObj = localStorage.getItem("cart");
        if(!cartObj){
            cart = [];
            return;
        }


        fetch(`${import.meta.env.VITE_API_URL}/cart`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: cartObj
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    createNotifier("error", response.error.message);
                }else{
                    cart = response;
                    console.log(cart);
                    console.log(cart[0]);
                }
            })
            .catch((err)=>{
                createNotifier(
                    "error",
                    "Something went wrong, try refreshing the page"
                );
            })
            .finally(()=>{
                loader = false;
            });
    }

    onMount(getCart);
</script>

{#if notifier.type}
    <Notifier
        type={notifier.type}
        message={notifier.message}
    />
{/if}

{#if loader}
    <Loader/>
{/if}

<div class="container">
    <h1>Your Cart</h1>

    <select bind:value={currentVendor}>
        {#each cart as vendor, i}
            <option value={i}>{vendor.store}</option>
        {/each}
    </select>

    <div class="cart">
        {#each cart[currentVendor].items as item}
            <p>{item.product.name}</p>
        {/each}
    </div>
</div>

<style>
    .container{
        color: var(--text);
    }
</style>
