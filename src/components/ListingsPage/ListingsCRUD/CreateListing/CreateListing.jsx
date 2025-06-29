import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectOption } from "../../../../reducers/formSelectedOptionsReducer";
import { setFormOptions } from "../../../../reducers/formOptionsReducer"
import { clearOptions } from "../../../../reducers/formSelectedOptionsReducer"
import searchFormService from "../../../../services/searchFormService";
import PairedSelectDiv from "../../../Search/PairedSelectDiv";
import SingleSelectDiv from "../../../Search/SingleSelectDiv";
import InputDiv from "../../../Search/InputDiv";
import ImageInput from "./ImageInput";
import listingCrudService from "../../../../services/listingCrudService";
import { displayNotification } from "../../../../reducers/notificationReducer";
import DescriptionTextarea from "../UpdateListing/DescriptionTextarea";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from "react-router";
import useDocumentTitle from "../../../../hooks/useDocumentTitle";


const CreateListing = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formOptions = useSelector(o => o.formOptions)
    const selectedOptions = useSelector(o => o.formSelected)
    const [images, setImages] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useDocumentTitle("Create Listing")

    useState(() => {
        searchFormService.getFormOptions().then(result => {
            dispatch(setFormOptions(result))
            dispatch(clearOptions())
        })
    }, [])

    if (Object.values(formOptions).length <= 0) {
        return null
    }


    const handleFormSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData()

        for(const key in selectedOptions){
            formData.append(key, selectedOptions[key]) 
        }

        images.forEach((image, index) => {
            formData.append(`uploadImages`, image);
        })

        try {
            const data = await listingCrudService.createListing(formData)
     
        if(data.status === 201){
            dispatch(displayNotification({type: 'success', message: 'Listing successfuly created'}))
            setIsLoading(false)
            navigate("/listing/" + data.data.listing.id)
        }else{
            dispatch(displayNotification({type: 'error', message: 'Failed to create listing'}))
            setIsLoading(false)
        }
        } catch (error) {
            dispatch(displayNotification({type: 'error', message: 'Failed to create listing'}))
            setIsLoading(false)
        }

     

    }

    return (
        <div className="create-listing-container">
            <h2 className="page-heading">Listing creation</h2>
            <form className="create-listing-form" onSubmit={handleFormSubmit}>
                <div className="create-col">
                    <PairedSelectDiv label={"Make"} optionProp={"make"} child={"model"} parent={null} options={formOptions.options.makeOptions} optionText={"name"} />
                    <PairedSelectDiv label={"Model"} optionProp={"model"} child={null} parent={"make"} options={formOptions.options.modelOptions} optionText={"name"} />
                </div>
                <div className="create-col">
                    <SingleSelectDiv label={"Engine"} optionProp={"engine"} options={formOptions.options.engineOptions} optionText={"type"} />
                    <SingleSelectDiv label={"Gearbox"} optionProp={"gearbox"} options={formOptions.options.gearboxOptions} optionText={"type"} />
                </div>
                <div className="create-col">
                    <SingleSelectDiv label={"Body Type"} optionProp={"body"} options={formOptions.options.bodyOptions} optionText={"body"} />
                    <SingleSelectDiv label={"Color"} optionProp={"color"} options={formOptions.options.colorOptions} optionText={"color"} />
                </div>
                <div className="create-col">
                    <SingleSelectDiv label={"Euro Standard"} optionProp={"euroStandard"} options={formOptions.options.euroStandardOptions} optionText={"standard"} />
                    <label>Production Date</label>
                    <input type="date" name="year" onChange={e => dispatch(selectOption({value: e.target.value, prop: 'manufactureDate'}))} />
                </div>
                <div className="create-col">
                    <InputDiv label={"Mileage km"} optionProp={"mileage"}/>
                    <InputDiv label={"Price BGN"} optionProp={"price"}/>
                </div>
                <div className="create-col">
                    <InputDiv label={"Engine Displacement"} optionProp={"engineDisplacement"}/>
                    <InputDiv label={"Horsepower"} optionProp={"horsepower"}/>
                </div>
                <div className="create-col">
                    <PairedSelectDiv label={"Region"} optionProp={"region"} child={"location"} parent={null} options={formOptions.options.regionOptions} optionText={"region"} />
                    <PairedSelectDiv label={"Location"} optionProp={"location"} child={null} parent={"region"} options={formOptions.options.locationOptions} optionText={"location"} />
                </div>
                <div className="create-col col-span-4">
                    <DescriptionTextarea></DescriptionTextarea>
                </div>
                <div className="create-col col-span-4">
                    <ImageInput images={images} setImages={setImages}/>
                </div>
                
            </form>
            {isLoading ? <button className="bg-custom-blue text-white hover:bg-custom-hover-blue hover-transition cursor-pointer lg:w-[50%] mx-auto lg:px-2 lg:py-1 rounded-lg flex items-center justify-center"><svg className="mr-3 size-5 animate-spin"><AiOutlineLoading/></svg><p>Loading</p></button> :
            <button className="bg-custom-blue text-white hover:bg-custom-hover-blue hover-transition cursor-pointer lg:w-[50%] mx-auto lg:px-2 lg:py-1 rounded-lg" onClick={handleFormSubmit}>Create</button>
            }
        </div>
    )


    // left to do description and images and select main img.
}



export default CreateListing;