import styled from "styled-components";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const iconColor = {
    color: "#E2323D"
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0.5rem 1rem 1rem 1rem;
    border: 1px solid gray;
    border-radius: 3px;
    height: 100%;
`
const Div = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`

const ID = styled.p`
    font-size: 0.7rem;
    color: gray;
    text-align: end;
`

const Title = styled.h1`
    color: #E2323D;
`

const Location = styled.p`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.1rem;
    flex-wrap: wrap;
`

const Price = styled.h1`
`

const Phone = styled.h1`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #E2323D;
`
const Person = styled.h2`

`

const Email = styled.h2`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #E2323D;
`

const Description = styled.p`
`

const TitleUserInfo = ({ listing }) => {

    console.log(listing)

    return(
        <Container>
            <Div>
                <ID>Listing: {listing.id}</ID>
                <Title>{listing.make} {listing.model}</Title>
                <Location><FaLocationDot style={iconColor}/>{listing.region} {listing.location}</Location>
                <Price>{listing.price} BGN</Price>
                <Phone><FaPhoneAlt/>{listing.user.phone}</Phone>
            </Div>
            <hr></hr>
            <Div>
                <Person>{listing.user.firstName} {listing.user.lastName}</Person>
                <Email><MdEmail style={iconColor}/>{listing.user.email}</Email>
            </Div>

        </Container>
    )
}

export default TitleUserInfo