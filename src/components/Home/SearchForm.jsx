import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setFormOptions } from "../../reducers/formOptionsReducer"
import { selectOption } from "../../reducers/formSelectedOptionsReducer"
import { useSelector } from "react-redux"
import searchFormService from '../../services/searchFormService'
import styled from "styled-components"
import SelectDiv from "./SelectDiv"

const Form = styled.form`
`
const Div = styled.div`
`



const SearchForm = () => {
const dispatch = useDispatch()
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

// console.log(selectedOptions, "regiononOptions")
console.log(formOptions.engineOptions, "engineOptions")
// console.log(selectedOptions)

const search = () => {

}


    return(
        <div>
            <h2>Search car</h2>
            <Form onSubmit={search}>
                <Div>
                    <SelectDiv label={"Make"} optionProp={"make"} child={"model"} parent={null} options={formOptions.makeOptions} optionText={"name"} />
                    <SelectDiv label={"Model"} optionProp={"model"} child={null} parent={"make"} options={formOptions.modelOptions} optionText={"name"}/>
                </Div>
                <Div>
                    <SelectDiv label={"Region"} optionProp={"region"} child={"location"} parent={null} options={formOptions.regionOptions} optionText={"region"} />
                    <SelectDiv label={"Location"} optionProp={"location"} child={null} parent={"region"} options={formOptions.locationOptions} optionText={"location"} />
                </Div>
                <SelectDiv label={"Engine"} optionProp={"engine"} child={null} parent={null} options={formOptions.engineOptions} optionText={"type"} />
            </Form>
        </div>
    )

}

export default SearchForm