import {getRequest, postRequest} from "../httpServices.ts";
import {ALL_ORDERS_GET_URL, PARCHES_NEW_ORDER_URL} from "../url.ts";

export const getAllOrders = (): Promise<any> => {
    return getRequest({
        url: ALL_ORDERS_GET_URL,
        isAuth: true
    })
}

export const parchesNewOrder = (data:any): Promise<any> => {
    console.log(data)
    return postRequest({
        url: PARCHES_NEW_ORDER_URL,
        data: data,
        contentType: "json",
        isAuth: true
    })
}