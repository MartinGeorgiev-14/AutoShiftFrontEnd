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


const ListingContainer = ({ listing }) => {
    const dispatch = useDispatch()
    const mainImg = listing.images.find(i => i.main === true)
    const user = useSelector(u => u.user)

    const handleFavorite = async (event) => {
        event.preventDefault()
        try {
            let response
            let message

            if(listing.isFavorited){
                response = await favoritesService.removeListingFromFavorites(listing.id)
                dispatch(addToFavorite(listing.id))
                message = "Listing removed from favorites"
            }else if(!listing.isFavorited){
                response = await favoritesService.addListingToFavorites(listing.id)
                message = "Listing added from favorites"
                dispatch(addToFavorite(listing.id))
            }
            else return

            console.log("response", response)
            if(response.status === 200){
                dispatch(displayNotification({type: "success", message: message}))
            }else{
                dispatch(displayNotification({type: "error", message: "Error adding listing to favorites"}))
            }
        } catch (error) {
            console.error(error)
            dispatch(displayNotification({type: "error", message: "Error handling listing"}))
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

                    <LocationDiv region={listing.region} location={listing.location} />
                        {user.accessToken ? listing.isFavorited ? <FaStar onClick={handleFavorite}/> : <CiStar onClick={handleFavorite}/>
                        : null }
                </Div>

            </InfoDiv>
        </Container>
    )
}

export default ListingContainer;