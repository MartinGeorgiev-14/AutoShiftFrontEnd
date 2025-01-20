import styled from "styled-components";
import { Link } from "react-router-dom";

const Div = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #f1f1f1;  
    text-decoration: none;  

    a{
        text-decoration: none;
        color: black;
    }

    a:hover{
        text-decoration: underline;
    }
`

const Title = styled.h2`
`

const TitleDiv = ({id, make, model, price }) => {

    return(
        <Div>
            <Link to={`/listing/${id}`}>
                <Title>{make} {model}</Title>
            </Link>
            <Title>{price} BGN</Title>
        </Div>
    )
}

export default TitleDiv;