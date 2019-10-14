const ID_TOKEN_KEY = 'id_token';

export function  getToken() {
    return window.localStorage.getItem(ID_TOKEN_KEY);
}
export function saveToken(token) {
    window.localStorage.setItem(ID_TOKEN_KEY, token);
}
export function destroyToken() {
    window.localStorage.removeItem(ID_TOKEN_KEY);
}
