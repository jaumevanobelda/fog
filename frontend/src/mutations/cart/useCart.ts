import { useMutation } from '@tanstack/react-query'
import { addToCart, removeFromCart, clearCart } from '@/services/cartService';
import { queryClient } from '../../utils/queryClient';

export function useAddToCart() {
  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => {queryClient.invalidateQueries({ queryKey: ['GetCart'] })},
  });
}

export function useRemoveFromCart() {
  return useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['GetCart'] }),
  });
}

export function useClearCart() {
  return useMutation({
    mutationFn: clearCart,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['GetCart'] }),
  });
}
