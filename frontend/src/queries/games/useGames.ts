

import { useQuery } from '@tanstack/react-query'
import { getGames } from '../../services/gameService'
import type { Game } from '../../types/game'
import type { Filter } from '@/types/filter'

export function useGames(filters: Filter,page:number,limit:number) {
  return useQuery<{games:Game[],total:number}>({
    queryKey: ['games',filters,page,limit],
    queryFn: () => getGames(filters,page,limit),
  })
}

