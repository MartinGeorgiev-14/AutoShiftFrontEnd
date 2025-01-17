import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        setUser(state, action){
            return action.payload
        },
        clearUser(state){
            return {}
        }
    }
})

export const { setUser, clearUser } = userReducer.actions
export default userReducer.reducer