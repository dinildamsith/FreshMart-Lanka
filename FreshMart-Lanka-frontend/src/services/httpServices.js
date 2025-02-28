import axios from "axios";
import toast from "react-hot-toast";

const http = axios.create({
    baseURL: "http://localhost:3000/fresh-mart/api/v1",
    headers: {
        "Content-type": "application/json"
    }
})

// Function to switch headers for file uploads
function setMultipartHeaders() {
    http.defaults.headers["Content-type"] = "multipart/form-data";
}

// Function to switch back to JSON headers
function setJsonHeaders() {
    http.defaults.headers["Content-type"] = "application/json";
}

// Function to set Authorization header
function setAuthHeader(token) {
    http.defaults.headers["Authorization"] = `Bearer ${token}`;
}


//--------------- POST REQUEST ----------------
export const postRequest = async (requestConfig) => {

    const url = requestConfig.url;
    const data = requestConfig.data;
    const contentType = requestConfig.contentType;
    const isAuth = requestConfig.isAuth;

    if (contentType === "multipart") {
        setMultipartHeaders();
    }

    if (contentType === "json") {
        setJsonHeaders();
    }

    if (isAuth) {
        setAuthHeader(localStorage.getItem("token"));
    }

    try {
        const response = await http.post(url, data);

        if (response.status === 200 || response.status === 201) {
            toast.success(response.data.description || 'Request successful');
            return response.data;
        } else {
            toast.error(response.data.error || 'Request failed');
        }

    } catch (error) {
        toast.error(error.response.data.error || 'Request failed');
    }

}

//--------------- GET REQUEST ----------------
export const getRequest = async (requestConfig) => {

    const url = requestConfig.url;
    const isAuth = requestConfig.isAuth;

    if (isAuth) {
        setAuthHeader(localStorage.getItem("token"));
    }

    try {
        const response = await http.get(url);

        if (response.status === 200 || response.status === 201) {
            toast.success(response.data.description || 'Request successful');
            return response.data;
        } else {
            toast.error(response.data.error || 'Request failed');
        }

    } catch (error) {
        toast.error(error.response.data.error || 'Request failed');
    }

}

//--------------- PUT REQUEST ----------------
export const putRequest = async (requestConfig) => {

    const url = requestConfig.url;
    const data = requestConfig.data;
    const contentType = requestConfig.contentType;
    const isAuth = requestConfig.isAuth;

    if (contentType === "multipart") {
        setMultipartHeaders();
    }

    if (contentType === "json") {
        setJsonHeaders();
    }

    if (isAuth) {
        setAuthHeader(localStorage.getItem("token"));
    }

    try {
        const response = await http.put(url, data);

        if (response.status === 200 || response.status === 201) {
            toast.success(response.data.description || 'Request successful');
            return response.data;
        } else {
            toast.error(response.data.error || 'Request failed');
        }

    } catch (error) {
        toast.error(error.response.data.error || 'Request failed');
    }

}

//--------------- DELETE REQUEST ----------------
export const deleteRequest = async (requestConfig) => {

    const url = requestConfig.url;
    const isAuth = requestConfig.isAuth;

    if (isAuth) {
        setAuthHeader(localStorage.getItem("token"));
    }

    try {
        const response = await http.delete(url);

        if (response.status === 200 || response.status === 201) {
            toast.success(response.data.description || 'Request successful');
            return response.data;
        } else {
            toast.error(response.data.error || 'Request failed');
        }

    } catch (error) {
        toast.error(error.response.data.error || 'Request failed');
    }

}