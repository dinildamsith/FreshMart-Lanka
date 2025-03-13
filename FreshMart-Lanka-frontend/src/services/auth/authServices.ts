import {getRequest, postRequest, putRequest} from "../httpServices.ts";
import {PROFILE_DETAILS_GET_URL, PROFILE_IMAGE_UPLOAD_URL, SIGN_IN_URL, SIGN_UP_URL} from "../url.ts";

// Define the type for the signup data
interface SignUpData {
    firstName: string,
    lastName:string,
    email: string,
    role: string,
    password: string
}

// Define the type for the signin  data
interface SignInData {
    email: string,
    password: string
}

export const signUp = (data: SignUpData): Promise<any> => {
    return postRequest({
        url: SIGN_UP_URL,
        data: data,
        contentType: "json",
        isAuth: false
    });
};


export const signIn = (data: SignInData): Promise<any> => {
    return postRequest({
        url: SIGN_IN_URL,
        data: data,
        contentType: 'json',
        isAuth: false
    })
}


export const profileImageUpdate = (data: any): Promise<any> => {
    return putRequest({
        url: PROFILE_IMAGE_UPLOAD_URL + data.userEmail,
        data: data,
        contentType: 'json',
        isAuth: true
    })
}

export const getUser = (email: any): Promise<any> => {
    return getRequest({
        url: PROFILE_DETAILS_GET_URL + email,
        isAuth: true
    })
}