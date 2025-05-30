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
        },
        addToFavorite(state, action){
            const formatedContent = state.listings.content.map(c => {
                if(c.id === action.payload){
                    return{
                        ...c,
                        isFavorited: !c.isFavorited 
                    }
                }
                else return c
            })

            return{
                ...state,
                listings:{
                    ...state.listings,
                    content: [...formatedContent]
                }
            }
        }
    }
})

export const { setSearchResult, removeListing, clearSearchResult, changeActive, addToFavorite } = searchResultReducer.actions
export default searchResultReducer.reducer