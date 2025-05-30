import { createSlice } from "@reduxjs/toolkit";

const filterReducer = createSlice({
    name: 'filterReducer',
    initialState: null,
    reducers:{
        setSearchResult(state, action){
            return action.payload
        }
    }
})

export const { setSearchResult } = filterReducer.actions
export default filterReducer.reducer