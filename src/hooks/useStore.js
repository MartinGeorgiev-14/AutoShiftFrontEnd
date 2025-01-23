import { useState } from "react";

const useStore = (intialState) => {
    const [state, setState] = useState(intialState)
    
    const setValue = (prop, value) => {
        return {...state, [prop]: value}
    }
    
    return {state, setState, setValue}
}