import { IUser } from "../../models/IUser"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsers } from "./ActionCreators";

interface UserState {
    users: IUser[];
    isLoading: boolean;
    error: string;
    // count: number;
};

const initialState: UserState = {
    users: [],
    isLoading: false,
    error: '',
    // count: 0,
};

// Создает action-ы
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: { // функции изменяющие состояние
        // increment(state, action: PayloadAction<number>) {
        //     state.count += action.payload; // initialState.count
        // },

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
    extraReducers: { // асинхронные редюсоры
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