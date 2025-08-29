import axios from "axios";

const baseUrl = 'http://localhost:5050/';

const instance = axios.create({
    baseURL: baseUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const get = (url: string) => {
    return instance.get(url);
}


export const post = (url: string, data: any) => {
    return instance.post(url, data);
}

export const deleteMethod = (url: string) => {
    return instance.delete(url);
}