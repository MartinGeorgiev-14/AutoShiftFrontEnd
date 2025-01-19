import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setFormOptions } from "../../reducers/formOptionsReducer"
import { setListingsPage } from "../../reducers/listingPageReducer"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import searchFormService from '../../services/searchFormService'
import styled from "styled-components"
import PairedSelectDiv from "./PairedSelectDiv"
import SingleSelectDiv from "./SingleSelectDiv"
import InputDiv from "./InputDiv"

const Form = styled.form`
`
const Div = styled.div`
`
const Button = styled.button`
`

const SearchForm = () => {
const dispatch = useDispatch()
const navigate = useNavigate()
const formOptions = useSelector(o => o.formOptions)
const selectedOptions = useSelector(o => o.formSelected)

useEffect(() => {
    searchFormService.getFormOptions().then(result => {
        dispatch(setFormOptions(result))
    })
}, [])
    

if(Object.values(formOptions).length <= 0){
    return null
}

const search = async (event) => {
    event.preventDefault()

    const result = await searchFormService.searchCarByCriteria(selectedOptions)
    dispatch(setListingsPage(result))

    navigate(`/listings`)
}


    return(
        <div>
            <h2>Search car</h2>
            <Form onSubmit={search}>
                <Div>
                    <PairedSelectDiv label={"Make"} optionProp={"make"} child={"model"} parent={null} options={formOptions.makeOptions} optionText={"name"} />
                    <PairedSelectDiv label={"Model"} optionProp={"model"} child={null} parent={"make"} options={formOptions.modelOptions} optionText={"name"}/>
                </Div>
                <Div>
                    <PairedSelectDiv label={"Region"} optionProp={"region"} child={"location"} parent={null} options={formOptions.regionOptions} optionText={"region"} />
                    <PairedSelectDiv label={"Location"} optionProp={"location"} child={null} parent={"region"} options={formOptions.locationOptions} optionText={"location"} />
                </Div>
                <Div>
                    <SingleSelectDiv label={"Engine"} optionProp={"engine"} options={formOptions.engineOptions} optionText={"type"} />
                    <SingleSelectDiv label={"Gearbox"} optionProp={"gearbox"} options={formOptions.gearboxOptions} optionText={"type"} />
                </Div>
                <Div>
                    <SingleSelectDiv label={"Body Type"} optionProp={"body"} options={formOptions.bodyOptions} optionText={"body"} />
                </Div>
                <Div>
                   <InputDiv label={"Min price"} optionProp={"startPrice"}/>
                   <InputDiv label={"Max price"} optionProp={"endPrice"}/>
                </Div>
                <Div>
                    <Button type="submit">Search</Button>
                </Div>
            </Form>
        </div>
    )

}

export default SearchForm