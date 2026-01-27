import { apiClientServer } from "./api";

export async function getGamesLibrary() {
    const res = await apiClientServer.get("library");
    return await res.data;
}   

export async function addCollection(nom:string) {
    const res = await apiClientServer.post("library/collections",{nom});
    return await res.data;
}
export async function removeCollection(collectionId:string) {
    const res = await apiClientServer.delete(`library/collections/${collectionId}`);
    return await res.data;
}

export async function addGameToCollection(collectionId: string, gameId: number) {
    const res = await apiClientServer.put(`library/collections/${collectionId}`, { gameId });
    return await res.data;
}

export async function removeGameFromCollection(collectionId: string, gameId: number) {
    const res = await apiClientServer.delete(`library/collections/${collectionId}/games/${gameId}`);
    return await res.data;
}

export async function moveGameToCollection(fromCollectionId: string, toCollectionId: string, gameId: number) {
    if (fromCollectionId === 'all') {
        return await addGameToCollection(toCollectionId, gameId);
    }
    if (toCollectionId === 'all') {
        return await removeGameFromCollection(fromCollectionId, gameId);
    }
    await removeGameFromCollection(fromCollectionId, gameId);
    return await addGameToCollection(toCollectionId, gameId);
}   