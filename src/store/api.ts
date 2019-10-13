import axios from 'axios';

export const api = axios.create({
    baseURL : 'https://conduit.productionready.io/api/',
});

export function setToken( jwt: any ) {
    api.defaults.headers.common.Authorization = `Bearer ${jwt}`;
}

export function clearToken() {
    delete api.defaults.headers.common.Authorization;
}
