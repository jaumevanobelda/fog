import { apiAuth } from './api'

export async function CreateCheckoutSession(games: Array<number>) {
    const res = await apiAuth.post(`order/checkout`, { games });
    return res.data;
}

export async function ConfirmOrder(sessionId: string) {
    const res = await apiAuth.post(`order/confirm`, { sessionId });
    return res.data;
}