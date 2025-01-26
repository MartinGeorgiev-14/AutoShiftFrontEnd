import styled from "styled-components";

const Div = styled.div`
    display: flex;
    gap: 0.3rem;

      &.description{
        grid-column: span 3;
        flex-direction: column;
        align-items: center;
    }
`

const Label = styled.div`
`

const P = styled.p`
`

const ShowInfoRow = ({ label, data, className }) => {

    return (
        <Div className={className}>
            <Label>{label}:</Label>
            <P>{data}</P>
        </Div>
    )
}

export default ShowInfoRow