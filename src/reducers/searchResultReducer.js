import { createSlice } from "@reduxjs/toolkit";

const searchResultReducer = createSlice({
    name: "searchResult",
    initialState: {},
    reducers: {
        setSearchResult(state, action) {
            return action.payload
        }
    }
})

export const { setSearchResult } = searchResultReducer.actions
export default searchResultReducer.reducer