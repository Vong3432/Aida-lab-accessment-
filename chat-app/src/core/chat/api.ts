import { APIClientError, baseAPIClient } from "app/utils/apiClient";
import { Language } from "./interface";

export interface TranslateDTO {
    message: string;
    lng: Language;
}

export class TranslateAPIError extends Error {
    constructor(message: string = "", ...args: any) {
        const msg = "Translate error " + message
        super(msg, ...args);
        this.message = msg
    }
}

const translate = async (payload: TranslateDTO): Promise<string> => {
    try {
        const response: { data: string } = await baseAPIClient("translate", {
            method: "POST",
            payload
        })
        return response.data
    } catch (error: any) {
        if (error as APIClientError) {
            throw new TranslateAPIError(payload.message)
        }
        throw error
    }

}

export const ChatAPI = {
    translate
}