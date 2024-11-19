export const load = async ({fetch, params})=>{
    let vendor = await fetch(`${import.meta.env.VITE_API_URL}/vendor/${params.url}`, {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    });
    vendor = await vendor.json();

    let products = await fetch(`${import.meta.env.VITE_API_URL}/product/vendor/${vendor.id}`, {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    });
    products = await products.json();

    return {products, vendor};
}
