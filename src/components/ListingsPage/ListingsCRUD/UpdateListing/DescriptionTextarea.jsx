import styled from "styled-components";
import { selectOption } from "../../../../reducers/formSelectedOptionsReducer";
import { useDispatch } from "react-redux";

const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Label = styled.label`

`
const Textarea = styled.textarea`
    width: 10rem;
    padding: 0.2rem;
    border-radius: 2px;
    border: 1px solid gray;
    width: 20rem;
    height: 8rem;
`
const DescriptionTextarea = () => {
    const dispatch = useDispatch()

    return (
        <Div>
            <Label>Description</Label>
            <Textarea type="text" name="description" onChange={(event) => dispatch(selectOption({prop: "description", value: event.target.value}))}/>
        </Div>
    );
 
}

export default DescriptionTextarea;