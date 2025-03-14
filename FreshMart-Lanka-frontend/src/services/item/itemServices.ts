import {deleteRequest, getRequest, postRequest, putRequest} from "../httpServices.ts";
import {
    ADD_ITEM_URL,
    CODE_BY_ITEM_GET_URL,
    DELETE_ITEM_URL,
    GET_ALL_ITEMS,
    OUT_OF_STOCK_ITEMS_GET_URL,
    UPDATE_ITEM_URL
} from "../url.ts";

export interface ItemData {
    itemImageUrl: any,
    itemDescription: string,
    itemPrice: number,
    itemQuantity: number
}

export const getAllItems = (): Promise<any> => {
    return getRequest({
        url: GET_ALL_ITEMS,
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

export const deleteItem = (deleteItemCode: any): Promise<any> => {
    return deleteRequest({
        url: DELETE_ITEM_URL + deleteItemCode,
        isAuth: true
    })
}

export const codeByItemGet = (itemCode: any): Promise<any> => {
    return getRequest({
        url: CODE_BY_ITEM_GET_URL + itemCode,
        isAuth: true
    })
}

export const updateItem = (data: any): Promise<any> => {
    return putRequest({
        url: UPDATE_ITEM_URL + data.itemCode,
        data: data,
        contentType: "json",
        isAuth: true
    })
}


export const outOfStockItemsGet = (): Promise<any> => {
    return getRequest({
        url: OUT_OF_STOCK_ITEMS_GET_URL,
        isAuth: true
    })
}