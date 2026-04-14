import { useMutation } from '@tanstack/react-query'
import { confirm, login, register } from '../../services/authService'
import { queryClient } from '../../utils/queryClient';
import { toast } from 'sonner';


export function useLogin() {
    return useMutation({
        mutationFn: login,
        onSuccess: (user) => {
            console.log(" Data uselogin ", user);
            localStorage.setItem('token', user.token);
            console.log("DATA USER ",user);
            queryClient.invalidateQueries({ queryKey: ['me'] });
            queryClient.setQueryData(['me'], user);
        }
    })
}
export function useRegister() {
    return useMutation({
        mutationFn: register,
    })
}
export function useConfirm() {
    return useMutation({
        mutationFn: confirm,
        onSuccess: (user) => {
            console.log(" Data uselogin ", user);
            localStorage.setItem('token', user.token);
            console.log("DATA USER ", user);
            queryClient.invalidateQueries({ queryKey: ['me'] });
            queryClient.setQueryData(['me'], user);
            toast.success("Cuenta confirmada");
        },
        onError(error:any) {
            console.log("ERR ",error.response.data.error);
            toast.error(`Ha ocurrido un error al confirmar la cuenta: ${error.response.data.error}`)
            
        },
    })
}