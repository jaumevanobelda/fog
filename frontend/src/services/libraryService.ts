import { apiClientServer } from "./api";

export async function getGamesLibrary() {
    const res = await apiClientServer.get("library");
    return await res.data;
}   

export async function addCollection(nom:string) {
    const res = await apiClientServer.post("library/collections",{nom});
    return await res.data;
}   