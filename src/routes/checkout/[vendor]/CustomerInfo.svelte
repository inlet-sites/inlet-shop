<script>
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();
    let name = $state();
    let address = $state();
    let email = $state();
    let confirmEmail = $state();

    const submit = ()=>{
        if(email !== confirmEmail){
            console.log("something");
            dispatch("notify", {
                type: "error",
                message: "Emails do not match"
            });
            return;
        }

        dispatch("next", {data: {
            name: name,
            address: address,
            email: email,
            confirmEmail: confirmEmail
        }});
    }
</script>

<div class="CustomerInfo">
    <form class="standardForm" onsubmit={submit}>
        <h1>Personal Information</h1>

        <label>Your Name
            <input
                type="text"
                bind:value={name}
                placeholder="Name"
                required
            >
        </label>

        <label>Full Address
            <textarea
                rows="5"
                bind:value={address}
                required
            ></textarea>
        </label>

        <label>Email Address
            <p class="emailNote"><span class="important">Important</span>: This email will be used for all updates about your order</p>
            <input
                type="email"
                bind:value={email}
                placeholder="Email"
                required
            >
        </label>

        <label>Confirm Email
            <input
                type="email"
                bind:value={confirmEmail}
                placeholder="Email"
                required
            >
        </label>

        <button class="button">Next</button>
    </form>
</div>

<style>
    .CustomerInfo{
        display: flex;
        justify-content: center;
        flex-basis: 50%;
        flex-grow: 1;
        color: var(--text);
        padding: 35px;
    }

    form{
        width: 100%;
    }

    textarea{
        font-size: 28px;
    }

    .emailNote{
        font-size: 13px;
        font-weight: bold;
    }

    .important{
        color: red;
    }
</style>
