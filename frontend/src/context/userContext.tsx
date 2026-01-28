import { createContext, useContext } from 'react'
import { useMe } from '../queries/auth/useMe'
import type { User } from '@/types/user'

type  UserState ={
    userLogged: Boolean,
    user?: User
}

const UserContext = createContext<UserState>({
    userLogged: false
})


export function UserProvider({ children }: { children: React.ReactNode }) {
    const { data } = useMe();
    let user = null;
    if(data){
        user = data.usuari;
    }
    
    const value = {
        userLogged: !!data,
        user
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);