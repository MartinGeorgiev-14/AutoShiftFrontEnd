import styled from "styled-components";
import Title from "../SearchResultPage/Title";
import Stats from "../SearchResultPage/Stats";
import LocationDiv from "../SearchResultPage/Location";    
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import listingCrudService from "../../../services/listingCrudService";
import { useDispatch } from "react-redux";
import { removeListing } from "../../../reducers/searchResultReducer";

const Container = styled.div`
    background-color: red;
    display: flex;
    width: 70%;
    margin: 1rem auto;
    padding: 1rem;
`
const Img = styled.img`
    width: 100px;   
`

const InfoDiv = styled.div`
    width: 100%;
`

const StatsDiv = styled.div`
    display: flex;
    
`

const Div = styled.div`
    display: flex;

    flex-direction: column;

    a {
    text-decoration: none;
    color: black;
    }
` 

const ListingContainerCRUD = ({ listing }) => {
    const mainImg = listing.images.filter(i => i.main)
    const dispatch = useDispatch()
  
    const handleDelete = async (event, listingId) => {
        event.preventDefault()

        if(window.confirm('Are you sure you want to delete this listing?')) {
            const response = await listingCrudService.deleteListing(listingId)

            if(response === 200) {
                dispatch(removeListing(listingId))
                alert("Listing has been deleted successfully")
            }
        }

    } 

    return(
        <Container>
            <Img src={`data:${mainImg[0].type};base64,${mainImg[0].imageData}`}></Img>
            <InfoDiv>
                    <Title id={listing.id} make={listing.make} model={listing.model} price={listing.price}/>
                <StatsDiv>
                    <Div>
                        <Stats stats={[listing.mileage + ' km', listing.engine,
                            listing.horsepower + " hp", listing.gearbox, listing.body]}/>

                        <LocationDiv region={listing.region} location={listing.location}/>
                    </Div>
                    <Div>
                        <Link to={`/editListing/${listing.id}`}><CiEdit/></Link>
                        <Link onClick={(event) => handleDelete(event, listing.id)}><MdDeleteForever/></Link>
                    </Div>
                </StatsDiv>
            </InfoDiv>
        </Container>  
    )
}

export default ListingContainerCRUD;