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
import { displayNotification } from "../../../../reducers/notificationReducer";

const Container = styled.div`
`

const Form = styled.form`
`

const Div = styled.div`
`

const Button = styled.button`
`

const EditListing = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const formOptions = useSelector(o => o.formOptions)
    const selected = useSelector(o => o.formSelected)
    const user = useSelector(o => o.user)
    const [info, setInfo] = useState()

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

    console.log(selected)

    return(
        <Container>
            <ShowEditedListing listing={info}/>
            <Form onSubmit={handlePatch}>
                <h1>Editing listing</h1>
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
                <SelectMainImg images={info.images}/>
                <Button type="submit">Edit</Button>
            </Form>
        </Container>
    )
}

export default EditListing