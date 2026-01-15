import axios from "axios";

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
        config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
        return config;
    })
}

addAuthInterceptor(apiClientServer);
addAuthInterceptor(apiAuth);
