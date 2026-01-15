import { Navigate, Outlet } from 'react-router-dom'
import { useMe } from '../queries/auth/useMe'


export default function PrivateRoute() {
    const { data: user, isLoading } = useMe()
    
    if(isLoading) {
        return <> <p>Cargando</p> </>
    }
    console.log("USER ",user);
    
    if(!user) return <Navigate to="/auth/login" replace />

    return <Outlet />
    // return children
    // return <>{children} </>

}