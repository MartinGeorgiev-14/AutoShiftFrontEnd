import { useParams } from "react-router";
import { useEffect, useState } from "react";
import listingCrudService from '../../services/listingCrudService'
import ImageSlider from "./ImageSlider";
import TitleUserInfo from './TitleUserInfo'
import Specs from "./Specs";
import AdditionalInformation from "./AditionalInformation";
import styled from "styled-components";

const Container = styled.div`
    display:flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #f8f9fa;
    width: 70%;
    margin: 2rem auto;
    padding: 1rem;
`
const Div = styled.div`
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;    
`



const Listing = () => {
    const { id } = useParams();
    const [listing, setListing] = useState()
    
    useEffect(() => {
        listingCrudService.getListingById(id).then(result => {
            const sortImages = result.images.sort((a,b) => {
                if(a.main === b.main) return 0
                return a.main ? -1 : 1
            })
         
            setListing({...result, images: sortImages})
        })
    },[])

    if(!listing){
        return null
    }

    return (
        <Container>
            <Div>
                <ImageSlider images={listing.images}/>
                <TitleUserInfo listing={listing} />
            </Div>
            <Specs listing={listing}/>
            <AdditionalInformation listing={listing}/>
        </Container>
    );
}

export default Listing; 