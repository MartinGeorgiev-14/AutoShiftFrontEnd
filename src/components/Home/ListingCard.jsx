import { Link } from "react-router-dom"

const ListingCard = ({ listing }) => {
    const mainImg = listing.images.find(i => i.main === true)
    console.log("mainimg", mainImg)
    return (
        <div className="card-container group">
                <Link className="card" to={`/listing/${listing.id}`}>
                    <img src={mainImg.url} className="w-full h-[15rem] object-cover rounded-t-xl shadow-lg"/>
                    <div className="card-text">
                        <p className="truncate lg:w-[20.5vw]">{listing.make} {listing.model}</p>
                        <p className="truncate lg:w-[20.5vw]">{listing.price} BGN ({listing.mileage} km)</p>
                        <p className="truncate lg:w-[20.5vw]">{listing.region} {listing.location}</p>
                    </div>
                </Link>
        </div>
    )
}

export default ListingCard