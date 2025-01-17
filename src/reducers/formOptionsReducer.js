import { createSlice } from "@reduxjs/toolkit"

const formOptionsReducer = createSlice({
    name: "formOptions",
    initialState: {},
    reducers: {
        setFormOptions: (state, action) => {
            return action.payload
        }
    }

})

export const { setFormOptions } = formOptionsReducer.actions
export default formOptionsReducer.reducer