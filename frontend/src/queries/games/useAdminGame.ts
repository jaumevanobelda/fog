import { useQuery } from '@tanstack/react-query'
import { getAdminGame } from '@/services/adminGameService'
import type { Game } from '@/types/game'

export function useAdminGame(slug: string) {
  return useQuery<Game>({
    queryKey: ['admin-game', slug],
    queryFn: () => getAdminGame(slug),
    enabled: !!slug,
  })
}
