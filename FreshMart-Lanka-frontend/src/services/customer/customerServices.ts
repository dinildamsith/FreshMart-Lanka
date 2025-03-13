import {deleteRequest, getRequest, postRequest, putRequest} from "../httpServices.ts";
import {
    DELETE_CUSTOMER_URL,
    GET_ALL_CUSTOMERS_URL, GET_CUSTOMER_COUNT_URL,
    ID_BY_CUSTOMER_GET_URL,
    SAVE_CUSTOMER_URL,
    UPDATE_CUSTOMER_URL
} from "../url.ts";

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

export const idByGetCustomer = (customerId: any):Promise<any> => {
    return getRequest({
        url: ID_BY_CUSTOMER_GET_URL + customerId,
        isAuth: true
    })
}

export const updateCustomer = (data: any): Promise<any> => {
    return putRequest({
        url: UPDATE_CUSTOMER_URL + data.customerId,
        data: data,
        contentType: "json",
        isAuth: true
    })
}

export const deleteCustomer = (customerId: any): Promise<any> => {
    return deleteRequest({
        url: DELETE_CUSTOMER_URL + customerId,
        isAuth: true
    })
}

export const customerCount = ():Promise<any> => {
    return getRequest({
        url: GET_CUSTOMER_COUNT_URL,
        isAuth: true
    })
}