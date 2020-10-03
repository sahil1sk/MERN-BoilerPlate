import { baseUrl } from "../shared/baseUrl";

export const getToken = () => {
    const token = localStorage.getItem(baseUrl + 'token');
    return token;
}

export const getUser = () => {
    const username = localStorage.getItem(baseUrl + 'username');
    return username;
}
