import { useQuery } from '@tanstack/react-query'
import { getCategories } from '@/services/categoryService'
import type { Categoria } from '@/types/categoria'

export function useCategories() {
  return useQuery<Categoria[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
  })
}
