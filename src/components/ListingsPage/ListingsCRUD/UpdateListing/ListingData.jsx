import { useParams } from "react-router";
import { useEffect, useState } from "react";
import listingCrudService from "../../../../services/listingCrudService";
import ImageSlider from "../../../Listing/ImageSlider";
import TitleUserInfo from "../../../Listing/TitleUserInfo";
import Specs from "../../../Listing/Specs";
import AdditionalInformation from "../../../Listing/AditionalInformation";
import styled from "styled-components";
import TitleUserInfoData from "./TitleUserInfoData";

const ListingData = () => {
    const { id } = useParams();
    const [listing, setListing] = useState()
    
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

    return (
        <div className="individual-listing-container">
            <div className="individual-listing-top">
                <ImageSlider images={listing.images}/>
                <TitleUserInfoData listing={listing} updateListing={updateListing}/>
            </div>
            <Specs listing={listing}/>
            <AdditionalInformation listing={listing}/>
        </div>
    );
}

export default ListingData; 