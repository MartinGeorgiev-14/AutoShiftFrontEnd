import styled from "styled-components";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const Div = styled.div`
`
const Stat = styled.p`
`

const Stats = ({ stats }) => {

    return(
        <Div>
            {
                stats.map(s => 
                    <Stat key={s}><IoMdCheckmarkCircleOutline/>{s}</Stat>
                )
            }
        </Div>
    )

}

export default Stats;