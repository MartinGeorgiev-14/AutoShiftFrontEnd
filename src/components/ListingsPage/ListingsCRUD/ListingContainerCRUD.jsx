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
import { displayNotification } from "../../../reducers/notificationReducer";

const Container = styled.div`
    background-color: #f8f9fa;
    display: flex;
    gap: 1rem;
    width: 70%;
    margin: 1rem auto;
    padding: 1rem;
    border-radius: 3px;
`
const Img = styled.img`
    width: 10rem;
    object-fit: contain;  
`

const InfoDiv = styled.div`
    width: 100%;
`

const StatsDiv = styled.div`
    width: 100%;
`

const Div = styled.div`
    height: 85%;
    display: flex;
    flex-direction: column
    justify-content: space-around;
    flex-wrap: wrap;
    font-size: 1.2rem;
    gap: 1rem;

    &.icons{
        font-size: 1.5rem;
        text-decoration: none;
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
                dispatch(displayNotification({type: "success", message: "Listing deleted successfully"}))
                
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
                         <p>ID: {listing.user.id}</p>
                         <p>Owner: {listing.user.firstName} {listing.user.lastName}</p>   
                    </Div>
                    <Div className="icons">
                        <Link to={`/editListing/${listing.id}`}><CiEdit style={{color: "green"}}/></Link>
                        <Link onClick={(event) => handleDelete(event, listing.id)}><MdDeleteForever style={{color: "red"}}/></Link>
                    </Div>
                </StatsDiv>
            </InfoDiv>
        </Container>  
    )
}

export default ListingContainerCRUD;