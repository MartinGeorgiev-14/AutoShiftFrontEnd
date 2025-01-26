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

    if(!listing){
        return null
    }

    return(
        <Container>
            <ShowInfoRow label={"Make"} data={listing.make}/>
            <ShowInfoRow label={"Model"} data={listing.model}/>
            <ShowInfoRow label={"Engine"} data={listing.engine}/>
            <ShowInfoRow label={"Gearbox"} data={listing.gearbox}/>
            <ShowInfoRow label={"Body Type"} data={listing.body}/>
            <ShowInfoRow label={"Mileage"} data={listing.mileage}/>
            <ShowInfoRow label={"Price BGN"} data={listing.price}/>
            <ShowInfoRow label={"Engine Displacement"} data={listing.engineDisplacement}/>
            <ShowInfoRow label={"Horsepower"} data={listing.horsepower}/>
            <ShowInfoRow label={"Region"} data={listing.region}/>
            <ShowInfoRow label={"Location"} data={listing.location}/>
            <ShowInfoRow label={"Description"} data={listing.description} className={'description'}/>
            <ShowInfoImg label={"Main image"} data={listing.images}/>
        </Container>
    )

}

export default ShowInfoListing