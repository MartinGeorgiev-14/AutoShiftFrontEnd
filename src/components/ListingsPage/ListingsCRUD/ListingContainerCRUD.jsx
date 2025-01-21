import styled from "styled-components";
import TitleDiv from "../TitleDiv";
import StatsDiv from "../StatsDiv";
import LocationDiv from "../LocationDiv";    

const Container = styled.div`
    background-color: red;
    display: flex;
    width: 70%;
    margin: 1rem auto;
    padding: 1rem;
`
const Img = styled.img`
    width: 100px;   
`

const InfoDiv = styled.div`
    width: 100%;
`


const ListingContainerCRUD = ({ listing }) => {
    const mainImg = listing.images.filter(i => i.main)
  
    return(
        <Container>
            <Img src={`data:${mainImg[0].type};base64,${mainImg[0].imageData}`}></Img>
            <InfoDiv>
                <TitleDiv id={listing.id} make={listing.make} model={listing.model} price={listing.price}/>

                <StatsDiv stats={[listing.mileage + ' km', listing.engine,
                    listing.horsepower + " hp", listing.gearbox, listing.body]}/>

                <LocationDiv region={listing.region} location={listing.location}/>
            </InfoDiv>
        </Container>  
    )
}

export default ListingContainerCRUD;