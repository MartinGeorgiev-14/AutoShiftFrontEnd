import styled from "styled-components";

const Container = styled.div`
    height: 12%;
    color: dimgray;
    overflow: hidden;
`


const InitialDesription = ({ description }) => {

    return (
        <Container>
            {description}
        </Container>
    )
 
}

export default InitialDesription;