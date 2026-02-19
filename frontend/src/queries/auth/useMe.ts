
import { useQuery } from '@tanstack/react-query'
import { getCurrent } from '../../services/authService'
import type { User } from '@/types/user'

export function useMe() {
  return useQuery<User>({
    queryKey: ['me'],
    queryFn: getCurrent,
    retry: false,
    staleTime: 1000 * 60 * 5
  })
}
