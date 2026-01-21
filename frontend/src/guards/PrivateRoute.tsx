import { Navigate, Outlet } from 'react-router-dom'
import { useMe } from '../queries/auth/useMe'
import { toast } from 'sonner';


export default function PrivateRoute() {
    const { data: user, isLoading } = useMe()

    if (isLoading) {
        return <> <p>Cargando</p> </>
    }
    console.log("USER ", user);

    if (!user) {
        toast.error("Inicia sesion para poder acceder a esta pagina");
        return <Navigate to="/auth/login" replace />
    }
    return <Outlet />
    // return children
    // return <>{children} </>

}