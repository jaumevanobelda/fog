import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createGame, updateGame, deleteGame, activateGame } from '@/services/adminGameService'
import { toast } from 'sonner'
import type { GameFormData } from '@/types/game'

export function useCreateGame() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: GameFormData) => createGame(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-games'] })
      queryClient.invalidateQueries({ queryKey: ['games'] })
      toast.success('Juego creado correctamente')
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || error.response?.data?.errors?.nom?.[0] || 'Error al crear el juego'
      toast.error(message)
    },
  })
}

export function useUpdateGame() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: GameFormData }) => updateGame(slug, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-games'] })
      queryClient.invalidateQueries({ queryKey: ['games'] })
      toast.success('Juego actualizado correctamente')
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || error.response?.data?.errors?.nom?.[0] || 'Error al actualizar el juego'
      toast.error(message)
    },
  })
}

export function useDeleteGame() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (slug: string) => deleteGame(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-games'] })
      queryClient.invalidateQueries({ queryKey: ['games'] })
      toast.success('Juego desactivado correctamente')
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Error al desactivar el juego'
      toast.error(message)
    },
  })
}

export function useActivateGame() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (slug: string) => activateGame(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-games'] })
      queryClient.invalidateQueries({ queryKey: ['games'] })
      toast.success('Juego activado correctamente')
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Error al activar el juego'
      toast.error(message)
    },
  })
}
