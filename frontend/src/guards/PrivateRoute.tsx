import { Navigate, Outlet } from 'react-router-dom'
import { useMe } from '../queries/auth/useMe'
import { toast } from 'sonner';
import Loading from '@/components/ui/loading';


export default function PrivateRoute() {
    const { data: user, isLoading } = useMe()

    if (isLoading) {
        return <> <Loading/> </>
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