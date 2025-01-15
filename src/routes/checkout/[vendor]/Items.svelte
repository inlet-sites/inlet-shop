<script>
    import {onMount, createEventDispatcher} from "svelte";
    import CartItem from "../../../components/CartItem.svelte";

    const dispatch = createEventDispatcher();
    let {vendorId} = $props();
    let vendor = $state({});

    const getCart = ()=>{
        dispatch("loader", {on: true});
        fetch(`${import.meta.env.VITE_API_URL}/cart`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: localStorage.getItem("cart")
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    dispatch("notify", {type: "error", message: response.error.message});
                }else{
                    vendor = response.find(v => v._id === vendorId);
                    let total = 0;
                    for(let i = 0; i < vendor.items.length; i++){
                        const variation = vendor.items[i].variation
                        const quantity = vendor.items[i].quantity;
                        total += (variation.price + variation.shipping) * quantity;
                    }
                    dispatch("setTotal", {
                        total: total
                    });
                }
            })
            .catch((err)=>{
                dispatch("notify", {
                    type: "error",
                    message: "Something went wrong, try refreshing the page"
                });
            })
            .finally(()=>{
                dispatch("loader", {on: false});
            });
    }

    onMount(getCart);
</script>

<div class="Items">
    <h1>Your Items</h1>

    {#each vendor.items as item}
        <CartItem
            item={item}
            vendor={vendor.store}
            edit={false}
        />
    {/each}
</div>

<style>
    .Items{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-basis: 50%;
        flex-grow: 0;
        height: 100%;
        border-right: 1px solid white;
        color: var(--text);
        padding: 35px;
    }

    @media screen and (max-width: 800px){
        .Items{
            height: initial;
        }
    }
</style>
