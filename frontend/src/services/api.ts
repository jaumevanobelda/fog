import axios from "axios";
import { logout } from "./authService";

const API_CLIENT_SERVER_URL = "http://localhost:3001";
const API_AUTH_URL = "http://localhost:3000";

export const apiClientServer = axios.create({
    baseURL: API_CLIENT_SERVER_URL,
});

export const apiAuth = axios.create({
    baseURL: API_AUTH_URL,
});





const addAuthInterceptor = (apiInstance: any) => {
    apiInstance.interceptors.request.use((config: any) => {
        if (localStorage.getItem("token") != null) {
            config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
        }
        return config;
    });

    apiInstance.interceptors.response.use((response: any) => response,
        (error: any) => {
            console.log("Error ", error);
            const res = error.response;
            if (res.status === 401 && res.data.error === "Expired") {
                console.log("EXPIRED ");
                logout();
            }
            return Promise.reject(error)
        }
    )
}

addAuthInterceptor(apiClientServer);
addAuthInterceptor(apiAuth);
