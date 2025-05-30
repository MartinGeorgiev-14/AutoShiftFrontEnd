import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { setSearchResult } from "../../reducers/filtersReducer"
import favoritesService from "../../services/favoritesService"
import { displayNotification } from "../../reducers/notificationReducer"
import FilterContainer from "./FilterContainer"

const FiltersPage = () => {
    const dispatch = useDispatch()
    const filters = useSelector(state => state.filterReducer)

    console.log("filters", filters)

    useEffect(() => {
        favoritesService.getFavoriteFilters().then(result => {
            dispatch(setSearchResult(result))
        }).catch(error => {
            dispatch(displayNotification({type: 'error', message: "Error getting favorite filters"}))
        })
    }, [])

    return(
        <div>
            {filters && filters.filters.content.map(f => <FilterContainer key={f.id} filter={f}/>)}
        </div>
    )
}

export default FiltersPage