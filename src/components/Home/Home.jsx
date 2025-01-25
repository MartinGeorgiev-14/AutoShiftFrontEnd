import useDocumentTitle from "../../hooks/useDocumentTitle"
import styled from "styled-components"

const Title = styled.h1`
text-align: center
`


const Home = () => {
    useDocumentTitle('Home')
    return (
        <>
            <Title>Home</Title>
        </>
    )
}

export default Home