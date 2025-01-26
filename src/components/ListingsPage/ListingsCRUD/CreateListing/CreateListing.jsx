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


const Component = styled.div`
  background-color: #f9f9f9;
    width: 40%;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 4px;
    padding: 2rem;
`

const Form = styled.form`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
`

const Div = styled.div`
    width: fit-content;
`

const Button = styled.button`
    background-color: #E2323D;
    border: none;
    padding: 10px 20px;
    border-radius: 40px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 50%;
    margin: 0 auto;
    font-size: 1.2rem;
    color: white;

    &:hover{
        background-color:rgb(220, 87, 96);
    }
`

const CreateListing = () => {
    const dispatch = useDispatch()
    const formOptions = useSelector(o => o.formOptions)
    const selectedOptions = useSelector(o => o.formSelected)
    const [images, setImages] = useState([])


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
        
        const formData = new FormData()

        for(const key in selectedOptions){
            formData.append(key, selectedOptions[key]) 
        }

        images.forEach((image, index) => {
            formData.append(`uploadImages`, image);
        })

        const data = await listingCrudService.createListing(formData)
        
        if(data === 201){
            dispatch(displayNotification({type: 'success', message: 'Listing successfuly created'}))
        }

    }

    return (
        <Component>
            <h1>Listing creation</h1>
            <Form onSubmit={handleFormSubmit}>
                <Div>
                    <PairedSelectDiv label={"Make"} optionProp={"make"} child={"model"} parent={null} options={formOptions.makeOptions} optionText={"name"} />
                    <PairedSelectDiv label={"Model"} optionProp={"model"} child={null} parent={"make"} options={formOptions.modelOptions} optionText={"name"} />
                </Div>
                <Div>
                    <SingleSelectDiv label={"Engine"} optionProp={"engine"} options={formOptions.engineOptions} optionText={"type"} />
                    <SingleSelectDiv label={"Gearbox"} optionProp={"gearbox"} options={formOptions.gearboxOptions} optionText={"type"} />
                </Div>
                <Div>
                    <SingleSelectDiv label={"Body Type"} optionProp={"body"} options={formOptions.bodyOptions} optionText={"body"} />
                </Div>
                <Div>
                    <InputDiv label={"Mileage km"} optionProp={"mileage"}/>
                    <InputDiv label={"Price BGN"} optionProp={"price"}/>
                </Div>
                <Div>
                    <InputDiv label={"Engine Displacement"} optionProp={"engineDisplacement"}/>
                    <InputDiv label={"Horsepower"} optionProp={"horsepower"}/>
                </Div>
                <Div>
                    <PairedSelectDiv label={"Region"} optionProp={"region"} child={"location"} parent={null} options={formOptions.regionOptions} optionText={"region"} />
                    <PairedSelectDiv label={"Location"} optionProp={"location"} child={null} parent={"region"} options={formOptions.locationOptions} optionText={"location"} />
                </Div>
                <Div>
                    <DescriptionTextarea></DescriptionTextarea>
                </Div>
                <Div>
                    <ImageInput images={images} setImages={setImages}/>
                </Div>
                
            </Form>
            <Button onClick={handleFormSubmit}>Create</Button>
        </Component>
    )


    // left to do description and images and select main img.
}



export default CreateListing;