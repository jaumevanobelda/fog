import axios from "axios";

const API_RUBY_URL = "http://localhost:3000";
const API_AUTH_URL = "http://localhost:3000";

export const apiGame = axios.create({
    baseURL: API_RUBY_URL,
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

addAuthInterceptor(apiGame);
addAuthInterceptor(apiAuth);
