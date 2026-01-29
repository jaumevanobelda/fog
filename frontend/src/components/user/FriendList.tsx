import { useFriends } from "@/queries/auth/useUser";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UsersIcon } from "lucide-react";
import Loading from "../ui/loading";


export default function FriendList() {

    const { data: friends, isLoading, error } = useFriends();
    console.log("DATA ", friends);

    if (isLoading) return <Loading/>

    if (error) {
        console.log("Error ", error);
        toast.error("Ha ocurrido un problema al cargar los amigos");
        return (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
                <p className="text-red-400 text-xs">Error al cargar amigos</p>
            </div>
        )
    }

    if (!friends || friends.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-6 text-center">
                <UsersIcon className="h-8 w-8 text-gray-600 mb-2" />
                <p className="text-gray-400 text-sm font-medium">No tienes amigos aún</p>
                <p className="text-gray-500 text-xs mt-1">¡Añade amigos para verlos aquí!</p>
            </div>
        )
    }

    return (
        <div className="space-y-2">
            {friends.map((friend) => (
                <div 
                    key={friend.username}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
                >
                    <Avatar className="h-9 w-9 border border-gray-600 shrink-0">
                        <AvatarImage src={friend.image} alt={friend.username} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-semibold">
                            {friend.username?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-white truncate">{friend.username}</span>
                </div>
            ))}
        </div>
    )
}