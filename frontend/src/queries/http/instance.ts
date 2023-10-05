import axios, {AxiosError} from "axios";
import type { HttpConfig } from "../client/types";
import {toast} from 'react-toastify';
import {storage} from "@/core";

const createInstance = () => {
    const baseURL = "/api"
    return axios.create({ baseURL });
};

const instance = createInstance();

const getHeaders = () => {
    const token = storage.jwt.get();
    if (token) {
        return {
            Authorization: `Bearer ${token}`,
        };
    }
    return {};
};

export const http = async ({ fullResponse, ...config }: HttpConfig) => {
    try {
        const response = await instance.request({
            ...config,
            headers: {
                ...config.headers,
                ...getHeaders(),
            },
        });
        if (fullResponse) {
            return response;
        } else {
            return response.data;
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message)
            throw error?.response;
        } else {
            throw error;
        }
    }
};

instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error?.response?.status === 401 && window.location.pathname.indexOf('/login') === -1) window.location.replace('/login')
        if (error?.response?.status === 403 && window.location.pathname.indexOf('/login') === -1) window.location.replace('/login')
        throw error
    });

http.interceptors = instance.interceptors;
