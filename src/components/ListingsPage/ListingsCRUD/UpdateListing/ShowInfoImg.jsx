import styled from "styled-components";

const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-column: span 3;
`

const Label = styled.div`
`

const Img = styled.img`
    width: 15rem;
`

const ShowInfoImg = ({ label, data }) => {

    console.log("data", data)
    const mainImg = data.find(i => i.main === true)

    return (
        <Div>
            <Label>{label}</Label>
            <Img src={mainImg.url}></Img>
        </Div>
    )
}

export default ShowInfoImg