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
import { useSelector } from "react-redux";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { changeActive } from "../../../reducers/searchResultReducer";



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
    const mainImg = listing.images.find(i => i.main === true)
    const user = useSelector(state => state.user)

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

    const handleToggleActive = async (event, listing) => {
        event.preventDefault()

        const response = await listingCrudService.toggleActive(listing)

        if(response === 200) {
            dispatch(displayNotification({type: "success", message: "Listing status updated successfully"}))
            dispatch(changeActive(listing))
        } else {
            dispatch(displayNotification({type: "error", message: "Failed to update listing status"}))
        }
    }

    return(
        <Container>
            <Img src={mainImg.url}/>
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
                         <p>Active: {listing.isActive ? "Yes" : "No"}</p>
                    </Div>
                    <Div className="icons">
                        <Link to={`/editListing/${listing.id}`}><CiEdit style={{color: "green"}}/></Link>
                        {user.roles.some(r => r.name === "ROLE_ADMIN") ? <Link onClick={(event) => handleDelete(event, listing.id)}><MdDeleteForever style={{color: "red"}}/></Link> : null}
                        <Link onClick={(event) => handleToggleActive(event, listing)}>{listing.isActive ? <FaRegEyeSlash style={{color: "orange"}}/> : <FaRegEye style={{color: "blue"}}/>}</Link>
                    </Div>
                </StatsDiv>
            </InfoDiv>
        </Container>  
    )
}

export default ListingContainerCRUD;