

import { useQuery } from '@tanstack/react-query'
import { getCategorias, getGame, getGameById, getMaxPrecio } from '../../services/gameService'
import type { Game } from '../../types/game'
import type { Categoria } from '@/types/categoria'

export function useGame(slug: string) {
  return useQuery<Game>({
    queryKey: ['game', slug],
    queryFn: () => getGame(slug),

  })
}
export function useGameCategorias(){
    return useQuery<Array<Categoria>>({
      queryKey: ['gameCategorias'],
      queryFn: () => getCategorias(),

  })
}
export function useMaxPrecioGame(){
    return useQuery<number>({
      queryKey: ['maxPrecioGame'],
      queryFn: () => getMaxPrecio(),
  })
}
export function useGameById(id: number) {
  return useQuery<Game>({
    queryKey: ['game', id],
    queryFn: () => getGameById(id),

  })
}

