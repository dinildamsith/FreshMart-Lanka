import { postRequest } from "../httpServices.ts";
import {SIGN_IN_URL, SIGN_UP_URL} from "../url.ts";

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