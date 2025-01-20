import { useParams } from "react-router";

const Listing = () => {
    const { id } = useParams();

    console.log(id)
    return (
        <div>
            <h1>Listing</h1>
        </div>
    );
}

export default Listing; 