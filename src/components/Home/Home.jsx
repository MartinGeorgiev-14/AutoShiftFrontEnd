import useDocumentTitle from "../../hooks/useDocumentTitle"
import styled from "styled-components"
import { useState, useEffect } from "react"
import listingService from "../../services/listingCrudService"
import { useDispatch, useSelector } from "react-redux"
import { displayNotification } from "../../reducers/notificationReducer"
import ListingCard from "./ListingCard"
import SearchForm from "../Search/SearchForm"
import { clearOptions } from "../../reducers/formSelectedOptionsReducer"



const Home = () => {
    const dispatch = useDispatch()
    const [listings, setListings] = useState()

    useEffect(() => {
        dispatch(clearOptions())
        listingService.getListingsSortedByCreatedAt().then(result => {
            setListings(result)
        }).catch(error => {
            dispatch(displayNotification({type: "error", message: "Error getting listings"}))
        })
    },[])


    return (
        <div className="clip-container">
            <SearchForm/>
            
            <div className="lg:mt-10">
                <h2 className="page-heading">Leatest Listings</h2>
                <hr className="lg:mb-10 lg:mt-2 lg:w-[75%] lg:m-auto text-custom-blue"/>
                <div className="home-item-card">
                {
                    listings && listings.listings.content.map(l => <ListingCard key={l.id} listing={l}/>)
                }
                </div>
            </div>

           
        </div>
    )
}

export default Home