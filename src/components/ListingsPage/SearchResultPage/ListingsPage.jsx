import styled from "styled-components"
import { useSelector } from "react-redux"
import ListingContainer from "./ListingContainer"
import ButtonSelector from "./ButtonSelector"

const Container = styled.div`
`

const Div = styled.div`
`


const ListingPage = () => {
const listings = useSelector(o => o.searchResult)

    
    return (
        <Container>
            <Div>
                <h1>Listings</h1>
            </Div>
            
            {listings.content.length === 0 ? <p>No listings found</p> :
                listings.content.map(l => {
                    return (
                        <ListingContainer key={l.id} listing={l} />
                    )
                })
            }

            <ButtonSelector/>
        </Container>
    )
}

export default ListingPage