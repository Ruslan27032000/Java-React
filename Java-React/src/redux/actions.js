import {types} from "./types";
import axios from "axios";

export class Actions {
    getItems() {
        return (dispatch) => {
            dispatch({
                type: types.GET_ITEMS_PENDING
            })
            axios.get(`http://localhost:8000/api/allItems`)
                .then((res) => {
                    dispatch({
                        type: types.GET_ITEMS_SUCCESS,
                        payload: res.data
                    })
                })
        }
    }

    getItemsDesc(id) {
        return (dispatch) => {
            dispatch({
                type: types.GET_ITEMS_DESC_PENDING
            })
            axios.get(`http://localhost:8000/api/getDesc/${id}`)
                .then((res) => {
                    dispatch({
                        type: types.GET_ITEMS_DESC_SUCCESS,
                        payload: res.data
                    })
                })

        }
    }

    addItem(name) {
        return (dispatch) => {
            axios.post(`http://localhost:8000/api/addItem`, {name})
                .then((res) => {
                    dispatch({
                        type: types.ADD_ITEM,
                        payload: res.data
                    })
                })
        }
    }

    saveItem(item) {
        return (dispatch) => [
            dispatch({
                type: types.SAVE_ITEM,
                payload: item
            })
        ]
    }

    addTask(taskText,items) {
        return (dispatch) => {
            axios.post(`http://localhost:8000/api/addItemDesc`, {taskText, done: false,items})
                .then((res) => {
                    dispatch({
                        type: types.ADD_TASK,
                        payload: res.data
                    })
                })
        }
    }

    deleteTask(id){
        return(dispatch)=>{
            axios.delete(`http://localhost:8000/api/deleteItem/${id}`)
                .then((res)=>{
                    dispatch({
                        type:types.DELETE_TASK,
                        payload:id
                    })
                })
        }
    }

    searchTask(name){
        return(dispatch)=>{
            axios.get(`http://localhost:8000/api/search?name=${name}`)
                .then(res=>{
                    console.log(res.data)
                    dispatch({
                        type:types.SEARCH_TASK,
                        payload:res.data
                    })
                })
        }
    }
}
