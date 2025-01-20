import styled from "styled-components"
import { useSelector } from "react-redux"
import ListingContainer from "./ListingContainer"

const Container = styled.div`
`

const ListingPage = () => {
const listings = useSelector(o => o.searchResult)

    return (
        <Container>
            <h1>Listings</h1>
            {listings.content.length === 0 ? <p>No listings found</p> :
                listings.content.map(l => {
                    return (
                        <ListingContainer key={l.id} listing={l} />
                    )
                })
            }
        </Container>
    )
}

export default ListingPage