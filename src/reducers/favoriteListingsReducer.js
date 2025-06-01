import { createSlice } from "@reduxjs/toolkit";

const favoriteListingReducer = createSlice({
    name: 'filterReducer',
    initialState: null,
    reducers: {
        setInitialResultFavListings(state, action) {
            return action.payload
        },
        changeNotify: (state, action) => {
            const formatedListings = state.listings.content.map(f => {
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
                listings: {
                    ...state.listings,
                    content: [...formatedListings]
                }
            }
        },
        removeListing: (state, action) => {
            const formatedListings = state.listings.content.filter(f => f.id !== action.payload)

             return {
                ...state,
                listings: {
                    ...state.listings,
                    content: [...formatedListings]
                }
            }
        }
    }
})

export const { setInitialResultFavListings, changeNotify, removeListing } = favoriteListingReducer.actions
export default favoriteListingReducer.reducer