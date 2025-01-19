import styled from "styled-components";

const Div = styled.div`
`
const Label = styled.label`
`

const Input = styled.input`
`

const SingleInput = ({ label, type, name, autoComplete}) => {

    return(
        <Div>
            <Label htmlFor={name}>{label}</Label>
            <Input type={type} name={name} autoComplete={autoComplete}></Input>
        </Div>
    )
}

export default SingleInput;