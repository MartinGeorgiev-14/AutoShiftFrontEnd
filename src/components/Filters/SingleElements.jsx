
const SingleElement = ({ title, value }) => {


if(value != null){
    return (
        <div>
            <p className="double-el-title">{title}</p>
            <p className="double-el-data">{value}</p>
        </div>
    )
}
else return null
} 

export default SingleElement