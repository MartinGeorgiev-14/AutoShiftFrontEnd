import HeroImg from "../TopBackground"
import useDocumentTitle from "../../hooks/useDocumentTitle"
import SearchForm from "./SearchForm"

const Search = () => {
    useDocumentTitle('Search')
    return (
        <>
            <SearchForm></SearchForm>
        </>
    )
}

export default Search