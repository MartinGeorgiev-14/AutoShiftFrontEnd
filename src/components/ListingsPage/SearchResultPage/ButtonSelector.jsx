import styled from "styled-components";
import searchFormService from "../../../services/searchFormService";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { setSearchResult } from "../../../reducers/searchResultReducer";
import { MdFirstPage } from "react-icons/md";
import { MdLastPage } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
`

const Button = styled.button`
    display: flex;
    align-items: center;
    color: #E2323D;
    background-color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0 4px 4px 0;

    &:hover{
        cursor: pointer;
    }

`

const Div = styled.div`
    display: flex;

    &.nav{
        align-items: center;

        button:nth-of-type(odd){
            border-radius: 4px 0px 0px 4px;
        }

         button:nth-of-type(even){
            border-radius: 0px 4px 4px 0px;
        }
    }

    &.jump{
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        text-align: center;
    }

    

`

const Indicator = styled.p`
    padding: 0 1rem;
`

const Label = styled.label`
    
`

const InputPage = styled.input`
    border-style: none;
    border-right: 1px solid black;
`

const ButtonSelector = ({ service }) => {
    const dispatch = useDispatch()
    const listings = useSelector(o => o.searchResult)
    const formOptions = useSelector(f => f.formSelected)
    const [goToPage, setGoToPage] = useState(0)

    const handleButton = async (event, pageNo) => {
        event.preventDefault()
        
        if(pageNo > listings.totalPages - 1 || pageNo < 0){
            return
        }

        const response = await service(formOptions, pageNo)
        dispatch(setSearchResult(response))
    }

    return(
        <Container>
            <Div className="nav">
                <Button onClick={(e) => handleButton(e, 0)}><MdFirstPage/></Button>
                <Button onClick={(e) => handleButton(e, listings.pageNo - 1)}><MdNavigateBefore/></Button>
                <Indicator>{listings.pageNo + 1}</Indicator>
                <Button onClick={(e) => handleButton(e, listings.pageNo + 1)}><MdNavigateNext/></Button>
                <Button onClick={(e) => handleButton(e, listings.totalPages - 1)}><MdLastPage/></Button>
            </Div>
            <Div className="jump">
                <Label>Jump to</Label>
                <Div>
                    <InputPage type="number" onChange={(e) => setGoToPage(e.target.value - 1)}/>
                    <Button onClick={(e) => handleButton(e, goToPage)}>Jump</Button>
                </Div>
            </Div>
            
        </Container>
    )
}

export default ButtonSelector