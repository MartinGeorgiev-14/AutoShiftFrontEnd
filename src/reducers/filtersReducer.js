import { createSlice } from "@reduxjs/toolkit";

const filterReducer = createSlice({
    name: 'filterReducer',
    initialState: null,
    reducers: {
        setSearchResult(state, action) {
            return action.payload
        },
        changeNotify: (state, action) => {
            const formatedFilters = state.filters.content.map(f => {
                if (f.id === action.payload) {
                    return {
                        ...f,
                        isNotify: !f.isNotify
                    }
                }
                else return f
            })

            return {
                ...state,
                filters: {
                    ...state.filters,
                    content: [...formatedFilters]
                }
            }
        },
        removeFilter: (state, action) => {
            const formatedFilters = state.filters.content.filter(f => f.id !== action.payload)

             return {
                ...state,
                filters: {
                    ...state.filters,
                    content: [...formatedFilters]
                }
            }
        }
    }
})

export const { setSearchResult, changeNotify, removeFilter } = filterReducer.actions
export default filterReducer.reducer