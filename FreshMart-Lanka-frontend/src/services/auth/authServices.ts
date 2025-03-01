import { postRequest } from "../httpServices.ts";
import { SIGN_UP_URL } from "../url.ts";

// Define the type for the signup data
interface SignUpData {
    username: string;
    email: string;
    password: string;
}

export const signUp = (data: SignUpData): Promise<any> => {
    return postRequest({
        url: SIGN_UP_URL,
        data: data,
        contentType: "json",
        isAuth: false
    });
};
