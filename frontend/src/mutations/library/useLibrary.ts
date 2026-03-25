import { addCollection, moveGameToCollection, removeCollection } from "@/services/libraryService";
import { queryClient } from "@/utils/queryClient";
import { useMutation } from "@tanstack/react-query";


export function useAddCollection() {
    return useMutation({
        mutationFn: addCollection,
        onSuccess(data) {
            queryClient.setQueryData(['getGamesLibrary'], (oldData: any) => ({
                library: [...oldData.library, data.collection]
            }))
        },
    });

}


export function useRemoveCollection() {
    return useMutation({
        mutationFn: removeCollection,
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['getGamesLibrary'] });
        },
    });
}

export function useMoveGameToCollection() {
    return useMutation({
        mutationFn: async ({ fromCollectionId, toCollectionId, slug }: {
            fromCollectionId: string;
            toCollectionId: string;
            slug: string
        }) => {
            return await moveGameToCollection(fromCollectionId, toCollectionId, slug);
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['getGamesLibrary'] });
        },
    });
}