import styled from "styled-components";

const Container = styled.div`

    width: 70%;
    margin: 1rem auto;
    border: 1px solid gray;
    padding: 1rem;
`

const Title = styled.h2`
    text-align: center;
`

const Info = styled.p`
    text-align: justify;
`

const AdditionalInformation = ({ listing }) => {
    

    return (
        <Container>
            <Title>Additional Information</Title>
            <Info>{listing.description}</Info>
        </Container>
    )
}

export default AdditionalInformation