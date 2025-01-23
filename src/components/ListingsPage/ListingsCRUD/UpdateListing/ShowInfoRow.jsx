import styled from "styled-components";

const Div = styled.div`
`

const Label = styled.div`
`

const P = styled.p`
`

const ShowInfoRow = ({ label, data }) => {

    return (
        <Div>
            <Label>{label}</Label>
            <P>{data}</P>
        </Div>
    )
}

export default ShowInfoRow