import { useUser } from '@/context/userContext';
import './UserCard.css'
import type { User } from '@/types/user';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export default function UserCard({ user }: { user: User }) {
    const { userLogged, user: Loggeduser } = useUser();
    const userSame = (user.username === Loggeduser?.username)

    return (<>

        <div>
            <Avatar>
                <AvatarImage src={user.image} alt={user.username} />
                <AvatarFallback>{user.username} </AvatarFallback>
            </Avatar>
            <h2>{user.username}</h2>

        </div>
    </>
    )
}