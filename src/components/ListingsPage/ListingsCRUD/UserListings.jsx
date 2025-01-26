import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import searchFormSevice from "../../../services/searchFormService"
import { useEffect } from "react"
import { setSearchResult } from "../../../reducers/searchResultReducer"
import { selectOption } from "../../../reducers/formSelectedOptionsReducer";
import ListingContainerCRUD from "./ListingContainerCRUD"
import ButtonSelector from "../SearchResultPage/ButtonSelector";
import searchFormService from "../../../services/searchFormService";
const Container = styled.div`
    display: flex;
    flex-direction: column;

`

const H1 = styled.h1`
    text-align: center;
`

const UserListings = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const searchResult = useSelector(state => state.searchResult)
    const user = useSelector(state => state.user) 
    const option = useSelector(state => state.formSelected)


    useEffect(() => {
        if(user.userId){
            searchFormSevice.searchCarByUser().then(result => {
                console.log(result)
                dispatch(setSearchResult(result))
                dispatch(selectOption({prop: 'userId', value: user.userId})) 
            })
        }
        else{
            navigate("/")
        }


    },[])

    return(
        <Container>
            <H1>My Listings</H1>
            {
               searchResult.content ? searchResult.content.map(l => {
                 return (
                 <ListingContainerCRUD key={l.id} listing={l}/>
                ) 
                }) : <p>You don't have any listings</p>
            }
            <ButtonSelector service={searchFormService.searchCarByUser}/>
        </Container>
    )
}

export default UserListings;