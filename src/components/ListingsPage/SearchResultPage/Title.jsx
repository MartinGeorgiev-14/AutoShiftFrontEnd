import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { useSelector } from "react-redux";

const Title = ({make, model, price, handleFavorite, user, listing }) => {
    console.log("user", user)
    console.log("listing", listing)
    const currentUser = useSelector(state => state.user);
    return(
        <div className="title-container">
            <div>
                <h3 className="text-2xl">{make} {model}</h3>
            </div>
            <div className="flex lg:gap-2 items-center">
                <h3>{price} BGN</h3>
                 {currentUser?.accessToken && currentUser.userId !== listing.user.id && (
                        listing.isFavorited ? (
                            <FaStar className="icon" onClick={handleFavorite} />
                        ) : (
                            <CiStar className="icon" onClick={handleFavorite} />
                        )
                    )}  
            </div>
        </div>
    )
}

export default Title;