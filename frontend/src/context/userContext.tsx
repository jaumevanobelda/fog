import { createContext, useContext } from 'react'
import { useMe } from '../queries/auth/useMe'

type  UserState ={
    userLogged: Boolean,
    user?: Object
}

const UserContext = createContext<UserState>({
    userLogged: false
})


export function UserProvider({ children }: { children: React.ReactNode }) {
    const { data } = useMe();
    const value = {
        userLogged: !!data,
        user: data
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);