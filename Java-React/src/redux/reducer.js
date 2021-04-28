import {globalTypes, types} from "./types";

const initialState = {
	items: [],
	itemsDesc: [],
	item: {},
	itemsStatus: '',
	itemsDescStatus: '',
	trello: {
		lanes:[]
	}
}


export const reducer = (state = initialState, action) => {
	switch (action.type) {

		case types.GET_TRELLO:
			return {
				...state,
				trello: {
					lanes: [...action.payload]
				}
			}

		case types.GET_ITEMS_PENDING:
			return {
				...state,
				itemsStatus: globalTypes.PENDING
			}

		case types.GET_ITEMS_SUCCESS:
			return {
				...state,
				itemsStatus: globalTypes.SUCCESS,
				items: action.payload
			}
		case types.GET_ITEMS_DESC_PENDING:
			return {
				...state,
				itemsDescStatus: globalTypes.PENDING
			}
		case types.GET_ITEMS_DESC_SUCCESS:
			return {
				...state,
				itemsDescStatus: globalTypes.SUCCESS,
				itemsDesc: action.payload
			}

		case types.ADD_ITEM:
			return {
				...state,
				items: [...state.items, action.payload]
			}

		case types.SAVE_ITEM:
			return {
				...state,
				item: action.payload
			}

		case types.ADD_TASK:
			return {
				...state,
				itemsDesc: [...state.itemsDesc, action.payload]
			}

		case types.DELETE_TASK:
			return {
				...state,
				itemsDesc: state.itemsDesc.filter(value => value.id !== action.payload)
			}

		case types.SEARCH_TASK:
			return {
				...state,
				items: action.payload
			}

		default:
			return {
				...state
			}

	}
}
