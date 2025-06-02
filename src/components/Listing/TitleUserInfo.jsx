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

const iconColor = {
    color: "#E2323D"
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0.5rem 1rem 1rem 1rem;
    border: 1px solid gray;
    border-radius: 3px;
    height: 100%;
`
const Div = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`

const ID = styled.p`
    font-size: 0.7rem;
    color: gray;
    text-align: end;
`

const Title = styled.h1`
    color: #E2323D;
`

const Location = styled.p`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.1rem;
    flex-wrap: wrap;
`

const Price = styled.h1`
`

const Phone = styled.h1`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #E2323D;
`
const Person = styled.h2`

`

const Email = styled.h2`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #E2323D;
`

const Description = styled.p`
`

const TitleUserInfo = ({ listing, updateListing }) => {
    const dispatch = useDispatch()
    const user = useSelector(u => u.user)

    const handleFavorite = async (event) => {
        event.preventDefault()
        try {
            let response
            let message

            if(listing.listing.isFavorited){
                response = await favoritesService.removeListingFromFavorites(listing.listing.id)
                dispatch(addToFavorite(listing.listing.id))
                message = "Listing removed from favorites"
            }else if(!listing.listing.isFavorited){
                response = await favoritesService.addListingToFavorites(listing.listing.id)
                message = "Listing added from favorites"
                dispatch(addToFavorite(listing.listing.id))
            }
            else return
            if(response.status === 200){
                updateListing()
                dispatch(displayNotification({type: "success", message: message}))
            }else{
                dispatch(displayNotification({type: "error", message: "Error adding listing to favorites"}))
            }
        } catch (error) {
            console.error(error)
            dispatch(displayNotification({type: "error", message: "Error handling listing"}))
        }

    }

    return(
        <Container>
            <Div>
                <ID>Listing: {listing.listing.id}</ID>
                <Title>{listing.listing.make} {listing.listing.model}</Title>
                <Location><FaLocationDot style={iconColor}/>{listing.listing.region} {listing.listing.location}</Location>
                <Price>{listing.listing.price} BGN</Price>
                <Phone><FaPhoneAlt/>{listing.listing.user.phone}</Phone>
            </Div>
            <hr></hr>
            <Div>
                <Person>{listing.listing.user.firstName} {listing.listing.user.lastName}</Person>
                <Email><MdEmail style={iconColor}/>{listing.listing.user.email}</Email>
                {user.accessToken ? listing.listing.isFavorited ? <FaStar onClick={handleFavorite}/> : <CiStar onClick={handleFavorite}/>
                        : null }
            </Div>

        </Container>
    )
}

export default TitleUserInfo