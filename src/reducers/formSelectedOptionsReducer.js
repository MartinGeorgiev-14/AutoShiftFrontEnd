import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
}

const formSelectedOptionsReducer = createSlice({
    name: "formSelectedOptions",
    initialState: initialState,
    reducers: {
        selectOption: (state, action) => {
            return {...state, [action.payload.prop] : action.payload.value}
        },
        clearOptions: (state, action) => {
            return initialState
        }
    }
})

export const { selectOption, clearOptions } = formSelectedOptionsReducer.actions;
export default formSelectedOptionsReducer.reducer