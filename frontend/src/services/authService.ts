import { apiAuth, broadcastAuth } from './api'
import { queryClient } from '../utils/queryClient'

function getDeviceId(): string {
    let deviceId = localStorage.getItem('device_id');
    if (!deviceId) {
        deviceId = crypto.randomUUID();
        localStorage.setItem('device_id', deviceId);
    }
    return deviceId;
}

export async function login(user: any) {
    const res = await apiAuth.post(`auth/login`, { ...user, device_id: getDeviceId() });
    console.log("REs ", res);
    broadcastAuth("LOGIN");
    return await res.data;
}
export async function register(user: any) {
    const res = await apiAuth.post(`auth/register`, user );
    console.log("REs ", res);
    return await res.data;
}
export async function confirm(confirm_token: string) {
    const res = await apiAuth.post("auth/confirm", { confirm_token, device_id: getDeviceId() });
    console.log("REs ", res);
    console.log("Confirm login");
    
    broadcastAuth("LOGIN");
    return await res.data;
}

export async function getCurrent() {
    // console.log("TOKEN ", localStorage.getItem("token"));

    if (localStorage.getItem("token") != null) {
        const res = await apiAuth.get("auth/current");
        return res.data;
    } else {
        return null;
    }
}
export async function refresh() {
    const res = await apiAuth.post("auth/refresh");
    return res.data;
}

export async function logout() {
    console.log("Logout");
    try {
        const res = await apiAuth.post("auth/logout",{device_id:getDeviceId()});
        queryClient.setQueryData(['me'], null);
        queryClient.removeQueries({ queryKey: ['me'] });
        localStorage.removeItem('token');
        broadcastAuth("LOGOUT");
        return res.data;
    } catch (error) {
        console.log("Error logout", error);
        queryClient.setQueryData(['me'], null);
        queryClient.removeQueries({ queryKey: ['me'] });
        localStorage.removeItem('token');
        broadcastAuth("LOGOUT");
    }

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
export async function sendFriendRequest(username: string) {
    const res = await apiAuth.post(`auth/friends/request/send/${username}`);
    return res.data;
}

export async function acceptFriendRequest(username: string) {
    const res = await apiAuth.post(`auth/friends/request/accept/${username}`);
    return res.data;
}

export async function rejectFriendRequest(username: string) {
    const res = await apiAuth.post(`auth/friends/request/reject/${username}`);
    return res.data;
}
