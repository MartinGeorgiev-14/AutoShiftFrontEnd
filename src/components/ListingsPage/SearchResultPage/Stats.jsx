import styled from "styled-components";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const Stats = ({ stats }) => {

    return(
        <div className="stats-container">
            {
                stats.map(s => 
                    <p className="flex items-center gap-0.5" key={s}><IoMdCheckmarkCircleOutline className="icon"/>{s}</p>
                )
            }
        </div>
    )

}

export default Stats;