import { useFriendRequests } from "@/queries/auth/useUser";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useAcceptFriendRequest, useRejectFriendRequest } from "@/mutations/auth/useUser";
import { CheckIcon, XIcon, InboxIcon, Loader2Icon } from "lucide-react";


export default function FriendRequests() {

    const { data: friendRequests, isLoading, error } = useFriendRequests();
    const { mutate: acceptRequest } = useAcceptFriendRequest();
    const { mutate: rejectRequest } = useRejectFriendRequest();
    console.log("DATA ", friendRequests);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-6">
                <Loader2Icon className="h-5 w-5 text-blue-500 animate-spin" />
            </div>
        )
    }

    if (error) {
        console.log("Error ", error);
        toast.error("Ha ocurrido un problema al cargar las solicitudes de amistad");
        return (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
                <p className="text-red-400 text-xs">Error al cargar solicitudes</p>
            </div>
        )
    }

    if (!friendRequests || friendRequests.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-6 text-center">
                <InboxIcon className="h-8 w-8 text-gray-600 mb-2" />
                <p className="text-gray-400 text-sm font-medium">Sin solicitudes pendientes</p>
                <p className="text-gray-500 text-xs mt-1">Las nuevas solicitudes aparecerán aquí</p>
            </div>
        )
    }

    return (
        <div className="space-y-2">
            {friendRequests.map((friendrequest) => (
                <div 
                    key={friendrequest.username}
                    className="flex items-center gap-2 p-2 rounded-lg bg-gray-800/30"
                >
                    <Avatar className="h-9 w-9 border border-gray-600 shrink-0">
                        <AvatarImage src={friendrequest.image} alt={friendrequest.username} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-semibold">
                            {friendrequest.username?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-white truncate">{friendrequest.username}</h3>
                    </div>
                    
                    <div className="flex items-center gap-1">
                        <Button 
                            size="icon"
                            onClick={() => acceptRequest(friendrequest.username)}
                            className="bg-green-600 hover:bg-green-700 text-white h-7 w-7"
                        >
                            <CheckIcon className="h-4 w-4" />
                        </Button>
                        <Button 
                            size="icon"
                            variant="outline"
                            onClick={() => rejectRequest(friendrequest.username)}
                            className="border-red-500/50 text-red-400 hover:bg-red-500/20 hover:text-red-300 h-7 w-7"
                        >
                            <XIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    )
}