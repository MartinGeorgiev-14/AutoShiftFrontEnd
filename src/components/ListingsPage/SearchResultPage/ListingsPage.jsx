import styled from "styled-components"
import { useSelector } from "react-redux"
import ListingContainer from "./ListingContainer"
import ButtonSelector from "./ButtonSelector"
import searchFormService from "../../../services/searchFormService"
import favoritesService from "../../../services/favoritesService"
import { useDispatch } from "react-redux"
import { displayNotification } from "../../../reducers/notificationReducer"

const ListingPage = () => {
const listings = useSelector(o => o.searchResult.listings)
const selectedOptions = useSelector(o => o.formSelected)
const dispatch = useDispatch()

console.log("listings", listings)

const handleSave = (event) => {
    event.preventDefault()

    favoritesService.addFilterToFavorites(selectedOptions).then(result => {
        dispatch(displayNotification({type: "success", message: "Filter succesfully added to favorites"}))
    }).catch(error => {
        dispatch(displayNotification({type: "error", message: "Error adding filter to favorites"}))
    })
}

    return (
        <div className="listings-page-container">      
        <div className="text-center flex flex-col items-center gap-5 my-5">  
            <h2 className="text-4xl">Listings</h2>
            <button className="save-filter-button" onClick={handleSave}>Save Filter</button>
        </div>
            {listings.content.length === 0 ? <p className="text-center text-2xl">No listings found</p> :
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