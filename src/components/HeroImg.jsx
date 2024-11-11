import styled from "styled-components"

const Img = styled.img`
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 80vh;
    object-fit: cover;
    background-color: red;
`

const HeroImg = () => {

    return (
        <div>
            <Img src="" alt="Hero Image" />
            <h1>asd</h1>
        </div>
        
    )
}

export default HeroImg