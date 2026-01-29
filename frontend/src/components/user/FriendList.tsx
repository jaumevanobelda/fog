import { useFriends } from "@/queries/auth/useUser";
import { toast } from "sonner";
import UserCard from "./UserCard";
import { ScrollArea } from "@radix-ui/react-scroll-area";


export default function FriendList() {

    const { data: friends, isLoading, error } = useFriends();
    console.log("DATA ", friends);

    if (isLoading) return <p>Cargando...</p>

    if (error) {
        console.log("Error ", error);
        toast.error("Ha ocurrido un problema al cargar los amigos");
    }

    return (
        <>
            <ScrollArea>
                <div>
                    {friends?.map((friend) => {
                        return <div key={friend.username}>
                            <UserCard user={friend}  />
                        </div>
                    })}
                </div>
            </ScrollArea>
        </>
    )





}