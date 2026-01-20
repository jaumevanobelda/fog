import { CreateOrder } from '@/services/orderService';
import { useMutation } from '@tanstack/react-query'


export function useCreateOrder() {
  return useMutation({
    mutationFn: CreateOrder,
  });
}