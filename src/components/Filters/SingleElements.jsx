
const SingleElement = ({ title, value }) => {


if(value != null){
    return (
        <div>
            <p>{title}</p>
            <p>{value}</p>
        </div>
    )
}
else return null
} 

export default SingleElement