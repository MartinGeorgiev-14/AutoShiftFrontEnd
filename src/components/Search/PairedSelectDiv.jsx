import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { selectOption } from "../../reducers/formSelectedOptionsReducer"


const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
`

const Label = styled.label`
`

const Select = styled.select`
    width: 10rem;
    padding: 0.2rem;
    border-radius: 2px;
    border: 1px solid gray;
`

const Option = styled.option`
`
// could use child parent props
const PairedSelectDiv = ({ label, optionProp, child, parent, options, optionText }) => {
const dispatch = useDispatch()
const selectedOptions = useSelector(c => c.formSelected)

    return (
        <Div>
            <Label>{label}</Label>
            <Select onChange={a => {
                if (child && a.target.value === 'null') {
                    dispatch(selectOption({ value: a.target.value === "null" ? null : a.target.value, prop: child }))
                }

                dispatch(selectOption({ value: a.target.value === "null" ? null : a.target.value, prop: optionProp }))
            }}>
                <Option value={"null"}>All</Option>
                {
                    options.map(m => {
                        if (parent && m[parent].id === selectedOptions[parent]){
                            return (
                                <Option key={m.id} value={m.id}>{m[optionText]}</Option>
                            )
                        }else if(child){
                            return (
                                <Option key={m.id} value={m.id}>{m[optionText]}</Option>
                            )
                        }
                    
                        return null
                        
                    })
                }
            </Select>

        </Div>
    )
}

export default PairedSelectDiv