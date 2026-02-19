import { Navigate, Outlet } from 'react-router-dom'
import { useMe } from '../queries/auth/useMe'
import { toast } from 'sonner';
import Loading from '@/components/ui/loading';


export default function PrivateRoute({ allowedRoles = [] }: { allowedRoles?: string[] }) {
    const { data: user, isLoading } = useMe()

    if (isLoading) return <Loading/>
    
    console.log("USER ", user);
    console.log("",allowedRoles.includes(user?.role!));
    

    if (!user) {
        toast.error("Inicia sesion para poder acceder a esta pagina");
        return <Navigate to="/auth/login" replace />
    }
    if(allowedRoles.length != 0 &&  !allowedRoles.includes(user.role!)){
        toast.error("No tienes permiso para acceder a esta pagina");
        return <Navigate to="/" replace />
    }
    return <Outlet />
    // return children
    // return <>{children} </>

}