import styled from "styled-components";

const Div = styled.div`
`

const Label = styled.div`
`

const Img = styled.img`
    width: 100px;
`

const ShowInfoImg = ({ label, data }) => {

    const mainImg = data.filter(i => i.main)

    return (
        <Div>
            <Label>{label}</Label>
            <Img src={`data:${mainImg[0].type};base64,${mainImg[0].imageData}`}></Img>
        </Div>
    )
}

export default ShowInfoImg