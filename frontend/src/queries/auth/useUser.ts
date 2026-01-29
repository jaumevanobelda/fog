
import { getFriendRequests, getFriends, getSendedFriendRequests } from '@/services/authService'
import type { User } from '@/types/user'
import { useQuery } from '@tanstack/react-query'

export function useFriends() {
  return useQuery<User[]>({
    queryKey: ['Friends'],
    queryFn: getFriends,
  })
}

export function useFriendRequests() {
  return useQuery<User[]>({
    queryKey: ['FriendRequests'],
    queryFn: getFriendRequests,
  })
}

export function useSendedFriendRequests() {
  return useQuery<User[]>({
    queryKey: ['SendedFriendRequests'],
    queryFn: getSendedFriendRequests,
  })
}

