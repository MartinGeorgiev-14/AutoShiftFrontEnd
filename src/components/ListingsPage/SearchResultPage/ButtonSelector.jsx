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
`

const Button = styled.button`
`

const Div = styled.div`
`

const Indicator = styled.p`
`

const Label = styled.label`
`

const InputPage = styled.input`
`

const ButtonSelector = () => {
    const dispatch = useDispatch()
    const listings = useSelector(o => o.searchResult)
    const formOptions = useSelector(f => f.formSelected)
    const [goToPage, setGoToPage] = useState(0)

    const handleButton = async (event, pageNo) => {
        event.preventDefault()
        
        if(pageNo > listings.totalPages - 1 || pageNo < 0){
            return
        }

        const response = await searchFormService.searchCarByCriteria(formOptions, pageNo)
        dispatch(setSearchResult(response))
    }
    
    console.log(listings)

    return(
        <Container>
            <Div>
                <Button onClick={(e) => handleButton(e, 0)}><MdFirstPage/></Button>
                <Button onClick={(e) => handleButton(e, listings.pageNo - 1)}><MdNavigateBefore/></Button>
                <Indicator>{listings.pageNo}</Indicator>
                <Button onClick={(e) => handleButton(e, listings.pageNo + 1)}><MdNavigateNext/></Button>
                <Button onClick={(e) => handleButton(e, listings.totalPages - 1)}><MdLastPage/></Button>
            </Div>
            <Div>
                <Label>Jump to</Label>
                <InputPage type="number" onChange={(e) => setGoToPage(e.target.value)}/>
                <Button onClick={(e) => handleButton(e, goToPage)}></Button>
            </Div>
            
        </Container>
    )
}

export default ButtonSelector