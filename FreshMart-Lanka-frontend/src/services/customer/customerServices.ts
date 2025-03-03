import {postRequest} from "../httpServices.ts";
import {SAVE_CUSTOMER_URL} from "../url.ts";

export const saveCustomer = (data: any): Promise<any> => {
    return postRequest({
        url: SAVE_CUSTOMER_URL,
        data: data,
        contentType: "json",
        isAuth: true
    })
}