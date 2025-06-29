import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { setSearchResult } from "../../reducers/filtersReducer"
import { displayNotification } from "../../reducers/notificationReducer"
import FilterContainer from "./FilterContainer"
import FavoriteButtonSelector from "./FavoriteButtonSelector"
import favoritesService from "../../services/favoritesService"
import useDocumentTitle from "../../hooks/useDocumentTitle"


const FiltersPage = () => {
    const dispatch = useDispatch()
    const filters = useSelector(state => state.filterReducer)
    useDocumentTitle("Favorite Filters")

    useEffect(() => {
        favoritesService.getFavoriteFilters().then(result => {
            dispatch(setSearchResult(result))
        }).catch(error => {
            dispatch(displayNotification({type: 'error', message: "Error getting favorite filters"}))
        })
    }, [])

    return(
        <div className="favorite-filters-page">
            <h2 className="page-heading">Favorite Filters</h2>
            {filters && filters.filters.content.map(f => <FilterContainer key={f.id} filter={f}/>)}
            {filters && <FavoriteButtonSelector service={favoritesService.getFavoriteFilters} reducer="filterReducer" entry="filters" setResult={setSearchResult}/>}
        </div>
    )
}

export default FiltersPage