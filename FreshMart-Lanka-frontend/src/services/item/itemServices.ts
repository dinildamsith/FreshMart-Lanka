import {getRequest, postRequest} from "../httpServices.ts";
import {ADD_ITEM_URL, GET_ALL_ITEMS} from "../url.ts";

export interface ItemData {
    itemImageUrl: any,
    itemDescription: string,
    itemPrice: number,
    itemQuantity: number
}

export const getAllItems = (): Promise<any> => {
    return getRequest({
        url: GET_ALL_ITEMS,
        data: null,
        isAuth: true
    })
}

export const saveItem = (data: ItemData): Promise<any> => {
    return postRequest({
        url: ADD_ITEM_URL,
        data: data,
        contentType: "json",
        isAuth: true
    })
}