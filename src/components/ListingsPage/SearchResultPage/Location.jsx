import styled from "styled-components";
import { IoLocation } from "react-icons/io5";

const Div = styled.div`
`

const Stat = styled.p`
    display: flex;
    align-items: center;
`

const Location = ({ region, location }) => {

    return(
        <Div>
            <Stat><IoLocation style={{color: '#E2323D'}}/>{region}, {location}</Stat>
        </Div>
    )
} 

export default Location;