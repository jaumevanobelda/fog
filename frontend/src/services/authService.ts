import { apiAuth } from './api'
import { queryClient } from '../utils/queryClient'


export async function login(req: any) {
    const res = await apiAuth.post(`auth/${req.tipo}`, req.user);
    console.log("REs ", res);
    return await res.data;
}

export async function getCurrent() {
    const res = await apiAuth.get("auth/current");
    return res.data;
}

export function logout() {
    console.log("Logout");
    localStorage.removeItem('token');
    queryClient.setQueryData(['me'], null);
    queryClient.removeQueries({ queryKey: ['me'] });
}