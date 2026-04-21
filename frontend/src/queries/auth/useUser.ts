
import { getFriendRequests, getFriends, getSendedFriendRequests, getUsers } from '@/services/authService'
import type { User } from '@/types/user'
import { useQuery } from '@tanstack/react-query'

export function useGetUsers() {
  return useQuery({
    queryKey: ['GetUsers'],
    queryFn: getUsers,
  })
}

export function useFriends() {
  return useQuery<User[]>({
    queryKey: ['Friends'],
    queryFn: getFriends,
    staleTime:30000
  })
}

export function useFriendRequests() {
  return useQuery<User[]>({
    queryKey: ['FriendRequests'],
    queryFn: getFriendRequests,
    staleTime:30000
  })
}

export function useSendedFriendRequests() {
  return useQuery<User[]>({
    queryKey: ['SendedFriendRequests'],
    queryFn: getSendedFriendRequests,
  })
}

