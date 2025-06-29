import { useParams } from "react-router";
import { useEffect, useState } from "react";
import listingCrudService from '../../services/listingCrudService'
import ImageSlider from "./ImageSlider";
import TitleUserInfo from './TitleUserInfo'
import Specs from "./Specs";
import AdditionalInformation from "./AditionalInformation";
import styled from "styled-components";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const Listing = () => {
    const { id } = useParams();
    const [listing, setListing] = useState()
    useDocumentTitle("Listing Details")

    useEffect(() => {
        listingCrudService.getListingById(id).then(result => {
            const sortImages = result.listing.images.sort((a,b) => {
                if(a.main === b.main) return 0
                return a.main ? -1 : 1
            })
            setListing({...result, images: sortImages})
        })
    },[])

    const updateListing = () => {
        listingCrudService.getListingById(id).then(result => {
            const sortImages = result.listing.images.sort((a,b) => {
                if(a.main === b.main) return 0
                return a.main ? -1 : 1
            })
            setListing({...result, images: sortImages})
        })
    }

    if(!listing){
        return null
    }

    console.log("listing", listing)

    return (
        <div className="individual-listing-container">
            <div className="individual-listing-top">
                <ImageSlider images={listing.images}/>
                <TitleUserInfo listing={listing} updateListing={updateListing}/>
            </div>
            <Specs listing={listing}/>
            <AdditionalInformation listing={listing}/>
        </div>
    );
}

export default Listing; 