<script>
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();
    let {images, idx}= $props();
    $inspect(images);

    const close = (event)=>{
        event.stopPropagation();
        dispatch("close");
    }

    const changeImage = (i)=>{
        idx += i;
        if(idx < 0) idx = images.length - 1;
        if(idx > images.length - 1) idx = 0;
    }
</script>

<div class="Images">
    <button class="close" onclick={close} aria-label="close">
        <svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
            <path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </button>

    <button class="left imageButton" onclick={()=>{changeImage(-1)}} aria-label="previous image">
        <svg width="32px" height="32px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" color="#000000">
            <path d="M11 6L5 12L11 18" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M19 6L13 12L19 18" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </button>

    <img src="{import.meta.env.VITE_API_URL}/document/{images[idx]}" alt="Current product">

    <button class="right imageButton" onclick={()=>{changeImage(1)}} aria-label="next image">
        <svg width="32px" height="32px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" color="#000000">
            <path d="M13 6L19 12L13 18" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M5 6L11 12L5 18" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </button>
</div>

<style>
    .Images{
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: rgba(255, 255, 255, 0.35);
    }

    .close{
        display: flex;
        position: absolute;
        top: 35px;
        right: 35px;
        border: 2px solid black;
        background: none;
        border-radius: 50%;
        cursor: pointer;
    }

    img{
        max-width: 85%;
        max-height: 95%;
        box-shadow: 0 0 10px black;
    }

    .imageButton{
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: calc(50% - 25px);
        height: 50px;
        width: 50px;
        background: var(--text);
        border: 2px solid black;
        border-radius: 50%;
        cursor: pointer;
    }

    .left{
        left: 35px;
    }

    .right{
        right: 35px;
    }

    @media screen and (max-width: 900px){
        .Images{
            position: fixed;
        }

        .imageButton{
            top: initial;
            bottom: 35px;
        }

        .left{
            left: calc(50% - 75px);
        }

        .right{
            right: calc(50% - 75px);
        }
    }
</style>
