import axios from 'axios';
import type { ApiGet, ApiWithData } from './types';

export const API_BASE = 'http://35.209.10.234:8080/api';
const axiosClient = axios.create({
  baseURL: API_BASE,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json'
  }
});

const formDataClient = axios.create({
  baseURL: API_BASE,
  timeout: 50000,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

export const get: ApiGet = (url, config) => axiosClient.get(url, config);
export const post: ApiWithData = (url, data) => axiosClient.post(url, data);
export const del: ApiWithData = (url, data) => axiosClient.delete(url, { data });
export const patch: ApiWithData = (url, data) => axiosClient.patch(url, data);
export const formDataPost: ApiWithData = (url, data) => formDataClient.post(url, data);
export const formDataPatch: ApiWithData = (url, data) => formDataClient.patch(url, data);
