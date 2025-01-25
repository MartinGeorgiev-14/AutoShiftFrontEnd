import styled from "styled-components";
import { Link } from "react-router-dom";

const Div = styled.div`
    display: flex;
    justify-content: space-between;
    text-decoration: none;  

    a{
        text-decoration: none;
        color: black;
    }

    a:hover{
        text-decoration: underline;
    }
`

const T = styled.h2`
`

const Title = ({id, make, model, price }) => {

    return(
        <Div>
            <Link to={`/listing/${id}`}>
                <T>{make} {model}</T>
            </Link>
            <T>{price} BGN</T>
        </Div>
    )
}

export default Title;