import {types} from "./types";
import japi from "../services/axios";
import {convertDate} from "../tools/convertDate";


export class Actions {

	postLogs(type, action) {
		return (dispatch) => {
			const payload = {
				type,
				action,
				createDate: new Date()
			}
			japi.post('/trello/createLog', payload)
				.then((res) => {
					console.log(res.data)
					dispatch({
						type: types.POST_LOGS,
						payload: res.data
					})
				})
		}
	}


	getLogs() {
		return (dispatch) => {
			japi.get('/trello/allLogs')
				.then((res) => {
					let data = []
					for (let i in res.data) {
						data.push({...res.data[i], key: i, createDate: convertDate(res.data[i].createDate)})
					}
					dispatch({
						type: types.GET_LOGS,
						payload: data
					})
				})
		}
	}

	getTrello() {
		return (dispatch) => {
			japi.get('/trello/all')
				.then((res) => {
					let data = res.data
					for (let i in data) {
						for (let j in data[i].cards) {
							if (!data[i].cards[j].description) {
								data[i].cards[j].description = ""
							}
						}
					}
					console.log(data)
					dispatch({
						type: types.GET_TRELLO,
						payload: data.sort((a, b) => b.cards.length - a.cards.length)
					})
				})
		}
	}


	changeTrello(payload) {
		return (dispatch) => {
			japi.post('/trello/change', [...payload.lanes])
				.then(res => {
					dispatch({
						type: types.CHANGE_TRELLO
					})
				})
		}
	}


	getItems() {
		return (dispatch) => {
			dispatch({
				type: types.GET_ITEMS_PENDING
			})
			japi.get(`/api/allItems`)
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
			japi.get(`/api/getDesc/${id}`)
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
			japi.post(`/api/addItem`, {name})
				.then((res) => {
					dispatch({
						type: types.ADD_ITEM,
						payload: res.data
					})
				})
		}
	}

	saveItem(item) {
		return {
			type: types.SAVE_ITEM,
			payload: item
		}
	}

	addTask(taskText, items) {
		return (dispatch) => {
			japi.post(`/api/addItemDesc`, {taskText, done: false, items})
				.then((res) => {
					dispatch({
						type: types.ADD_TASK,
						payload: res.data
					})
				})
		}
	}

	deleteTask(id) {
		return (dispatch) => {
			japi.delete(`/api/deleteItem/${id}`)
				.then((res) => {
					dispatch({
						type: types.DELETE_TASK,
						payload: id
					})
				})
		}
	}

	searchTask(name) {
		return (dispatch) => {
			japi.get(`/api/search?name=${name}`)
				.then(res => {
					console.log(res.data)
					dispatch({
						type: types.SEARCH_TASK,
						payload: res.data
					})
				})
		}
	}
}
