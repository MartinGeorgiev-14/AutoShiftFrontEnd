import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import searchFormSevice from "../../../services/searchFormService"
import { useEffect } from "react"
import { setSearchResult } from "../../../reducers/searchResultReducer"
import ListingContainerCRUD from "./ListingContainerCRUD"
import ButtonSelector from "../SearchResultPage/ButtonSelector";
import searchFormService from "../../../services/searchFormService";
import { useState } from "react";
import useDocumentTitle from "../../../hooks/useDocumentTitle";

const UserListings = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const searchResult = useSelector(state => state.searchResult)
    const user = useSelector(state => state.user) 
    useDocumentTitle("My Listings")

    useEffect(() => {
        if(user.userId){
            searchFormSevice.searchCarByUser().then(result => {
                dispatch(setSearchResult(result))
                // dispatch(selectOption({prop: 'userId', value: user.userId})) 
            })
        }
        else{
            navigate("/")
        }


    },[])


    if(Object.keys(searchResult).length === 1){
        return(
            <div className="w-full flex flex-col item-center">
                <p>Loading...</p>
            </div>
        )
    }

    return(
        <div className="listings-page-container">
            <h2 className="page-heading">My Listings</h2>
            {
               searchResult.listings.content ? searchResult.listings.content.map(l => {
                 return (
                 <ListingContainerCRUD key={l.id} listing={l}/>
                ) 
                }) : <p className="text-center text-2xl mt-10">You don't have any listings</p>
            }
            <ButtonSelector service={searchFormService.searchCarByUser}/>
        </div>
    )
}

export default UserListings;