import { createSlice } from "@reduxjs/toolkit";

const notificationReducer = createSlice({
    name: 'notification',
    initialState: {
        type: 'hidden',
        message: {}
    },
    reducers: {
        displayNotification(state, action) {
            
            return {type: action.payload.type, message: action.payload.message}
        },
        clearNotification(state, action) {
            return {type: 'hidden', message: {}}
        },

    }
})

export const { displayNotification, clearNotification } = notificationReducer.actions
export default notificationReducer.reducer;