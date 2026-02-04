import { useQuery } from '@tanstack/react-query'
import { getAdminGames } from '@/services/adminGameService'
import type { Game } from '@/types/game'

export function useAdminGames() {
  return useQuery<Game[]>({
    queryKey: ['admin-games'],
    queryFn: getAdminGames,
  })
}
