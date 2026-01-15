import { apiClientServer } from './api'


export async function getGames() {
    const res = await apiClientServer.get("games");
    return await res.data;
}   