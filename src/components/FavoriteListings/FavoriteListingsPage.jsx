import { useEffect } from "react"
import favoritesService from "../../services/favoritesService"
import { useDispatch, useSelector } from "react-redux"
import { setInitialResultFavListings } from "../../reducers/favoriteListingsReducer"
import { displayNotification } from "../../reducers/notificationReducer"
import FavListingContainer from "./FavListingContainer"

const FavoriteListingsPage = () => {
    const dispatch = useDispatch()
    const listings = useSelector(l => l.favoriteListingsReducer)

    useEffect(() => {
        favoritesService.getFavoriteListings().then(result => {
            dispatch(setInitialResultFavListings(result.data))
        }).catch(error => {
            dispatch(displayNotification({type: "error", message: "Error getting favorite listings"}))
        })
    }, [])


    return(
        <div>
            { listings && listings.listings.content.map(l => <FavListingContainer key={l.id} listing={l}/>)}
        </div>
    )
}

export default FavoriteListingsPage