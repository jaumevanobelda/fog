import { useQuery } from '@tanstack/react-query'
import { getCategory } from '@/services/categoryService'
import type { Categoria } from '@/types/categoria'

export function useCategory(slug: string) {
  return useQuery<Categoria>({
    queryKey: ['category', slug],
    queryFn: () => getCategory(slug),
    enabled: !!slug,
  })
}
