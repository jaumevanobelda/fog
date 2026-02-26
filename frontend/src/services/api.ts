import axios from "axios";
import { logout, refresh } from "./authService";
import { queryClient } from "@/utils/queryClient";
const API_CLIENT_SERVER_URL = "http://localhost:4000";
const API_AUTH_URL = "http://localhost:3000/api";

export const apiClientServer = axios.create({
    baseURL: API_CLIENT_SERVER_URL,
});

export const apiAuth = axios.create({
    baseURL: API_AUTH_URL,
    withCredentials: true,
});
let refreshing = false;

const authChannel = new BroadcastChannel("auth");

authChannel.onmessage = (event) => {
    // const  type = event.data;
    switch (event.data.type) {
        case "BEGIN_REFRESHING":
            // console.log("Refresh ",);
            console.log("refreshing ", refreshing);
            console.log("event.data.refreshing ", event.data.refreshing);
            refreshing = event.data.refreshing;
            break;
        case "END_REFRESHING":
            queryClient.invalidateQueries({ queryKey: ["me"] });
            setTimeout(() => {
                refreshing = false;
            }, 5000);
            break;
        case "LOGOUT":
            console.log("LOGOUT");
            queryClient.setQueryData(["me"], null);
            queryClient.removeQueries({ queryKey: ["me"] });
            break;
        case "LOGIN":
            console.log("LOGIN");
            queryClient.invalidateQueries({ queryKey: ["me"] });
            break;
    }
};

export function broadcastAuth(type: string, data?: any) {
    authChannel.postMessage({ type, ...data });
}
const addAuthInterceptor = async (apiInstance: any) => {
    apiInstance.interceptors.request.use((config: any) => {
        if (localStorage.getItem("token") != null) {
            config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
        }
        return config;
    });

    apiInstance.interceptors.response.use((response: any) => response,
        async (error: any) => {
            const res = error.response;
            const originalRequest = error.config;
            // console.log(`Error ${res.status}`, error);
            if (res.status === 401 && !refreshing && !originalRequest._retry) {
                // console.log("BEGIN REFRESHING ", new Date().toISOString().slice(14, 23));

                refreshing = true;
                broadcastAuth("BEGIN_REFRESHING", { refreshing: true });
                if (res.request.responseURL == `${API_AUTH_URL}/auth/refresh`) {
                    console.log("EXPIRED");
                    logout();
                    return Promise.reject(error);
                }

                originalRequest._retry = true;
                let data = await refresh();
                console.log("Refresh  ", data);
                localStorage.setItem('token', data.token);
                if (data.token != null) {
                    refreshing = false;
                    broadcastAuth("END_REFRESHING", { refreshing: false });
                    // console.log("END REFRESHING ", new Date().toISOString().slice(14, 23));
                }

                originalRequest.headers.Authorization = `Bearer ${data.token}`;
                return apiInstance(originalRequest);
            }
            return Promise.reject(error)
        }
    )
}

addAuthInterceptor(apiClientServer);
addAuthInterceptor(apiAuth);
