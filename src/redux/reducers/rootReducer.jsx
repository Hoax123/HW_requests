import {uiReducer} from "./uiReducer.jsx";
import {todosReducer} from "../reducers/todosReducer.jsx";
import { combineReducers} from "redux";

export const rootReducer = combineReducers({
    todos: todosReducer,
    ui: uiReducer,
})