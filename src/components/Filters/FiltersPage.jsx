import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { setSearchResult } from "../../reducers/filtersReducer"
import { displayNotification } from "../../reducers/notificationReducer"
import FilterContainer from "./FilterContainer"
import FavoriteButtonSelector from "./FavoriteButtonSelector"
import favoritesService from "../../services/favoritesService"


const FiltersPage = () => {
    const dispatch = useDispatch()
    const filters = useSelector(state => state.filterReducer)
   
    console.log("filters", filters)

    useEffect(() => {
        favoritesService.getFavoriteFilters().then(result => {
            console.log("result", result)
            dispatch(setSearchResult(result))
        }).catch(error => {
            dispatch(displayNotification({type: 'error', message: "Error getting favorite filters"}))
        })
    }, [])

    return(
        <div>
            <div>
                {filters && filters.filters.content.map(f => <FilterContainer key={f.id} filter={f}/>)}
            </div>
            {filters && <FavoriteButtonSelector service={favoritesService.getFavoriteFilters} reducer="filterReducer" entry="filters" setResult={setSearchResult}/>}
        </div>
    )
}

export default FiltersPage