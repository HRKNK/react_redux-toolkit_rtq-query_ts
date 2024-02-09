import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { postAPI } from "../services/PostService";
import userReducer from './reducers/UserSlice';

// объединение всех Reducer (исполнителей) ИЛИ обычный объект без combineReducers (просто объявление Reducer-а)
const rootReducer = combineReducers({
    userReducer,

    // регистрация сервиса
    [postAPI.reducerPath]: postAPI.reducer,
});

// Конфигурация Redux-хранилища
export const setupStore = () => {
    return configureStore({
        reducer: rootReducer, // корневой Reducer
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware().concat(postAPI.middleware);
        }
    })
};

// Типизация хранилища (основные типы)
export type RootState = ReturnType<typeof rootReducer>; // тип состояния
export type AppStore = ReturnType<typeof setupStore>; // тип хранилища
export type AppDispatch = AppStore['dispatch']; // тип dispatch