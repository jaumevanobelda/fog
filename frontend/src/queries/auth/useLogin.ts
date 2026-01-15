import { useMutation } from '@tanstack/react-query'
import { login } from '../../services/authService'
import { queryClient } from '../../utils/queryClient';


export function useLogin() {
    return useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            console.log(" Dataa ", data);
            localStorage.setItem('token', data.user.token);
            queryClient.setQueryData(['me'], data.user)
        }
    })
}