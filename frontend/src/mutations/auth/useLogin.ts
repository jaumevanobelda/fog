import { useMutation } from '@tanstack/react-query'
import { login } from '../../services/authService'
import { queryClient } from '../../utils/queryClient';


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