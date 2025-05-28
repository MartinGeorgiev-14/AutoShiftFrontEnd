import { Link } from "react-router-dom"

const ListingCard = ({ listing }) => {
    const mainImg = listing.images.find(i => i.main === true)

    return (
         <Link to={`/listing/${listing.id}`}>
            <img src={mainImg.url} width="100px"/>
            <div>{listing.make} {listing.model}</div>
            <div>{listing.price} ({listing.mileage} km)</div>
        </Link>
    )
}

export default ListingCard