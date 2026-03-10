import { apiAuth } from "./api";

export async function addToCart(slug:string) {
    const res = await apiAuth.put(`cart`,{slug});
    return await res.data;
}   

export async function GetCart() {
    const res = await apiAuth.get('cart');
    return await res.data;
}

export async function removeFromCart(slug:string) {
    const res = await apiAuth.delete(`cart/${slug}`);
    return await res.data;
}

export async function clearCart() {
    const res = await apiAuth.delete('cart');
    return await res.data;
}   