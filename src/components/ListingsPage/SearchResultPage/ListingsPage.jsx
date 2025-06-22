import styled from "styled-components"
import { useSelector } from "react-redux"
import ListingContainer from "./ListingContainer"
import ButtonSelector from "./ButtonSelector"
import searchFormService from "../../../services/searchFormService"
import favoritesService from "../../../services/favoritesService"
import { useDispatch } from "react-redux"
import { displayNotification } from "../../../reducers/notificationReducer"
import { useParams } from "react-router"
import { setSearchResult } from "../../../reducers/searchResultReducer"
import { useEffect } from "react"

const ListingPage = () => {
const listings = useSelector(o => o.searchResult.listings)
const selectedOptions = useSelector(o => o.formSelected)
const dispatch = useDispatch()
const { data } = useParams()

const decodeBase64ToObject = (encoded) => {

    if (!encoded) return null
    const decodedStr = atob(encoded)
    return JSON.parse(decodedStr)
}

const decoded = decodeBase64ToObject(data)

useEffect(() => {
    if (decoded) {
        searchFormService.searchCarByCriteria(decoded).then(result => {
            console.log("Search result:", result)
            dispatch(setSearchResult(result))
        }).catch(error => {
            console.error("Error fetching listings:", error)
            dispatch(displayNotification({type: "error", message: "Error fetching listings"}))
        })
    }
}, [])

const handleSave = (event) => {
    event.preventDefault()

    favoritesService.addFilterToFavorites(selectedOptions).then(result => {
        dispatch(displayNotification({type: "success", message: "Filter succesfully added to favorites"}))
    }).catch(error => {
        dispatch(displayNotification({type: "error", message: "Error adding filter to favorites"}))
    })
}

    if (!listings) {
        return null
    }

    return (
        <div className="listings-page-container">      
        <div className="text-center flex flex-col items-center gap-5">  
            <h2 className="text-4xl">Listings</h2>
            <button className="save-filter-button" onClick={handleSave}>Save Filter</button>
        </div>
            {listings && listings.content.length === 0 ? <p className="text-center text-2xl">No listings found</p> :
                listings.content.map(l => {
                    return (
                        <ListingContainer key={l.id} listing={l} />
                    )
                })
            }

            {listings.content.length === 0 ? null : <ButtonSelector service={searchFormService.searchCarByCriteria}/>}
        </div>
    )
}

export default ListingPage