import { Navigate, Outlet } from 'react-router-dom'
import { useMe } from '../queries/auth/useMe'
import { toast } from 'sonner';
import Loading from '@/components/ui/loading';


export default function Unlogged() {
    const { data: user, isLoading } = useMe()

    if (isLoading) return <Loading/>

    if (user) {
        return <Navigate to="/" replace />
    }
    return <Outlet />
    // return children
    // return <>{children} </>

}