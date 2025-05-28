import useDocumentTitle from "../../hooks/useDocumentTitle"
import styled from "styled-components"
import { useState, useEffect } from "react"
import listingService from "../../services/listingCrudService"
import { useDispatch, useSelector } from "react-redux"
import { displayNotification } from "../../reducers/notificationReducer"
import ListingCard from "./ListingCard"
import SearchForm from "../Search/SearchForm"

const Title = styled.h1`
text-align: center
`


const Home = () => {
    const dispatch = useDispatch()
    const [listings, setListings] = useState()

    useEffect(() => {
        listingService.getListingsSortedByCreatedAt().then(result => {
            setListings(result)
        }).catch(error => {
            dispatch(displayNotification({type: "error", message: "Error getting listings"}))
        })
    },[])


    return (
        <div>
            <SearchForm/>
            <Title>Home</Title>
            {
                listings && listings.listings.content.map(l => <ListingCard key={l.id} listing={l}/>)
            }
        </div>
    )
}

export default Home