import { useMutation } from '@tanstack/react-query'
import { login } from '../../services/authService'
import { queryClient } from '../../utils/queryClient';


export function useLogin() {
    return useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            console.log(" Data uselogin ", data);
            localStorage.setItem('token', data.user.token);
            console.log("DATA USER ",data.user);
            queryClient.invalidateQueries({ queryKey: ['me'] });
            queryClient.setQueryData(['me'], data.user);
        }
    })
}