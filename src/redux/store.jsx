import {applyMiddleware, createStore, compose} from "redux";
import {rootReducer} from "./reducers/rootReducer.jsx";
import {thunk} from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));