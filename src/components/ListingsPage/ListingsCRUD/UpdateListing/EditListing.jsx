import styled from "styled-components";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import listingCrudService from "../../../../services/listingCrudService";
import { useState } from "react";
import { setOptions, clearOptions } from "../../../../reducers/formSelectedOptionsReducer";
import { selectOption } from "../../../../reducers/formSelectedOptionsReducer";
import PairedSelectDiv from "../../../Search/PairedSelectDiv";
import SingleSelectDiv from "../../../Search/SingleSelectDiv";
import InputDiv from "../../../Search/InputDiv";
import ShowEditedListing from "./ShowInfoListing";
import SelectMainImg from "./SelectMainImg"
import DescriptionTextarea from "./DescriptionTextarea";
import { displayNotification } from "../../../../reducers/notificationReducer";
import ListingData from "./ListingData";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from "react-router";
import useDocumentTitle from "../../../../hooks/useDocumentTitle";


const EditListing = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const formOptions = useSelector(o => o.formOptions.options)
    const navigate = useNavigate()
    const selected = useSelector(o => o.formSelected)
    const [info, setInfo] = useState()
    const [isLoading, setIsLoading] = useState(false)
    useDocumentTitle("Edit Listing")

    console.log("id", id)
    console.log("info", info)
    useEffect(() => {
        listingCrudService.getListingById(id).then(result => {
            setInfo(result)
        })

    },[])

    const handlePatch = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        try{
            const result = await listingCrudService.patchListing(id, selected)
            
            if(result.status === 200){
                const updatedListing = await listingCrudService.getListingById(id)
            
                setInfo(updatedListing)
                dispatch(clearOptions())
                dispatch(displayNotification({type: "success", message: "Successfully updated listing"}))
                setIsLoading(false)
                navigate("/listing/" + id)
            }
        }
        catch{
            dispatch(displayNotification({type: "error", message: "Error updating listing"}))
        }
    }


   if(!info || Object.keys(formOptions).length === 0){
    return null
   }
   
    return(
        <div className="edit-listing-container">
            <h2 className="page-heading pt-5">Editing listing</h2>
            {/* <ShowEditedListing listing={info}/> */}
            <ListingData/>
            <form className="bg-custom-gray lg:w-[70%] mx-auto grid grid-cols-4 lg:p-5 lg:gap-5 lg:grid-rows-[auto_auto_auto_15rem]">
                <h3 className="text-2xl col-span-full text-center">New Data</h3>
                <div>
                    <PairedSelectDiv label={"Make"} optionProp={"make"} child={"model"} parent={null} options={formOptions.makeOptions} optionText={"name"} />
                    <PairedSelectDiv label={"Model"} optionProp={"model"} child={null} parent={"make"} options={formOptions.modelOptions} optionText={"name"} />
                </div>
                <div>
                    <SingleSelectDiv label={"Engine"} optionProp={"engine"} options={formOptions.engineOptions} optionText={"type"} />
                    <SingleSelectDiv label={"Gearbox"} optionProp={"gearbox"} options={formOptions.gearboxOptions} optionText={"type"} />
                </div>
                <div>
                    <SingleSelectDiv label={"Body Type"} optionProp={"body"} options={formOptions.bodyOptions} optionText={"body"} />
                    <InputDiv label={"Mileage km"} optionProp={"mileage"}/>
                </div>
                <div>
                    <InputDiv label={"Price BGN"} optionProp={"price"}/>
                </div>
                <div className="col-span-2">
                    <InputDiv label={"Engine Displacement"} optionProp={"engineDisplacement"}/>
                    <InputDiv label={"Horsepower"} optionProp={"horsepower"}/>
                </div>
                <div className="col-span-2">
                    <PairedSelectDiv label={"Region"} optionProp={"region"} child={"location"} parent={null} options={formOptions.regionOptions} optionText={"region"} />
                    <PairedSelectDiv label={"Location"} optionProp={"location"} child={null} parent={"region"} options={formOptions.locationOptions} optionText={"location"} />
                </div>
                <div className="col-span-full">
                    <DescriptionTextarea></DescriptionTextarea>
                </div>
                {isLoading ? <button className="col-span-full bg-custom-blue text-white hover:bg-custom-hover-blue hover-transition cursor-pointer lg:w-[50%] mx-auto lg:px-2 lg:py-1 rounded-lg flex items-center justify-center"><svg className="mr-3 size-5 animate-spin"><AiOutlineLoading/></svg><p>Loading</p></button> :
                <button className="col-span-full bg-custom-blue text-white hover:bg-custom-hover-blue hover-transition cursor-pointer lg:w-[50%] mx-auto lg:px-2 lg:py-1 rounded-lg" type="submit" onClick={handlePatch}>Edit</button>}
            </form>
            
        </div>
    )
}

export default EditListing