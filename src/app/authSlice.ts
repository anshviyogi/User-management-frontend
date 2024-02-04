import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface State {
    email: String,
    token: String,
    username?: String
}

const initialState: State = {
    email: "",
    token: "",
    username: ""
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        setUserDetails: (state, action: PayloadAction<State>) => {
            const {email, token, username } = action.payload;
            state.email = email;
            state.token = token;
            state.username = username;
            return state;
        },
        clearDetails: (state) => {
            state.email = ''
            state.token = ''
            state.username = ''
            return state;
        }
    }
})

export const { setUserDetails, clearDetails } = authSlice.actions;

export default authSlice.reducer;