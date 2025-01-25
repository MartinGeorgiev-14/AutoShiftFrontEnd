import styled from "styled-components";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const Div = styled.div`
    display: flex;
    gap: 1rem;
`
const Stat = styled.p`
    display: flex;
    align-items: center;
`

const Stats = ({ stats }) => {

    return(
        <Div>
            {
                stats.map(s => 
                    <Stat key={s}><IoMdCheckmarkCircleOutline style={{color: '#E2323D'}}/>{s}</Stat>
                )
            }
        </Div>
    )

}

export default Stats;