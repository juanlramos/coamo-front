import { AxiosError } from "axios";

export const errorInterceptor = (error: AxiosError) => {
    if(error.code === "Network Error") {
        return Promise.reject(new Error("Erro de Conexão"));
    }

    if(error.response?.status === 401) {
        //
    }

    return Promise.reject(error);
        
}