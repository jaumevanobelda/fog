import { apiAuth } from './api'
import { queryClient } from '../utils/queryClient'


export async function login(req: any) {
    const res = await apiAuth.post(`auth/${req.tipo}`, req.user);
    console.log("REs ", res);
    return await res.data;
}

export async function getCurrent() {
    if (localStorage.getItem("token") != null) {
        const res = await apiAuth.get("auth/current");
        return res.data;
    } else {
        return null;
    }

}

export function logout() {
    console.log("Logout");
    localStorage.removeItem('token');
    queryClient.setQueryData(['me'], null);
    queryClient.removeQueries({ queryKey: ['me'] });
}


export async function getFriends() {
    const res = await apiAuth.get("auth/friends");
    return res.data;
}

export async function getFriendRequests() {
    const res = await apiAuth.get("auth/friends/request");
    return res.data;
}
export async function getSendedFriendRequests() {
    const res = await apiAuth.get("auth/friends/request/sended");
    return res.data;
}
export async function sendFriendRequest(username:string) {
    const res = await apiAuth.post(`auth/friends/request/send/${username}`);
    return res.data;
}

export async function acceptFriendRequest(username:string) {
    const res = await apiAuth.post(`auth/friends/request/accept/${username}`);
    return res.data;
}

export async function rejectFriendRequest(username:string) {
    const res = await apiAuth.post(`auth/friends/request/reject/${username}`);
    return res.data;
}
