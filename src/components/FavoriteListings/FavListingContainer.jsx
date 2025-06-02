import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { addToFavorite } from "../../reducers/searchResultReducer"
import favoritesService from "../../services/favoritesService"
import Title from "../ListingsPage/SearchResultPage/Title"
import Stats from "../ListingsPage/SearchResultPage/Stats"
import InitialDesription from "../ListingsPage/SearchResultPage/InitialDescription"
import Location from "../ListingsPage/SearchResultPage/Location"
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { displayNotification } from "../../reducers/notificationReducer"
import { removeListing } from "../../reducers/favoriteListingsReducer"
import { changeNotify } from "../../reducers/favoriteListingsReducer"

const Container = styled.div`
    background-color: #f8f9fa;
    display: flex;
    gap: 1rem;
    width: 70%;
    margin: 1rem auto;
    padding: 1rem;
    border-radius: 3px;
    
`
const Img = styled.img`
    width: 10rem;
    object-fit: contain;
`
const InfoDiv = styled.div`
    width: 100%;
`
const Div = styled.div`
    height: 85%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex-wrap: wrap;
    font-size: 1.2rem
`


const FavListingContainer = ({ listing }) => {
    const dispatch = useDispatch()
    const mainImg = listing.images.find(i => i.main === true)
    const user = useSelector(u => u.user)

    console.log("listing", listing)

    const handleRemoveFromFavorite = async (event) => {
        event.preventDefault()
        try {
            const response = await favoritesService.removeListingFromFavorites(listing.id)

            if (response.status === 200) {
                dispatch(removeListing(listing.id))
                dispatch(displayNotification({ type: "success", message: "Successfully removed listing from favorites" }))
            }
            else dispatch(displayNotification({ type: "error", message: "Error removing listing from favorites" }))
        } catch (error) {
            dispatch(displayNotification({ type: "error", message: "Error removing listing from favorites" }))
        }
    }

    const handleNotify = async (event) => {
        event.preventDefault()

        try {
            const response = await favoritesService.changeNotifyListing(listing.id)

            if (response.status === 200) {
                dispatch(changeNotify(listing.id))
            }
        } catch (error) {
            console.error(error)
            dispatch(displayNotification({ type: "error", message: "Error changing notification" }))
        }
    }

    return (
        <Container>
            <Img src={mainImg.url && mainImg.url}></Img>
            <InfoDiv>
                <Title id={listing.id} make={listing.make} model={listing.model} price={listing.price} />

                <Div>
                    <Stats stats={[listing.mileage + ' km', listing.engine,
                    listing.horsepower + " hp", listing.gearbox, listing.body]} />

                    <InitialDesription description={listing.description} />

                    <Location region={listing.region} location={listing.location} />
                    <FaStar onClick={handleRemoveFromFavorite} />
                </Div>
                <div>
                    <input type="checkbox" name={listing.id} checked={listing.isNotify} onChange={handleNotify} />
                    <label htmlFor={listing.id}>Notify me for new listings by e-mail</label>
                </div>
            </InfoDiv>
        </Container>
    )
}

export default FavListingContainer;