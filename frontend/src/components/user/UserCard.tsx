import { useUser } from '@/context/userContext';
import type { User } from '@/types/user';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useFriends, useSendedFriendRequests } from '@/queries/auth/useUser';
import { Button } from '../ui/button';
import { useSendFriendRequest } from '@/mutations/auth/useUser';
import { UserPlusIcon, UserCheckIcon, ClockIcon } from 'lucide-react';

export default function UserCard({ user}: { user: User}) {
    const { userLogged, user: Loggeduser } = useUser();
    const { data: friends } = useFriends();
    const userSame = (user.username === Loggeduser?.username);
    const {mutate:sendFriendRequest} = useSendFriendRequest();
    const {data:sendedFriendRequests} = useSendedFriendRequests();

    return (
        <div className={`flex items-center gap-3 p-3  w-fit`}>
            
            <Avatar className="h-11 w-11 border-2 border-gray-600 shrink-0">
                <AvatarImage src={user.image} alt={user.username} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                    {user.username?.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            
            
            <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-white truncate">{user.username}</h2>
            </div>
            
            
            {friend()}
        </div>
    )

    function friend() {
        if (userSame) return null;
        if (!userLogged) return null;
        
        if (sendedFriendRequests?.some((friend: User) => friend.username === user?.username || "")) {
            return (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30">
                    <ClockIcon className="h-3.5 w-3.5 text-yellow-500" />
                    <span className="text-xs font-medium text-yellow-500">Pendiente</span>
                </div>
            )
        }

        if (friends?.some((friend: User) => friend.username === user?.username || "")) {
            return (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30">
                    <UserCheckIcon className="h-3.5 w-3.5 text-green-500" />
                    <span className="text-xs font-medium text-green-500">Amigo</span>
                </div>
            )
        } else {
            return (
                <Button 
                    size="sm"
                    variant="outline"
                    onClick={() => sendFriendRequest(user.username)}
                    className="border-blue-500/50 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300 h-8"
                >
                    <UserPlusIcon className="h-4 w-4 mr-1.5" />
                    Añadir
                </Button>
            )
        }
    }
}