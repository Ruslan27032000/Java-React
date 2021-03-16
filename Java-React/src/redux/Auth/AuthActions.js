import {authTypes} from "./AuthTypes";
import axios from "axios";


export const LoginAction = {

    removeIsLogin: () => {
        return {
            type: authTypes.CHANGE_IS_LOGIN
        }
    },

    onLogin: (username, password) => {
        return dispatch => {
            dispatch({
                type: authTypes.LOGIN_PENDING
            })
            axios.post('http://localhost:8000/authenticate', {username, password}).then(res => {
                localStorage.setItem("token", res.data.token)
                dispatch({
                    type: authTypes.LOGIN_SUCCESS
                })
                window.location.href = '/'
            }).catch((error) => {
                dispatch({
                    type: authTypes.LOGIN_ERROR
                })
            })
        }
    },

    logOut: () => {
        return {
            type: authTypes.LOG_OUT
        }
    },

    onReg: (username, password, resolve, reject) => {
        return dispatch => {
            dispatch({
                type: authTypes.REG_PENDING
            })
            axios.post('http://localhost:8000/register', {username, password})
                .then((res) => {
                    resolve(true)
                    dispatch({
                        type: authTypes.REG_SUCCESS
                    })
                }).catch(error => {
                reject(true)
                dispatch({
                    type: authTypes.REG_ERROR
                })
            })
        }
    }

}
