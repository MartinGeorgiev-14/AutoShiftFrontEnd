import styled from "styled-components";
import ShowInfoRow from './ShowInfoRow'
import ShowInfoImg from "./ShowInfoImg";

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    ustify-content: center;
    align-items: center;
    
`

const Div = styled.div`
` 

const ShowInfoListing = ({ listing }) => {

    const listingFormat = listing.listing

    if(!listing){
        return null
    }

    return(
        <Container>
            <ShowInfoRow label={"Make"} data={listingFormat.make}/>
            <ShowInfoRow label={"Model"} data={listingFormat.model}/>
            <ShowInfoRow label={"Engine"} data={listingFormat.engine}/>
            <ShowInfoRow label={"Gearbox"} data={listingFormat.gearbox}/>
            <ShowInfoRow label={"Body Type"} data={listingFormat.body}/>
            <ShowInfoRow label={"Mileage"} data={listingFormat.mileage}/>
            <ShowInfoRow label={"Price BGN"} data={listingFormat.price}/>
            <ShowInfoRow label={"Engine Displacement"} data={listingFormat.engineDisplacement}/>
            <ShowInfoRow label={"Horsepower"} data={listingFormat.horsepower}/>
            <ShowInfoRow label={"Region"} data={listingFormat.region}/>
            <ShowInfoRow label={"Location"} data={listingFormat.location}/>
            <ShowInfoRow label={"Description"} data={listingFormat.description} className={'description'}/>
            <ShowInfoImg label={"Main image"} data={listingFormat.images}/>
        </Container>
    )

}

export default ShowInfoListing