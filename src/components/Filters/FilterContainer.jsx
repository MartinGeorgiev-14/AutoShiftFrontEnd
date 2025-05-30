import DoubleElement from "./DoubleElement"

const FilterContainer = ({ filter }) => {
    console.log("tst", filter)
    return(
        <div>
            <DoubleElement firstTitle={"Make"} secondTitle={"Model"} firstVar={filter.brandModel.brand} secondVar={filter.brandModel.model}/>
        </div>
    )
} 

export default FilterContainer