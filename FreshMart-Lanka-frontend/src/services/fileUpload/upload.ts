import {postRequest} from "../httpServices.ts";
import {UPLOAD_IMAGE_URL} from "../url.ts";

export const imageUpload = (data: any): Promise<any> => {
    return postRequest({
        url: UPLOAD_IMAGE_URL,
        data: data,
        contentType: "multipart",
        isAuth: false
    })
}