import axios, { AxiosInstance, AxiosResponse } from "axios";
import toast from "react-hot-toast";

interface RequestConfig<T = any> {
    url: string;
    data?: T;
    contentType?: "json" | "multipart";
    isAuth?: boolean;
}

interface ApiResponse<T = any> {
    description?: string;
    data?: T;
    error?: string;
}

const http: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000/fresh-mart/api/v1",
    headers: {
        "Content-type": "application/json"
    }
});

function setMultipartHeaders() {
    http.defaults.headers["Content-type"] = "multipart/form-data";
}

function setJsonHeaders() {
    http.defaults.headers["Content-type"] = "application/json";
}

function setAuthHeader(token: string | null) {
    if (token) {
        http.defaults.headers["Authorization"] = `Bearer ${token}`;
    }
}

export const postRequest = async <T>(requestConfig: RequestConfig): Promise<ApiResponse<T> | undefined> => {
    const { url, data, contentType, isAuth } = requestConfig;

    if (contentType === "multipart") setMultipartHeaders();
    if (contentType === "json") setJsonHeaders();
    if (isAuth) setAuthHeader(localStorage.getItem("token"));

    try {
        const response: AxiosResponse<ApiResponse<T>> = await http.post(url, data);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
};

export const getRequest = async <T>(requestConfig: RequestConfig): Promise<ApiResponse<T> | undefined> => {
    const { url, isAuth } = requestConfig;
    if (isAuth) setAuthHeader(localStorage.getItem("token"));

    try {
        const response: AxiosResponse<ApiResponse<T>> = await http.get(url);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
};

export const putRequest = async <T>(requestConfig: RequestConfig): Promise<ApiResponse<T> | undefined> => {
    const { url, data, contentType, isAuth } = requestConfig;

    if (contentType === "multipart") setMultipartHeaders();
    if (contentType === "json") setJsonHeaders();
    if (isAuth) setAuthHeader(localStorage.getItem("token"));

    try {
        const response: AxiosResponse<ApiResponse<T>> = await http.put(url, data);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
};

export const deleteRequest = async <T>(requestConfig: RequestConfig): Promise<ApiResponse<T> | undefined> => {
    const { url, isAuth } = requestConfig;
    if (isAuth) setAuthHeader(localStorage.getItem("token"));

    try {
        const response: AxiosResponse<ApiResponse<T>> = await http.delete(url);
        return handleResponse(response);
    } catch (error) {
        handleError(error);
    }
};

function handleResponse<T>(response: AxiosResponse<ApiResponse<T>>): ApiResponse<T> {
    if (response.status === 200 || response.status === 201) {
        toast.success(response.data.description || 'Request successful');
        return response.data;
    } else {
        toast.error(response.data.description || 'Request failed');
        console.log(response)
        throw new Error(response.data.description || 'Request failed');
    }
}

function handleError(error: any) {
    const message = error?.response?.data?.description|| 'Request failed';
    toast.error(message);
    throw new Error(message);
}

// Let me know if you want me to tweak anything or add more features! 🚀
