
import { useQuery } from '@tanstack/react-query'
import { getCurrent } from '../../services/authService'

export function useMe() {
  return useQuery({
    queryKey: ['me'],
    queryFn: getCurrent,
    retry: false
  })
}
