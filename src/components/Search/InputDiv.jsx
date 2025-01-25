import styled from "styled-components"
import { useDispatch } from "react-redux"
import { selectOption } from "../../reducers/formSelectedOptionsReducer"


const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
`

const Label = styled.label`

`
const Input = styled.input`
    width: 10rem;
    padding: 0.2rem;
    border-radius: 2px;
    border: 1px solid gray;
`

const InputDiv = ({ label, optionProp, value }) => {
    const dispatch = useDispatch()

    return(
        <Div>
            <Label>{ label }</Label>
            <Input type="number" value={value} onChange={a => dispatch(selectOption({value: a.target.value, prop: optionProp}))}/>
        </Div>
    )
}

export default InputDiv