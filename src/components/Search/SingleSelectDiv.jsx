import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { selectOption } from "../../reducers/formSelectedOptionsReducer"

const Div = styled.div`
`

const Label = styled.label`
`

const Select = styled.select`
`

const Option = styled.option`
`

const SingleSelectDiv = ({ label, optionProp, options, optionText}) => {
const dispatch = useDispatch();

    return(
        <Div>
            <Label>{label}</Label>
            <Select onChange={a => {dispatch(selectOption({ value: a.target.value === "null" ? null : a.target.value, prop: optionProp }))}}>
                <Option value={"null"}>All</Option>
                {
                    options.map(o => {
                        return(
                            <Option key={o.id} value={o.id}>{o[optionText]}</Option>
                        )
                    })
                }
            </Select>
        </Div>
    )
}

export default SingleSelectDiv