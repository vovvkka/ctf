import {combineReducers} from "redux";
// import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";
import {configureStore} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import thunk from "redux-thunk";

const rootReducer = combineReducers({

});

// const persistedState = loadFromLocalStorage();
const middleware = [thunk];

const store = configureStore({
    reducer: rootReducer,
    middleware,
    devTools: true,
    // preloadedState: persistedState,
});


// store.subscribe(() => {
//     saveToLocalStorage({
//         users: {
//             user: store.getState().users.user,
//         },
//         cart: {
//             products: store.getState().cart.products,
//         },
//     });
// });

axiosApi.interceptors.request.use(config => {
    try {
        config.headers['Authorization'] = store.getState().users.user.token;
    } catch (e) {}

    return config;
});

axiosApi.interceptors.response.use(res => res, e => {
    if (!e.response.data) {
        e.response = {data: {global: 'No internet!'}};
    }

    throw e;
});

export default store;