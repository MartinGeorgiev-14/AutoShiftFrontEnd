import { useEffect } from "react"
import favoritesService from "../../services/favoritesService"
import { useDispatch, useSelector } from "react-redux"
import { setInitialResultFavListings } from "../../reducers/favoriteListingsReducer"
import { displayNotification } from "../../reducers/notificationReducer"
import FavListingContainer from "./FavListingContainer"
import FavoriteButtonSelector from "../Filters/FavoriteButtonSelector"

const FavoriteListingsPage = () => {
    const dispatch = useDispatch()
    const listings = useSelector(l => l.favoriteListingsReducer)

    useEffect(() => {
        favoritesService.getFavoriteListings().then(result => {
            dispatch(setInitialResultFavListings(result))
        }).catch(error => {
            dispatch(displayNotification({type: "error", message: "Error getting favorite listings"}))
        })
    }, [])
    
    return(
        <div className="listings-page-container">
            <div className="text-center flex flex-col items-center">  
                <h2 className="text-4xl">Listings</h2>
            </div>
            { listings && listings.listings.content.map(l => <FavListingContainer key={l.id} listing={l}/>)}
            { listings && <FavoriteButtonSelector service={favoritesService.getFavoriteListings} reducer="favoriteListingsReducer" access="listings" setResult={setInitialResultFavListings}/>}
        </div>
    )
}

export default FavoriteListingsPage