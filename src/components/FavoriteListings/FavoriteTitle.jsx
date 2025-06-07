import { FaStar } from "react-icons/fa";

const FavoriteTitle = ({make, model, price, handleRemoveFromFavorite}) => {

        return(
            <div className="title-container">
                <div>
                    <h3 className="text-2xl">{make} {model}</h3>
                </div>
                <div className="flex lg:gap-2 items-center">
                    <h3>{price} BGN</h3>
                    <FaStar className="icon" onClick={handleRemoveFromFavorite}/>
                </div>
            </div>
        )
}

export default FavoriteTitle