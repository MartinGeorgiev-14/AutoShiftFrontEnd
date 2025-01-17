import { createSlice } from "@reduxjs/toolkit";

const formSelectedOptionsReducer = createSlice({
    name: "formSelectedOptions",
    initialState:{
        make: null,
        model: null,
        region: null,
        location: null,
        engine: null,
        gearbox: null,
        type: null,
        body: null,
        startPrice: null,
        endPrice: null
    },
    reducers: {
        selectOption: (state, action) => {
            return {...state, [action.payload.prop] : action.payload.value}
        }
    }
})

export const { selectOption } = formSelectedOptionsReducer.actions;
export default formSelectedOptionsReducer.reducer