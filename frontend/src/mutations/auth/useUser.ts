import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../../utils/queryClient';
import { acceptFriendRequest, rejectFriendRequest, sendFriendRequest } from '@/services/authService';
import { toast } from 'sonner';

export function useAcceptFriendRequest() {
    return useMutation({
        mutationFn: acceptFriendRequest,
        onSuccess() { queryClient.invalidateQueries({ queryKey: ['FriendRequests'] }) },
        onError(error) {
            console.log("Error ", error);
            toast.error("Ha ocurrido un error");
        },
    });
}
export function useRejectFriendRequest() {
    return useMutation({
        mutationFn: rejectFriendRequest,
        onSuccess() { queryClient.invalidateQueries({ queryKey: ['FriendRequests'] }) },
        onError(error) {
            console.log("Error ", error);
            toast.error("Ha ocurrido un error");
        },
    });

}

export function useSendFriendRequest() {
    return useMutation({
        mutationFn: sendFriendRequest,
        onSuccess(data) {
            console.log("data ",data);
            toast.success(data.message || "Solicitud enviada");
            queryClient.invalidateQueries({ queryKey: ['Friends'] });
            queryClient.invalidateQueries({ queryKey: ['SendedFriendRequests'] });
        },
        onError(error:any) {
            console.log("Error ", error);
            toast.error(error.response?.data.error || "Ha ocurrido un error");
        },
    });

}


