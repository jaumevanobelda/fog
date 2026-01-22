

import { useQuery } from '@tanstack/react-query'
import {  getGame} from '../../services/gameService'
import type { Game } from '../../types/game'

export function useGame (slug:any) {
  return useQuery<Game>({
  queryKey: ['game',slug], 
  queryFn: () => getGame(slug),

})
}

