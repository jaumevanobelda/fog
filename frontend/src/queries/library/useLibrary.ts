import { getGamesLibrary } from '@/services/libraryService'
import { useQuery } from '@tanstack/react-query'

export function useLibrary() {
  return useQuery({
    queryKey: ['getGamesLibrary'],
    queryFn: getGamesLibrary
  })
}
