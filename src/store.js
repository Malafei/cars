import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import usersReducer from "./reducers/usersReducer";

const middleware = [
    thunk
];

const rootReducer = combineReducers({
    auth: authReducer,
    users: usersReducer
    
});

 // In development, use the browser's Redux dev tools extension if installed
 const enhancers = [];
 const isDevelopment = process.env.NODE_ENV === 'development';
 if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
   window.devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
   enhancers.push(window.devToolsExtension());
 }

 const store = createStore(
    rootReducer,
    {},
    compose(applyMiddleware(...middleware), ...enhancers)
);
export default store;