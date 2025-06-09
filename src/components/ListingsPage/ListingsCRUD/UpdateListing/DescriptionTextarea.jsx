import styled from "styled-components";
import { selectOption } from "../../../../reducers/formSelectedOptionsReducer";
import { useDispatch } from "react-redux";

const DescriptionTextarea = () => {
    const dispatch = useDispatch()

    return (
        <div className="flex flex-col items-center lg:w-full lg:h-full">
            <label>Description</label>
            <textarea className="lg:w-[70%] lg:h-full border rounded-lg lg:p-2 resize-none" type="text" name="description" onChange={(event) => dispatch(selectOption({prop: "description", value: event.target.value}))}/>
        </div>
    );
 
}

export default DescriptionTextarea;