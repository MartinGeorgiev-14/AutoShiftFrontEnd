import styled from "styled-components"
import { useSelector } from "react-redux"
import ListingContainer from "./ListingContainer"
import ButtonSelector from "./ButtonSelector"
import searchFormService from "../../../services/searchFormService"
import favoritesService from "../../../services/favoritesService"
import { useDispatch } from "react-redux"
import { displayNotification } from "../../../reducers/notificationReducer"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const Title = styled.h1`
    text-align: center;
`

const ListingPage = () => {
const listings = useSelector(o => o.searchResult.listings)
const selectedOptions = useSelector(o => o.formSelected)
const dispatch = useDispatch()

const handleSave = (event) => {
    event.preventDefault()

    favoritesService.addFilterToFavorites(selectedOptions).then(result => {
        dispatch(displayNotification({type: "success", message: "Filter succesfully added to favorites"}))
    }).catch(error => {
        dispatch(displayNotification({type: "error", message: "Error adding filter to favorites"}))
    })
}

    return (
        <Container>        
            <Title>Listings</Title>
            <button onClick={handleSave}>Save Filter</button>
            {listings.content.length === 0 ? <p>No listings found</p> :
                listings.content.map(l => {
                    return (
                        <ListingContainer key={l.id} listing={l} />
                    )
                })
            }

            <ButtonSelector service={searchFormService.searchCarByCriteria}/>
        </Container>
    )
}

export default ListingPage