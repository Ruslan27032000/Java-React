import {authTypes} from "./AuthTypes";
import {ERROR, PENDING, SUCCESS} from "../globalTypes";

const initialState = {
    isLogin: true,
    loginStatus: ''
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case authTypes.LOGIN_PENDING:
            return {
                ...state,
                loginStatus: PENDING
            }

        case authTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLogin: true,
                loginStatus: SUCCESS
            }

        case authTypes.LOGIN_ERROR:
            return {
                ...state,
                loginStatus: ERROR
            }

        case authTypes.CHANGE_IS_LOGIN:
            return {
                ...state,
                isLogin: false
            }

        default:
            return {
                ...state
            }
    }
}
