

import { useQuery } from '@tanstack/react-query'
import { getGames } from '../../services/gameService'
import type { Game } from '../../types/game'
import type { Filter } from '@/types/filter'

export function useGames(filters: Filter) {
  return useQuery<Game[]>({
    queryKey: ['games',filters],
    queryFn: () => getGames(filters),
    //   keepPreviousData: true
  })
}

