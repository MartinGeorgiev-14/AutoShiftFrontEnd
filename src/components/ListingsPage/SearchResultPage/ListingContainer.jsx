import styled from "styled-components";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Title from "./Title";
import Stats from "./Stats";
import LocationDiv from "./Location";
import InitialDesription from "./InitialDescription";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import favoritesService from "../../../services/favoritesService";
import { useDispatch, useSelector } from "react-redux";
import { displayNotification } from "../../../reducers/notificationReducer";
import { addToFavorite } from "../../../reducers/searchResultReducer";
import { Link } from "react-router-dom";

const ListingContainer = ({ listing }) => {
    const dispatch = useDispatch()
    const mainImg = listing.images.find(i => i.main === true)
    const user = useSelector(u => u.user)
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const handleFavorite = async (event) => {
        event.preventDefault()
        try {
            let response
            let message

            if (listing.isFavorited) {
                response = await favoritesService.removeListingFromFavorites(listing.id)
                dispatch(addToFavorite(listing.id))
                message = "Listing removed from favorites"
            } else if (!listing.isFavorited) {
                response = await favoritesService.addListingToFavorites(listing.id)
                message = "Listing added from favorites"
                dispatch(addToFavorite(listing.id))
            }
            else return

            console.log("response", response)
            if (response.status === 200) {
                dispatch(displayNotification({ type: "success", message: message }))
            } else {
                dispatch(displayNotification({ type: "error", message: "Error adding listing to favorites" }))
            }
        } catch (error) {
            console.error(error)
            dispatch(displayNotification({ type: "error", message: "Error handling listing" }))
        }

    }
    console.log(listing)
    return (
        <Link className="listing-container" to={`/listing/${listing.id}`}>
            <img className="w-[15rem] aspect-[4/3] object-cover rounded-l-2xl" src={mainImg.url && mainImg.url}></img>
            <div className="intro-info">
                <Title make={listing.make} model={listing.model} price={listing.price} handleFavorite={handleFavorite} user={user} listing={listing} />

                <div className="info-container">
                    <Stats stats={[listing.mileage + ' km', listing.engine,
                    listing.horsepower + " hp", listing.gearbox, listing.body, listing.color,
                    listing.engineDisplacement + " cc", listing.euroStandard,
                    month[new Date(listing.manufactureDate).getMonth()] + " " + new Date(listing.manufactureDate).getFullYear()]} />

                    <InitialDesription description={listing.description} />

                    <LocationDiv region={listing.region} location={listing.location} />
                </div>
            </div>
        </Link>
    )
}

export default ListingContainer;