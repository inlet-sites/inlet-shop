<script>
    import Header from "../../components/Header.svelte";
</script>

<Header/>

<div class="container">
    <h1>Purchase support</h1>
    <p>If you need assistance with a purchase that you have made, then you should contact the seller. Any vendor selling on the site is required to provide either a phone number or an email address where you can reach them.</p>
    <p>You can find this information on their "About" page. If you have placed an order with a vendor, then you can also find this information via the link that you recieved in your email.</p>

    <h1>Technical/Other support</h1>
    <p>If you have technical troubles with the site, then you can contact Inlet Sites with the information provided below.</p>
    <p>If, for any reason, you cannot contact a vendor with whom you have placed an order then you may contact us and we will work to resolve the issue.</p>

    <ul>
        <li><a href="mailto:lee@inletsites.dev">lee@inletsites.dev</a></li>
        <li><a href="tel:+18434109586">(843) 410-9586</a></li>
    </ul>
</div>

<style>
    .container{
        color: var(--text);
        margin: 35px;
    }

    p{
        font-size: 18px;
        margin: 15px 0;
    }

    li{
        margin: 15px 0;
    }

    a{
        color: var(--text);
        font-size: 20px;
    }
</style>
