import HeroImg from "../TopBackground"
import useDocumentTitle from "../../hooks/useDocumentTitle"
import SearchForm from "../Home/SearchForm"

const Home = () => {
    useDocumentTitle('Home')
    return (
        <>
            <SearchForm></SearchForm>
        </>
    )
}

export default Home