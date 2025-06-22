import styled from "styled-components";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { addToFavorite } from "../../reducers/searchResultReducer";
import { displayNotification } from "../../reducers/notificationReducer";
import favoritesService from "../../services/favoritesService"
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const TitleUserInfo = ({ listing, updateListing }) => {
    const dispatch = useDispatch()
    const user = useSelector(u => u.user)
    const navigate = useNavigate()

    const handleFavorite = async (event) => {
        event.preventDefault()
        try {
            let response
            let message

            if (listing.listing.isFavorited) {
                response = await favoritesService.removeListingFromFavorites(listing.listing.id)
                dispatch(addToFavorite(listing.listing.id))
                message = "Listing removed from favorites"
            } else if (!listing.listing.isFavorited) {
                response = await favoritesService.addListingToFavorites(listing.listing.id)
                message = "Listing added from favorites"
                dispatch(addToFavorite(listing.listing.id))
            }
            else return
            if (response.status === 200) {
                updateListing()
                dispatch(displayNotification({ type: "success", message: message }))
            } else {
                dispatch(displayNotification({ type: "error", message: "Error adding listing to favorites" }))
            }
        } catch (error) {
            console.error(error)
            dispatch(displayNotification({ type: "error", message: "Error handling listing" }))
        }

    }

    return (
        <div className="individual-listing-user-info">
            <div className="flex flex-col lg:gap-2">
                <p className="text-end text-dimgray lg:text-[0.8vw]">Listing: {listing.listing.id}</p>
                <div className="flex items-center justify-between">
                    <h2 className="text-custom-blue lg:text-4xl">{listing.listing.make} {listing.listing.model}</h2>
                    {user?.accessToken && user.userId !== listing.listing.user.id && (
                        listing.listing.isFavorited ? (
                            <FaStar className="icon text-4xl cursor-pointer" onClick={handleFavorite} />
                        ) : (
                            <CiStar className="icon text-4xl cursor-pointer" onClick={handleFavorite} />
                        )
                    )}
                </div>
                <p className="flex items-center lg:gap-2"><FaLocationDot className="icon" />{listing.listing.region} {listing.listing.location}</p>
                <h3 className="lg:text-3xl font-bold">{listing.listing.price} BGN</h3>
                <h3 className="flex items-center lg:gap-2 lg:text-3xl text-custom-blue"><FaPhoneAlt />{listing.listing.user.phone}</h3>
            </div>
            <hr></hr>
            <div className="flex flex-col lg:gap-1">
                <p>{listing.listing.user.firstName} {listing.listing.user.lastName}</p>
                <h3 className="flex items-center lg:gap-1 text-custom-blue"><MdEmail className="icon" />{listing.listing.user.email}</h3>
                {user?.accessToken && user.userId !== listing.listing.user.id &&  <Link className="bg-custom-blue text-center text-custom-white p-2 rounded-lg
                hover-transition hover:bg-custom-hover-blue" to={`/chatList/${listing.listing.id}`}>Send Message</Link>}
            </div>
        </div>
    )
}

export default TitleUserInfo