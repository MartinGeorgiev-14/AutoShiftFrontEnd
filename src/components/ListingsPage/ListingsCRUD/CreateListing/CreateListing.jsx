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

const Form = styled.form`
`

const Div = styled.div`
`

const Button = styled.button`
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

    }

    return (
        <Form onSubmit={handleFormSubmit}>
            <h1>Listing creation</h1>
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
                <textarea placeholder="Description" onChange={(event) => dispatch(selectOption({prop: "description", value: event.target.value}))}></textarea>
            </Div>
            <Div>
                <ImageInput images={images} setImages={setImages}/>
            </Div>
            <Button type="submit">Create</Button>
        </Form>
    )


    // left to do description and images and select main img.
}



export default CreateListing;