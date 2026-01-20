import { apiClientServer } from './api'


export async function getGames() {
    const res = await apiClientServer.get("games");
    return await res.data;
}   

export async function getGame(slug:string) {
    const res = await apiClientServer.get(`games/${slug}`);
    return await res.data;
}   

