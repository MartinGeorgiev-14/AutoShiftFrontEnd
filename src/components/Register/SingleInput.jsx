import styled from "styled-components";

const SingleInput = ({ label, type, name, autoComplete}) => {

    return(
        <div className="flex flex-col items-center lg:w-[60%]">
            <label className="text-lg" htmlFor={name}>{label}</label>
            <input className="w-full p-1 border rounded-lg" type={type} name={name} autoComplete={autoComplete}/>
        </div>
    )
}

export default SingleInput;