import styled from "styled-components";
import searchFormService from "../../services/searchFormService";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { setSearchResult } from "../../reducers/filtersReducer";
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

const FavoriteButtonSelector = ({ service, reducer = "filterReducer", access = "filters", setResult}) => {
    const dispatch = useDispatch()
    const content = useSelector(o => o[reducer][access])
    const [goToPage, setGoToPage] = useState(0)

    const handleButton = async (event, pageNo) => {
        event.preventDefault()
        console.log("enter")
        console.log("total pages", content.totalPages)
        console.log("test", pageNo > content.totalPages - 1 || pageNo < 0)
        if(pageNo > content.totalPages - 1 || pageNo < 0){
            return
        }
        console.log("service", service)
        const response = await service(pageNo)
        dispatch(setResult(response))
    }

    return(
         <div className="button-selector-container">
            <div className="flex items-center">
                <button className="button-select rounded-l-lg shadow-2xl" onClick={(e) => handleButton(e, 0)}><MdFirstPage/></button>
                <button className="button-select rounded-r-lg shadow-2xl" onClick={(e) => handleButton(e, content.pageNo - 1)}><MdNavigateBefore/></button>
                <p className="px-5">{content.pageNo + 1}</p>
                <button className="button-select rounded-l-lg shadow-2xl" onClick={(e) => handleButton(e, content.pageNo + 1)}><MdNavigateNext/></button>
                <button className="button-select rounded-r-lg shadow-2xl" onClick={(e) => handleButton(e, content.totalPages - 1)}><MdLastPage/></button>
            </div>
            <div className="flex flex-col items-center gap-1">
                <label>Jump to</label>
                <div className="flex gap-5">
                    <input className="border-3 border-custom-gray rounded-lg focus:border-sky-500 focus:outline-none lg:px-2 no-spinner
                    focus:ring-1 focus:ring-sky-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none
                    [&::-webkit-inner-spin-button]:appearance-none shadow-2xl" type="number" onChange={(e) => setGoToPage(e.target.value - 1)}/>
                    <button className="bg-custom-blue lg:p-1 rounded-lg text-custom-white hover-transition hover:bg-custom-hover-blue cursor-pointer
                    shadow-2xl" onClick={(e) => handleButton(e, goToPage)}>Jump</button>
                </div>
            </div>
            
        </div>
    )
}

export default FavoriteButtonSelector