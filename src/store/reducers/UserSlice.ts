import { IUser } from "../../models/IUser"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsers } from "./ActionCreators";

interface UserState {
    isLoading: boolean;
    error: string;
    
    users: IUser[];
    count: number;
};

const initialState: UserState = {
    isLoading: false, // для манипуляций над состоянием компонентов
    error: '',
    
    users: [],
    count: 0,
};

// Создает action-ы (сам Reducer в контексте Toolkit)
export const userSlice = createSlice({
    name: 'user', // уникальное имя
    initialState, // дэфолтное состояние стейта

    reducers: { // функции изменяющие состояние
        increment(state, action: PayloadAction<number>) {
            state.count += action.payload; // initialState.count (изменение поля) из стейта -> экшеном
        },

        // асинхронные редюсоры (обычная реализация)
        // usersFetching(state) {
        //     state.isLoading = true;
        // },
        // usersFetching_Success(state, action: PayloadAction<IUser[]>) {
        //     state.isLoading = false;
        //     state.error = '';
        //     state.users = action.payload;
        // },
        // usersFetching_Error(state, action: PayloadAction<string>) {
        //     state.isLoading = false;
        //     state.error = action.payload;
        // },
    },
    extraReducers: { // асинхронные редюсоры (зарезервировано для AsyncThunk)
        [fetchUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
            state.isLoading = false;
            state.error = '';
            state.users = action.payload;
        },
        [fetchUsers.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
});

export default userSlice.reducer;