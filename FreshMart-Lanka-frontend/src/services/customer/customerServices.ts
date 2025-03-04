import {getRequest, postRequest} from "../httpServices.ts";
import {GET_ALL_CUSTOMERS_URL, SAVE_CUSTOMER_URL} from "../url.ts";

export const saveCustomer = (data: any): Promise<any> => {
    return postRequest({
        url: SAVE_CUSTOMER_URL,
        data: data,
        contentType: "json",
        isAuth: true
    })
}

export const getAllCustomers = ():Promise<any> => {
    return getRequest({
        url: GET_ALL_CUSTOMERS_URL,
        isAuth: true
    })
}