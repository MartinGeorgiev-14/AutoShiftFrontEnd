import styled from "styled-components";
import { IoLocation } from "react-icons/io5";

const Div = styled.div`
`

const Stat = styled.p`
`

const LocationDiv = ({ region, location }) => {

    return(
        <Div>
            <Stat><IoLocation/>{region}, {location}</Stat>
        </Div>
    )
} 

export default LocationDiv;