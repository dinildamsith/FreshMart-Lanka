import {getRequest} from "../httpServices.ts";
import {ALL_ORDERS_GET_URL} from "../url.ts";

export const getAllOrders = (): Promise<any> => {
    return getRequest({
        url: ALL_ORDERS_GET_URL,
        isAuth: true
    })
}