import { CreateCheckoutSession, ConfirmOrder, CancelOrder } from '@/services/orderService';
import { useMutation } from '@tanstack/react-query'

export function useCreateCheckoutSession() {
  return useMutation({
    mutationFn: CreateCheckoutSession,
  });
}

export function useConfirmOrder() {
  return useMutation({
    mutationFn: ConfirmOrder,
  });
}
export function useCancelOrder() {
  return useMutation({
    mutationFn: CancelOrder,
  });
}