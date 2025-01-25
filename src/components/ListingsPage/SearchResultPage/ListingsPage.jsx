import styled from "styled-components"
import { useSelector } from "react-redux"
import ListingContainer from "./ListingContainer"
import ButtonSelector from "./ButtonSelector"
import searchFormService from "../../../services/searchFormService"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const Title = styled.h1`
    text-align: center;
`




const ListingPage = () => {
const listings = useSelector(o => o.searchResult)

    
    return (
        <Container>
            
            <Title>Listings</Title>
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