export const load = async ({fetch, params})=>{
    const orderUrl = `${import.meta.env.VITE_API_URL}/order/${params.orderId}?token=${params.orderToken}`;
    const orderData = await fetch(orderUrl, {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const order = await orderData.json();

    return {order};
}
