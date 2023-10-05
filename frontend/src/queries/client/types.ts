import type { AxiosRequestConfig } from "axios";

export type request = {
    username: string
    password: string
}

export type HttpConfig = AxiosRequestConfig & {
    fullResponse?: boolean
};

export type HttpResponse<Payload = any> = Payload;
