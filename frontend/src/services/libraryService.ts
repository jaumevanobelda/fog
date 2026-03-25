import { apiClientServer } from "./api";

export async function getGamesLibrary() {
    const res = await apiClientServer.get("library/");
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

export async function addGameToCollection(collectionId: string, slug: string) {
    const res = await apiClientServer.put(`library/collections/${collectionId}`, { slug });
    return await res.data;
}

export async function removeGameFromCollection(collectionId: string, slug: string) {
    const res = await apiClientServer.delete(`library/collections/${collectionId}/games/${slug}`);
    return await res.data;
}

export async function moveGameToCollection(fromCollectionId: string, toCollectionId: string, slug: string) {
    if (fromCollectionId === 'all') {
        return await addGameToCollection(toCollectionId, slug);
    }
    if (toCollectionId === 'all') {
        return await removeGameFromCollection(fromCollectionId, slug);
    }
    await removeGameFromCollection(fromCollectionId, slug);
    return await addGameToCollection(toCollectionId, slug);
}   