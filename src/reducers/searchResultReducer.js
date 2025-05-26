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
        },
        clearSearchResult(state, action) {
            return {}
        },
        changeActive(state, action){
            const listings = state.listings.content.map(l => {
                if(l.id === action.payload.id){
                    return {...l, isActive: !l.isActive}
                }
                return l
            })

            return {...state, listings: {...state.listings, content: listings}}
        }
        
        
    }
})

export const { setSearchResult, removeListing, clearSearchResult, changeActive } = searchResultReducer.actions
export default searchResultReducer.reducer