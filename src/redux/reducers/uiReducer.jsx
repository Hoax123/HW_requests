import {FETCH_TODOS_REQUEST,
    ADD_TODOS_REQUEST,
    EDIT_TODOS_REQUEST,
    DELETE_TODOS_REQUEST,

    FETCH_TODOS_SUCCESS,
    ADD_TODOS_SUCCESS,
    EDIT_TODOS_SUCCESS,
    DELETE_TODOS_SUCCESS,

    FETCH_TODOS_FAILURE,
    ADD_TODOS_FAILURE,
    EDIT_TODOS_FAILURE,
    DELETE_TODOS_FAILURE} from '../actionsTypes.jsx'

const initialState = {
    isLoading: false,
    error: null
}

export function uiReducer(state = initialState, {type, payload}) {
    switch (type) {
        case FETCH_TODOS_REQUEST:
        case ADD_TODOS_REQUEST:
        case EDIT_TODOS_REQUEST:
        case DELETE_TODOS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }

        case FETCH_TODOS_SUCCESS:
        case ADD_TODOS_SUCCESS:
        case EDIT_TODOS_SUCCESS:
        case DELETE_TODOS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null
            }

        case FETCH_TODOS_FAILURE:
        case ADD_TODOS_FAILURE:
        case EDIT_TODOS_FAILURE:
        case DELETE_TODOS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: payload
            }

        default:
            return state
    }
}