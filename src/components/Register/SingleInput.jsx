import styled from "styled-components";

const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`
const Label = styled.label`
    font-size: 1.2rem;
`

const Input = styled.input`
    width: 70%;
    padding: 5px;
    font-size: 1.1rem;
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