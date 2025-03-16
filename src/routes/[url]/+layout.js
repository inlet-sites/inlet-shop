export const load = async ({fetch, params})=>{
    const apiUrl = import.meta.env.VITE_API_URL;

    let vendor = await fetch(`${apiUrl}/vendor/${params.url}`, {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    });
    vendor = await vendor.json();

    let products = await fetch(`${apiUrl}/product/vendor/${vendor.id}`, {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    });
    products = await products.json();

    return {products, vendor};
}
