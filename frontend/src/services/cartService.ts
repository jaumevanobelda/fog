import { apiClientServer } from "./api";

export async function addToCart(id:number) {
    const res = await apiClientServer.post(`cart`,{gameId:id});
    return await res.data;
}   

export async function GetCart() {
    const res = await apiClientServer.get('cart');
    return await res.data;
}

export async function removeFromCart(id:number) {
    const res = await apiClientServer.delete(`cart/${id}`);
    return await res.data;
}

export async function clearCart() {
    const res = await apiClientServer.delete('cart');
    return await res.data;
}   