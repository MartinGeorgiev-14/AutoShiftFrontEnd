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

const Container = styled.div`
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

const Textarea = styled.textarea`
`

const EditListing = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const formOptions = useSelector(o => o.formOptions)
    const selected = useSelector(o => o.formSelected)
    const [info, setInfo] = useState()

    console.log(selected, 'selected')

    useEffect(() => {
        listingCrudService.getListingById(id).then(result => {
            setInfo(result)
        })

    },[])

    const handlePatch = async (event) => {
        event.preventDefault()

        const result = await listingCrudService.patchListing(id, selected)

        if(result === 200){
            const updatedListing = await listingCrudService.getListingById(id)
        
            setInfo(updatedListing)
            dispatch(clearOptions())
            dispatch(displayNotification({type: "success", message: "Successfully updated listing"}))
        }

    
    }


   if(!info){
    return null
   }
   
    return(
        <Container>
            <h1>Editing listing</h1>
            <ShowEditedListing listing={info}/>
            <Form >
                
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
      
            </Form>
            <Button type="submit" onClick={handlePatch}>Edit</Button>
        </Container>
    )
}

export default EditListing