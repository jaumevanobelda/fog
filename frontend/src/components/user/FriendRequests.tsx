import { useFriendRequests } from "@/queries/auth/useUser";
import { toast } from "sonner";
import UserCard from "./UserCard";
import { Button } from "../ui/button";
import { useAcceptFriendRequest, useRejectFriendRequest } from "@/mutations/auth/useUser";
import { ScrollArea } from "@radix-ui/react-scroll-area";


export default function FriendRequests() {

    const { data: friendRequests, isLoading, error } = useFriendRequests();
    const { mutate: acceptRequest } = useAcceptFriendRequest();
    const { mutate: rejectRequest } = useRejectFriendRequest();
    console.log("DATA ", friendRequests);

    if (isLoading) return <p>Cargando...</p>

    if (error) {
        console.log("Error ", error);
        toast.error("Ha ocurrido un problema al cargar los solicitudes de amistad");
    }

    return (
        <>
            <ScrollArea>
                <div>
                    {friendRequests?.map((friendrequest) => {
                        return <div key={friendrequest.username}>
                            <UserCard user={friendrequest}  />
                            <Button onClick={() => acceptRequest(friendrequest.username)}>Aceptar</Button>
                            <Button onClick={() => rejectRequest(friendrequest.username)}>Rechazar</Button>
                        </div>
                    })}
                </div>
            </ScrollArea>

        </>
    )





}