

import { useQuery } from '@tanstack/react-query'
import {  getGame, getGameById} from '../../services/gameService'
import type { Game } from '../../types/game'

export function useGame (slug:string) {
  return useQuery<Game>({
  queryKey: ['game',slug], 
  queryFn: () => getGame(slug),

})
}

export function useGameById (id:number) {
  return useQuery<Game>({
  queryKey: ['game',id], 
  queryFn: () => getGameById(id),

})
}

