import { apiAuth } from './api'
import type { Game, GameFormData } from '@/types/game'



export async function getAdminGames(): Promise<Game[]> {
  const res = await apiAuth.get('game')
  return res.data
}

export async function getAdminGame(slug: string): Promise<Game> {
  const res = await apiAuth.get(`game/${slug}`)
  return res.data
}

export async function createGame(data: GameFormData): Promise<Game> {
  const res = await apiAuth.post('game', { game: data })
  return res.data
}

export async function updateGame(slug: string, data: GameFormData): Promise<Game> {
  const res = await apiAuth.put(`game/${slug}`, { game: data })
  return res.data
}

export async function deleteGame(slug: string): Promise<void> {
  await apiAuth.delete(`game/${slug}`)
}

export async function activateGame(slug: string): Promise<void> {
  await apiAuth.put(`game/activate/${slug}`)
}
