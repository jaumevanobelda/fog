import { addCollection } from "@/services/libraryService";
import { queryClient } from "@/utils/queryClient";
import { useMutation } from "@tanstack/react-query";


export function useAddCollection() {
    return useMutation({
        mutationFn: addCollection,
        onSuccess(data, variables, onMutateResult, context) {
            queryClient.setQueryData(['getGamesLibrary'], (oldData: any) => ({
                library: [...oldData.library,data.collection]
            }))
        },
    });

}