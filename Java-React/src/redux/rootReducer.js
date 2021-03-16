import {combineReducers} from "redux";
import {reducer} from "./reducer";
import {authReducer} from "./Auth/AuthReducer";

export const rootReducer = combineReducers({
    reducer,
    authReducer
});
