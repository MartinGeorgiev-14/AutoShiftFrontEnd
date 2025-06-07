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

    return (
        <div className="search-form">
            <h2 className="text-2xl">Search car</h2>
            <form className="form" onSubmit={search}>
                <div>
                    <PairedSelectDiv label={"Make"} optionProp={"make"} child={"model"} parent={null} options={formOptions.makeOptions} optionText={"name"} />
                    <PairedSelectDiv label={"Model"} optionProp={"model"} child={null} parent={"make"} options={formOptions.modelOptions} optionText={"name"} />
                </div>
                <div>
                    <SingleSelectDiv label={"Engine"} optionProp={"engine"} options={formOptions.engineOptions} optionText={"type"} />
                    <SingleSelectDiv label={"Gearbox"} optionProp={"gearbox"} options={formOptions.gearboxOptions} optionText={"type"} />
                </div>
                <div>
                    <PairedSelectDiv label={"Region"} optionProp={"region"} child={"location"} parent={null} options={formOptions.regionOptions} optionText={"region"} />
                    <PairedSelectDiv label={"Location"} optionProp={"location"} child={null} parent={"region"} options={formOptions.locationOptions} optionText={"location"} />
                </div>

                <div>
                    <SingleSelectDiv label={"Color"} optionProp={"color"} options={formOptions.colorOptions} optionText={"color"} />
                </div>
                <div>
                    <SingleSelectDiv label={"Euro Standard"} optionProp={"euroStandard"} options={formOptions.euroStandardOptions} optionText={"standard"} />
                </div>
                <div>
                    <SingleSelectDiv label={"Body Type"} optionProp={"body"} options={formOptions.bodyOptions} optionText={"body"} />
                </div>
                <div>
                    <InputDiv label={"Price Start"} optionProp={"priceStart"} type={"number"}/>
                    <InputDiv label={"Price End"} optionProp={"priceEnd"} type={"number"}/>
                </div>
                <div>
                    <InputDiv label={"Manufacture Date Start"} optionProp={"manufactureDateStart"} type={"date"}/>
                    <InputDiv label={"Manufacture Date End"} optionProp={"manufactureDateEnd"} type={"date"}/>
                </div>
                <div>
                    <InputDiv label={"Horsepower Start"} optionProp={"horsepowerStart"} type={"number"}/>
                    <InputDiv label={"Horsepower End"} optionProp={"horsepowerEnd"} type={"number"}/>
                </div>
                <div>
                    <InputDiv label={"Mileage Start"} optionProp={"mileageStart"} type={"number"}/>
                    <InputDiv label={"Mileage End"} optionProp={"mileageEnd"} type={"number"}/>
                </div>
                <div>
                    <InputDiv label={"Engine Displacement Start"} optionProp={"engineDisplacementStart"} type={"number"}/>
                    <InputDiv label={"Engine Displacement End"} optionProp={"engineDisplacementEnd"} type={"number"}/>
                </div>
            </form>
            <button className="search-button" type="submit" onClick={search}>Search</button>
        </div>
    )

}

export default SearchForm