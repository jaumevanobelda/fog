
import { GetCart } from '@/services/cartService'
import { useQuery } from '@tanstack/react-query'

export function useGetCart() {
  return useQuery({
    queryKey: ['GetCart'],
    queryFn: GetCart,
    // retry: false,
  })
}
