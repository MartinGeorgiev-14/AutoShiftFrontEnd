import { createSlice } from "@reduxjs/toolkit";

const searchResultReducer = createSlice({
    name: "searchResult",
    initialState: {},
    reducers: {
        setSearchResult(state, action) {
            return action.payload
        },
        removeListing(state, action) {
            
            const newContent = state.content.filter(l => l.id !== action.payload)  

            return {...state, content: newContent}
        }
    }
})

export const { setSearchResult, removeListing } = searchResultReducer.actions
export default searchResultReducer.reducer