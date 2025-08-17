import {FETCH_TODOS_REQUEST,
    FETCH_TODOS_SUCCESS,
    FETCH_TODOS_FAILURE,
    ADD_TODOS_SUCCESS,
    ADD_TODOS_REQUEST,
    ADD_TODOS_FAILURE,
    DELETE_TODOS_FAILURE,
    DELETE_TODOS_SUCCESS,
    DELETE_TODOS_REQUEST,
    EDIT_TODOS_SUCCESS,
    EDIT_TODOS_FAILURE,
    EDIT_TODOS_REQUEST,
    TOGGLE_SORT,
    RESET_TODOS,
    SET_SEARCH_TERM
} from "../actionsTypes.jsx";

export function fetchTodos() {
    return async (dispatch) => {
        dispatch({type: FETCH_TODOS_REQUEST})

        try {
            let response = await fetch('http://localhost:3001/todos')
            let data = await response.json();
            dispatch({type: FETCH_TODOS_SUCCESS, payload: data})
        } catch (error) {
            dispatch({type: FETCH_TODOS_FAILURE, payload: error.message})
        }
    }
}

export function addTodo(title) {
    return async (dispatch) => {
        if(!title.trim()) return
        dispatch({type: ADD_TODOS_REQUEST})

        try {
            let response = await fetch('http://localhost:3001/todos', {
                method: 'POST',
                headers: {'content-type': 'application/json; charset=UTF-8'},
                body: JSON.stringify({
                    title: title
                })
            })
            let data = await response.json();
            dispatch({type: ADD_TODOS_SUCCESS, payload: data})
        } catch (error) {
            dispatch({type: ADD_TODOS_FAILURE, payload: error.message})
        }
    }
}

export function deleteTodo(id) {
    return async (dispatch) => {
        dispatch({type: DELETE_TODOS_REQUEST})
        try {
            await fetch(`http://localhost:3001/todos/${id}`, {
                method: 'DELETE',
            })
            dispatch({type: DELETE_TODOS_SUCCESS, payload: id})
            return id
        } catch (error) {
            dispatch({type: DELETE_TODOS_FAILURE, payload: error.message})
        }
    }
}

export function editTodo(id, title) {
    return async (dispatch) => {
        dispatch({type: EDIT_TODOS_REQUEST})

        try {
            let response = await fetch(`http://localhost:3001/todos/${id}`, {
                method: 'PATCH',
                headers: {'content-type': 'application/json; charset=UTF-8'},
                body: JSON.stringify({
                    title: title
                })
            })
            let data = await response.json();
            dispatch({type: EDIT_TODOS_SUCCESS, payload: data})
            return data
        } catch (error) {
            dispatch({type: EDIT_TODOS_FAILURE, payload: error.message})
        }
    }
}

export const setSearchTerm = (term) => ({
        type: SET_SEARCH_TERM,
        payload: term
    })

export const toggleSort = () => ({
        type: TOGGLE_SORT
    })

export const resetTodos = () => ({
    type: RESET_TODOS
})

