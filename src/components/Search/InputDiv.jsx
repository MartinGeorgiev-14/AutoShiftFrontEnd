import styled from "styled-components"
import { useDispatch } from "react-redux"
import { selectOption } from "../../reducers/formSelectedOptionsReducer"


const Div = styled.div`
`

const Label = styled.label`

`
const Input = styled.input`
`

const InputDiv = ({ label, optionProp }) => {
    const dispatch = useDispatch()

    return(
        <Div>
            <Label>{ label }</Label>
            <Input type="number" onChange={a => dispatch(selectOption({value: a.target.value, prop: optionProp}))}/>
        </Div>
    )
}

export default InputDiv