
const DoubleElement = ({ firstTitle, secondTitle, firstVar, secondVar }) => {

    if(firstVar && secondVar){
        return(
            <div>
                <p>{firstTitle} and {secondTitle}</p>
                <p>{firstVar} {secondVar}</p>
            </div>
        )
    }
    else if(firstVar){
        return(
        <div>
            <p>{firstTitle}</p>
            <p>{firstVar}</p>
        </div>
        )
    }
    else if(secondVar){
        return(
            <div>
                <p>{secondTitle}</p>
                <p>{secondVar}</p>
            </div>
        )
    }
    else{
        return null
    }
}

export default DoubleElement