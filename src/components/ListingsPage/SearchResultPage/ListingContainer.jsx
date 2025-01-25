import styled from "styled-components";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Title from "./Title";
import Stats from "./Stats";
import LocationDiv from "./Location";   
import InitialDesription from "./InitialDescription"; 

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

    const mainImg = listing.images.filter(i => i.main)

    return(
        <Container>
            <Img src={`data:${mainImg[0].type};base64,${mainImg[0].imageData}`}></Img>
            <InfoDiv>
                <Title id={listing.id} make={listing.make} model={listing.model} price={listing.price}/>

                <Div>
                    <Stats stats={[listing.mileage + ' km', listing.engine,
                        listing.horsepower + " hp", listing.gearbox, listing.body]}/>

                    <InitialDesription description={listing.description}/>
                
                    <LocationDiv region={listing.region} location={listing.location}/>
                </Div>
                
            </InfoDiv>
        </Container>    
    )
}

export default ListingContainer;