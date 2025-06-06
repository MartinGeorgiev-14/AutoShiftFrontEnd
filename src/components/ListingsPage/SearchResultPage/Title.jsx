import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

const Title = ({make, model, price, handleFavorite, user, listing }) => {

    return(
        <div className="title-container">
            <div>
                <h3 className="text-2xl">{make} {model}</h3>
            </div>
            <div className="flex lg:gap-2 items-center">
                <h3>{price} BGN</h3>
                 {user.accessToken ? listing.isFavorited ? <FaStar onClick={handleFavorite} className="icon"/> : <CiStar onClick={handleFavorite} className="icon"/>
                        : null }  
            </div>
        </div>
    )
}

export default Title;