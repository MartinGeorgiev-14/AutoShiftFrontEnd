import styled from "styled-components";

const Container = styled.div`

    width: 70%;
    margin: 1rem auto;
    border: 1px solid gray;
    padding: 1rem;
`

const Title = styled.h2`
    text-align: center;
`

const Info = styled.p`
    text-align: justify;
`

const AdditionalInformation = ({ listing }) => {
    

    return (
        <div className="additional-info">
            <h2 className="text-2xl text-center p-4">Additional Information</h2>
            <hr className="mx-7"/>
            <p className="px-7 py-2">{listing.listing.description}</p>
        </div>
    )
}

export default AdditionalInformation