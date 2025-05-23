
const ConversationTop = ({ data }) => {

    if (Object.keys(data).length === 0) {
        return null
    }

    const mainImg = data.listingCarDto.images.find(image => image.main === true)
    return (
        <div className="lg:h-[25%] z-1">
            <div className="h-full flex flex-col lg:justify-between">
                <h3 className="lg:p-3 lg:font-bold lg:text-lg">{data.firstName} {data.lastName}</h3>
                <hr className="lg:text-divider-component"></hr>
                <div className="lg:flex lg:justify-start lg:gap-5 lg:p-3 lg:items-center lg:justify-between lg:bg-white lg:h-full">
                    <img src={mainImg.url} className="lg:w-12 lg:h-11 lg:rounded-md" />
                    <div>
                        <p className="lg:font-bold">{data.listingCarDto.make} {data.listingCarDto.model}</p>
                        <p className="lg:font-bold lg:text-custom-blue">{data.listingCarDto.price} BGN</p>
                    </div>
                </div>
                <hr className="lg:text-divider-component"></hr>
            </div>
        </div>
    )
}

export default ConversationTop