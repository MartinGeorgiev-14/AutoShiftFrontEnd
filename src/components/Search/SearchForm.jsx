import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setFormOptions } from "../../reducers/formOptionsReducer"
import { setSearchResult } from "../../reducers/searchResultReducer"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import searchFormService from '../../services/searchFormService'
import styled from "styled-components"
import PairedSelectDiv from "./PairedSelectDiv"
import SingleSelectDiv from "./SingleSelectDiv"
import InputDiv from "./InputDiv"
import useDocumentTitle from "../../hooks/useDocumentTitle"

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

const SearchForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formOptions = useSelector(o => o.formOptions.options)
    const selectedOptions = useSelector(o => o.formSelected)
    useDocumentTitle("Search")

    useEffect(() => {
        searchFormService.getFormOptions().then(result => {
            dispatch(setFormOptions(result))

        })
    }, [])

    if (!formOptions) {
        return null
    }

    const search = async (event) => {
        event.preventDefault()
        const result = await searchFormService.searchCarByCriteria(selectedOptions)
        dispatch(setSearchResult(result))
        navigate(`/listings`)
    }

    console.log("formOptions", formOptions)

    return (
        <Container>
            <h2>Search car</h2>
            <Form onSubmit={search}>
                <Div>
                    <PairedSelectDiv label={"Make"} optionProp={"make"} child={"model"} parent={null} options={formOptions.makeOptions} optionText={"name"} />
                    <PairedSelectDiv label={"Model"} optionProp={"model"} child={null} parent={"make"} options={formOptions.modelOptions} optionText={"name"} />
                </Div>
                <Div>
                    <SingleSelectDiv label={"Engine"} optionProp={"engine"} options={formOptions.engineOptions} optionText={"type"} />
                    <SingleSelectDiv label={"Gearbox"} optionProp={"gearbox"} options={formOptions.gearboxOptions} optionText={"type"} />
                </Div>
                <Div>
                    <PairedSelectDiv label={"Region"} optionProp={"region"} child={"location"} parent={null} options={formOptions.regionOptions} optionText={"region"} />
                    <PairedSelectDiv label={"Location"} optionProp={"location"} child={null} parent={"region"} options={formOptions.locationOptions} optionText={"location"} />
                </Div>

                <Div>
                    <SingleSelectDiv label={"Color"} optionProp={"color"} options={formOptions.colorOptions} optionText={"color"} />
                </Div>
                <Div>
                    <SingleSelectDiv label={"euroStandard"} optionProp={"euroStandard"} options={formOptions.euroStandardOptions} optionText={"standard"} />
                </Div>
                <Div>
                    <SingleSelectDiv label={"Body Type"} optionProp={"body"} options={formOptions.bodyOptions} optionText={"body"} />
                </Div>
                <Div>
                    <InputDiv label={"Price Start"} optionProp={"priceStart"} type={"number"}/>
                    <InputDiv label={"Price End"} optionProp={"priceEnd"} type={"number"}/>
                </Div>
                <Div>
                    <InputDiv label={"Manufacture Date Start"} optionProp={"manufactureDateStart"} type={"date"}/>
                    <InputDiv label={"Manufacture Date End"} optionProp={"manufactureDateEnd"} type={"date"}/>
                </Div>
                <Div>
                    <InputDiv label={"Horsepower Start"} optionProp={"horsepowerStart"} type={"number"}/>
                    <InputDiv label={"Horsepower End"} optionProp={"horsepowerEnd"} type={"number"}/>
                </Div>
                <Div>
                    <InputDiv label={"Mileage Start"} optionProp={"mileageStart"} type={"number"}/>
                    <InputDiv label={"Mileage End"} optionProp={"mileageEnd"} type={"number"}/>
                </Div>
                <Div>
                    <InputDiv label={"Engine Displacement Start"} optionProp={"engineDisplacementStart"} type={"number"}/>
                    <InputDiv label={"Engine Displacement End"} optionProp={"engineDisplacementEnd"} type={"number"}/>
                </Div>
            </Form>
            <Button type="submit" onClick={search}>Search</Button>
        </Container>
    )

}

export default SearchForm