import { useUser } from '@/context/userContext';
import './UserCard.css'
import type { User } from '@/types/user';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useFriends, useSendedFriendRequests } from '@/queries/auth/useUser';
import { Button } from '../ui/button';
import { useSendFriendRequest } from '@/mutations/auth/useUser';

export default function UserCard({ user }: { user: User }) {
    const { userLogged, user: Loggeduser } = useUser();
    const { data: friends } = useFriends();
    const userSame = (user.username === Loggeduser?.username);
    const {mutate:sendFriendRequest} = useSendFriendRequest();
     const {data:sendedFriendRequests} = useSendedFriendRequests();

    return (<>

        <div>
            <Avatar>
                <AvatarImage src={user.image} alt={user.username} />
                <AvatarFallback>{user.username} </AvatarFallback>
            </Avatar>
            <h2>{user.username}</h2>
            {friend()}
        </div>
    </>
    )

    function friend() {

        if (userSame) return <></>
        if(!userLogged) return <></>
        if (sendedFriendRequests?.some((friend: User) => friend.username === user?.username || "")) return <p>Solicitud de amistad enviada</p>

        if (friends?.some((friend: User) => friend.username === user?.username || "")) {
            return <p>amigo</p>
        } else {
            return <Button onClick={()=>sendFriendRequest(user.username)}> Añadir a amigos</Button>
        }
    }
}