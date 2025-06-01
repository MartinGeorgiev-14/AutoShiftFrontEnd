import DoubleElement from "./DoubleElement"
import SingleElement from "./SingleElements"
import favoritesService from "../../services/favoritesService"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { displayNotification } from "../../reducers/notificationReducer"
import { changeNotify } from "../../reducers/filtersReducer"
import searchFormService from "../../services/searchFormService"
import { setSearchResult } from "../../reducers/searchResultReducer"
import { removeFilter } from "../../reducers/filtersReducer"

const FilterContainer = ({ filter }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
   
    const handleNotify = async (event) => {
        event.preventDefault()
        
        try {
            const response = await favoritesService.changeNotify(filter.id)

            if(response.status === 200){
                dispatch(changeNotify(filter.id))
            }
        } catch (error) {
            console.error(error)
            dispatch(displayNotification({type: "error", message: "Error changing notification"}))
        }
    }

    const handleSeeListings = async (event) => {
        event.preventDefault()
        const data = {
            ...filter,
            make: filter.brandModel.brandId,
            model: filter.brandModel.modelId,
            color: filter.color.id,
            engine: filter.engine.id,
            euroStandard: filter.euroStandard.id,
            gearbox: filter.euroStandard.id,
            region: filter.regionLocation.regionId,
            location: filter.regionLocation.locationId,
            type: filter.typeBody.typeId,
            body: filter.typeBody.bodyId
        }

        try {
            const response = await searchFormService.searchCarByCriteria(data)
            dispatch(setSearchResult(response))
            navigate('/listings')
        } catch (error) {
            dispatch(displayNotification({type: "error", message: "Error getting listings"}))
        }
    }

    const handleRemoveFilter = async (event) => {
        event.preventDefault()

        try {
            const response = await favoritesService.removeFilterFromFavorites(filter.id)

            if(response.status === 200){
                dispatch(removeFilter(filter.id))
                dispatch(displayNotification({type: "success", message: "Filter has been remove succesfully"}))
            }
            else{
                dispatch(displayNotification({type: "error", message: "Error removing filter"}))
            }
        } catch (error) {
            dispatch(displayNotification({type: "error", message: "Error removing filter"}))
        }
    }

    return(
        <div>
            <DoubleElement firstTitle={"Make"} secondTitle={"Model"} firstVar={filter.brandModel.brand} secondVar={filter.brandModel.model}/>
            <SingleElement title={"Color"} value={filter.color.color}/>
            <SingleElement title={"Engine"} value={filter.engine.engine}/>
            <DoubleElement firstTitle={"Engine Displacement Start"} secondTitle={"Enginne Displacement End"} firstVar={filter.engineDisplacementStart} secondVar={filter.engineDisplacementEnd}/>
            <SingleElement title={"Euro Standard"} value={filter.euroStandard.euroStandard}/>
            <SingleElement title={"Gearbox"} value={filter.gearbox.gearbox}/>
            <DoubleElement firstTitle={"Horsepower Start"} secondTitle={"Horsepower End"} firstVar={filter.horsepowerStart} secondVar={filter.horsepowerEnd} additional={"Hp"}/>
            <DoubleElement firstTitle={"Manufacture Date Start"} secondTitle={"Manufacture Date End"}
            firstVar={filter.manufactureDateStart !== null ? new Date(filter.manufactureDateStart).getFullYear() : null}
            secondVar={filter.manufactureDateEnd !== null ? new Date(filter.manufactureDateEnd).getFullYear() : null}/>
            <DoubleElement firstTitle={"Mileage Start"} secondTitle={"Mileage End"} firstVar={filter.mileageStart} secondVar={filter.mileageEnd} additional={"Km"}/>
            <DoubleElement firstTitle={"Price Start"} secondTitle={"Price End"} firstVar={filter.priceStart} secondVar={filter.priceEnd} additional={"BGN"}/>
            <DoubleElement firstTitle={"Region"} secondTitle={"Location"} firstVar={filter.regionLocation.region} secondVar={filter.regionLocation.location}/>
            <DoubleElement firstTitle={"Type"} secondTitle={"Body"} firstVar={filter.typeBody.type} secondVar={filter.typeBody.body}/>
            <div>
                <div>
                    <input type="checkbox" name={filter.id} checked={filter.isNotify} onChange={handleNotify}/>
                    <label htmlFor={filter.id}>Notify me for new listings by e-mail</label>
                </div>
                <div>
                    <button onClick={handleRemoveFilter}>Remove Filter</button>
                    <button onClick={handleSeeListings}>See Listings</button>
                </div>
            </div>

            <br></br>
        </div>
    )
} 

export default FilterContainer