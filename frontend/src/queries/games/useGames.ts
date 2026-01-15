

import { useQuery } from '@tanstack/react-query'
import {  getGames} from '../../services/gameService'
import type { Game } from '../../types/game'

export function useGames () {
  return useQuery<Game[]>({
  queryKey: ['games'], 
  queryFn: getGames,
//   keepPreviousData: true
})
}

