export type ApiData = Record<string, any>;

import type { AxiosRequestConfig, AxiosResponse } from 'axios';
export type ApiConfig = AxiosRequestConfig;
export type ApiResponse<T = any> = AxiosResponse<T>;

export type ApiGet = <T = any>(url: string, config?: ApiConfig) => Promise<ApiResponse<T>>;
export type ApiWithData = <T = any>(url: string, data: ApiData) => Promise<ApiResponse<T>>;
