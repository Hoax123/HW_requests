import {FETCH_TODOS_SUCCESS,
    ADD_TODOS_SUCCESS,
    EDIT_TODOS_SUCCESS,
    DELETE_TODOS_SUCCESS,
    RESET_TODOS,
    TOGGLE_SORT,
    SET_SEARCH_TERM
} from "../actionsTypes.jsx";

const initialState = {
    todos: [],
    isSorted: false,
    originalToDos: [],
    searchTerm: ''
}

export function todosReducer(state = initialState, {type, payload}) {
    switch (type) {
        case FETCH_TODOS_SUCCESS:
            return {
                ...state,
                todos: payload,
                originalToDos: payload
            }

        case ADD_TODOS_SUCCESS:
            return {
                ...state,
                todos: [...state.todos, payload],
                originalToDos: [...state.originalToDos, payload]
            }

        case EDIT_TODOS_SUCCESS:
            return {
                ...state,
                todos: state.todos.map(todo => String(todo.id) === String(payload.id) ? payload : todo),
                originalToDos: state.originalToDos.map(todo => String(todo.id) === String(payload.id) ? payload : todo)
            }

        case DELETE_TODOS_SUCCESS:
            return {
                ...state,
                todos: state.todos.filter(todo => String(todo.id) !== String(payload)),
                originalToDos: state.originalToDos.filter(todo => String(todo.id) !== String(payload))
            }

        case TOGGLE_SORT:
            if (state.isSorted) {
                return {
                    ...state,
                    todos: [...state.originalToDos],
                    isSorted: false
                }
            } else {
                return {
                    ...state,
                    todos: [...state.todos].sort((a,b) => a.title.localeCompare(b.title)),
                    isSorted: true
                }
            }

        case SET_SEARCH_TERM:
            return {
                ...state,
                searchTerm: payload,
                todos: payload === ''
                    ? [...state.originalToDos]
                    : [...state.originalToDos].filter(todo => todo.title.toLowerCase().includes(payload.toLowerCase()))
            }

        case RESET_TODOS:
            return {
                ...state,
                todos: [...state.originalToDos],
                isLoading: false,
                searchTerm: ''
            }

        default:
            return state
    }
}

