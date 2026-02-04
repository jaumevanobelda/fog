import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCategory, updateCategory, deleteCategory, activateCategory,  } from '@/services/categoryService'
import { toast } from 'sonner'

export function useCreateCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: {nom:string}) => createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast.success('Categoría creada correctamente')
    },
    onError: (error: any) => {
      const message = error.response?.data?.errors?.nom?.[0] || error.response?.data?.error || 'Error al crear la categoría'
      toast.error(message)
    },
  })
}

export function useUpdateCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: {nom:string} }) => updateCategory(slug, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast.success('Categoría actualizada correctamente')
    },
    onError: (error: any) => {
      const message = error.response?.data?.errors?.nom?.[0] || error.response?.data?.error || 'Error al actualizar la categoría'
      toast.error(message)
    },
  })
}

export function useDeleteCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (slug: string) => deleteCategory(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast.success('Categoría desactivada correctamente')
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Error al desactivar la categoría'
      toast.error(message)
    },
  })
}

export function useActivateCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (slug: string) => activateCategory(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast.success('Categoría activada correctamente')
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Error al activar la categoría'
      toast.error(message)
    },
  })
}
