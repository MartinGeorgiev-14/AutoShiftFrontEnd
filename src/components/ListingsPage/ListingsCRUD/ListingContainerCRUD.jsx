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
import MyListingsTitle from "../SearchResultPage/MyListingsTitle";


const ListingContainerCRUD = ({ listing }) => {
    const mainImg = listing.images.find(i => i.main === true)
    const user = useSelector(state => state.user)
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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
        <Link className="listing-container" to={`/listing/${listing.id}`}>
            <img className="listing-img" src={mainImg.url}/>
            <div className="intro-info h-full">
                    <MyListingsTitle id={listing.id} make={listing.make} model={listing.model} price={listing.price} user={user}/>
                <div className="flex flex-col justify-between lg:h-[75%] w-full">
                    <div className="w-full flex flex-col">
                        <Stats stats={[listing.mileage + ' km', listing.engine,
                        listing.horsepower + " hp", listing.gearbox, listing.body, listing.color,
                        listing.engineDisplacement + " cc", listing.euroStandard,
                        month[new Date(listing.manufactureDate).getMonth()] + " " + new Date(listing.manufactureDate).getFullYear()]} />

                        <LocationDiv region={listing.region} location={listing.location}/>
                    </div>
                    <div>
                         <p>ID: {listing.user.id}</p>
                         <p>Owner: {listing.user.firstName} {listing.user.lastName}</p>
                         <p>Active: {listing.isActive ? "Yes" : "No"}</p>
                    </div>
                    <div className="flex gap-5">
                        <Link to={`/editListing/${listing.id}`}><CiEdit style={{color: "green"}}/></Link>
                        {user.roles.some(r => r.name === "ROLE_ADMIN") ? <Link onClick={(event) => handleDelete(event, listing.id)}><MdDeleteForever style={{color: "red"}}/></Link> : null}
                        <Link onClick={(event) => handleToggleActive(event, listing)}>{listing.isActive ? <FaRegEyeSlash style={{color: "orange"}}/> : <FaRegEye style={{color: "blue"}}/>}</Link>
                    </div>
                </div>
            </div>
        </Link>  
    )
}

export default ListingContainerCRUD;