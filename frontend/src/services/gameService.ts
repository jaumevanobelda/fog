import { apiClientServer } from './api'


export async function getGames() {
    const res = await apiClientServer.get("games");
    console.log("REs ", res);
    return await res.data;
}