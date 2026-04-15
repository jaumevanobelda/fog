import { createReview, removeReview } from '@/services/reviewService';
import { queryClient } from '@/utils/queryClient';
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner';

export function useCreateReview() {
  return useMutation({
    mutationFn: createReview,
    onSuccess(data) {
      console.log("DATA ", data);
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['Reviews', data.slug], });
      queryClient.invalidateQueries({ queryKey: ['game', data.slug] });
    }
  });
}

export function useRemoveReview() {
  return useMutation({
    mutationFn: removeReview,
    onSuccess(data) {
      console.log("DATA ", data);
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['Reviews', data.slug] });
      queryClient.invalidateQueries({ queryKey: ['game', data.slug] });

    }
  });
}
