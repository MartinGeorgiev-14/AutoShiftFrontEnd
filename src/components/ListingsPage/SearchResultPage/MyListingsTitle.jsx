const MyListingsTitle = ({make, model, price, handleFavorite}) => {
 return(
        <div className="title-container">
            <div>
                <h3 className="text-2xl">{make} {model}</h3>
            </div>
            <div className="flex lg:gap-2 items-center">
                <h3>{price} BGN</h3>
            </div>
        </div>
    )
}

export default MyListingsTitle