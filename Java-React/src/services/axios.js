import {LoginAction} from "../redux/Auth/AuthActions";

const axios = require("axios");
import store from "../redux/store"

const japi = axios.create({
    baseURL: 'http://localhost:8000',
});

japi.defaults.headers.Authorization = `Bearer ${localStorage.getItem("token")}`

japi.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    const request = error.request;
    if (request.status === 401) {
        localStorage.removeItem("token")
        store.dispatch(LoginAction.removeIsLogin())
    }
    return Promise.reject(error)
});

export default japi;
