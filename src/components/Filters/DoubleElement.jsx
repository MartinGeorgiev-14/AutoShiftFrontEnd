import { add } from "lodash"

const DoubleElement = ({ firstTitle, secondTitle, firstVar, secondVar, additional = "" }) => {

    if(firstVar != null && secondVar != null){
        return(
            <div>
                <p className="double-el-title">{firstTitle} and {secondTitle}</p>
                <p className="double-el-data">{`${firstVar} ${additional} ${secondVar} ${additional}`}</p>
            </div>
        )
    }
    else if(firstVar != null){
        return(
        <div>
            <p className="double-el-title">{firstTitle}</p>
            <p className="double-el-data">{`${firstVar} ${additional}`}</p>
        </div>
        )
    }
    else if(secondVar != null){
        return(
            <div>
                <p className="double-el-title">{secondTitle}</p>
                <p className="double-el-data">{`${secondVar} ${additional}`}</p>
            </div>
        )
    }
    else{
        return null
    }
}

export default DoubleElement