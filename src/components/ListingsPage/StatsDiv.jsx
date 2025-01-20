import styled from "styled-components";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const Div = styled.div`
`
const Stat = styled.p`
`

const StatsDiv = ({ stats }) => {
    console.log(stats)

    return(
        <Div>
            {
                stats.map(s => 
                    <Stat><IoMdCheckmarkCircleOutline/>{s}</Stat>
                )
            }
        </Div>
    )

}

export default StatsDiv;