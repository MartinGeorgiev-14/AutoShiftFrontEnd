import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 70%;
    margin: 0 auto;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 1rem;
    
`

const Title = styled.h2`
    text-align: center;
`

const Table = styled.table`
    border-spacing: 0;
    border-collapse: collapse;
    flex-wrap: wrap; 
    width: 100%;
    `

const TBody = styled.tbody`
`

const TR = styled.tr`
    &:nth-child(odd){
        background-color: #de6f76;
    }
`

const TH = styled.th`
    padding: 0.4rem 0.2rem
`

const TD = styled.td`
    padding: 0.4rem 0.2rem
`

const Specs = ({ listing }) => {

    return(
        <Container>
            <Title>Technical data</Title>
            <Table>
                <TBody>
                    <TR>
                        <TH>Engine</TH>
                        <TD>{listing.engine}</TD>
                    </TR>
                    <TR>
                        <TH>Horsepower</TH>
                        <TD>{listing.horsepower}</TD>
                    </TR>
                    <TR>
                        <TH>Engine displacement</TH>
                        <TD>{listing.engineDisplacement}</TD>
                    </TR>
                    <TR>
                        <TH>Gearbox</TH>
                        <TD>{listing.gearbox}</TD>
                    </TR>
                    <TR>
                        <TH>Body Type</TH>
                        <TD>{listing.body}</TD>
                    </TR>
                    <TR>
                        <TH>Mileage (km)</TH>
                        <TD>{listing.mileage} km</TD>
                    </TR>
                </TBody>
            </Table>
        </Container>
    )
}

export default Specs