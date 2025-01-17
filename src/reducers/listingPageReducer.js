import { createSlice } from "@reduxjs/toolkit";

const listingPageReducer = createSlice({
    name: "listingPage",
    initialState: {},
    reducers: {
        setListingsPage(state, action) {
            return action.payload
        }
    }
})

export const { setListingsPage } = listingPageReducer.actions
export default listingPageReducer.reducer