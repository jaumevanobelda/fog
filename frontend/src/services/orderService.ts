import { apiAuth } from './api'

export async function CreateOrder(games:Array<number>) {
    const res = await apiAuth.post(`order`,{games});
    return await res.data;
}   