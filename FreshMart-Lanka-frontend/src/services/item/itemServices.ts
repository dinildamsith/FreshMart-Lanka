import {postRequest} from "../httpServices.ts";
import {ADD_ITEM_URL} from "../url.ts";

export interface ItemData {
    itemImageUrl: string,
    itemDescription: string,
    itemPrice: number,
    itemQuantity: number
}

export const saveItem = (data: ItemData): Promise<any> => {
    return postRequest({
        url: ADD_ITEM_URL,
        data: data,
        contentType: "json",
        isAuth: true
    })
}