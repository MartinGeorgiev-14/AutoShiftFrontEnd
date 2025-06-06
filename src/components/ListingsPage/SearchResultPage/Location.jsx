import styled from "styled-components";
import { IoLocation } from "react-icons/io5";



const Location = ({ region, location }) => {

    return(
        <div>
            <p className="flex items-center gap-1"><IoLocation className="icon"/>{region}, {location}</p>
        </div>
    )
} 

export default Location;