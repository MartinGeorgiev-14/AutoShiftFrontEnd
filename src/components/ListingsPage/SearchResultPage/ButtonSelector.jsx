import styled from "styled-components";
import searchFormService from "../../../services/searchFormService";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { setSearchResult } from "../../../reducers/searchResultReducer";
import { MdFirstPage } from "react-icons/md";
import { MdLastPage } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";


const ButtonSelector = ({ service }) => {
    const dispatch = useDispatch()
    const listings = useSelector(o => o.searchResult.listings)
    const formOptions = useSelector(f => f.formSelected)
    const [goToPage, setGoToPage] = useState(0)

    const handleButton = async (event, pageNo) => {
        event.preventDefault()
        
        if(goToPage > 0){
            return
        }

        if(pageNo > listings.totalPages - 1 || pageNo < 0){
            return
        }

        const response = await service(formOptions, pageNo)
        dispatch(setSearchResult(response))
    }

    return(
        <div className="button-selector-container">
            <div className="flex items-center">
                <button className="button-select rounded-l-lg shadow-2xl" onClick={(e) => handleButton(e, 0)}><MdFirstPage/></button>
                <button className="button-select rounded-r-lg shadow-2xl" onClick={(e) => handleButton(e, listings.pageNo - 1)}><MdNavigateBefore/></button>
                <p className="px-5">{listings.pageNo + 1}</p>
                <button className="button-select rounded-l-lg shadow-2xl" onClick={(e) => handleButton(e, listings.pageNo + 1)}><MdNavigateNext/></button>
                <button className="button-select rounded-r-lg shadow-2xl" onClick={(e) => handleButton(e, listings.totalPages - 1)}><MdLastPage/></button>
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

export default ButtonSelector