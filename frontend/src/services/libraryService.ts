import { apiClientServer } from "./api";

export async function getGamesLibrary() {
    const res = await apiClientServer.get("library");
    return await res.data;
}   