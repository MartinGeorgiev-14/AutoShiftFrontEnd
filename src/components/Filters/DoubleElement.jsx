import { add } from "lodash"

const DoubleElement = ({ firstTitle, secondTitle, firstVar, secondVar, additional = "" }) => {

    if(firstVar != null && secondVar != null){
        return(
            <div>
                <p>{firstTitle} and {secondTitle}</p>
                <p>{`${firstVar} ${additional} ${secondVar} ${additional}`}</p>
            </div>
        )
    }
    else if(firstVar != null){
        return(
        <div>
            <p>{firstTitle}</p>
            <p>{`${firstVar} ${additional}`}</p>
        </div>
        )
    }
    else if(secondVar != null){
        return(
            <div>
                <p>{secondTitle}</p>
                <p>{`${secondVar} ${additional}`}</p>
            </div>
        )
    }
    else{
        return null
    }
}

export default DoubleElement