
const Specs = ({ listing }) => {
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return(
        <div className="specs-container py-4">
            <h2 className="text-center text-2xl">Technical data</h2>
            <hr className="mx-7"/>
            <table className="border-spacing-0 border-collapse ">
                <tbody>
                    <tr className="spec-table-row">
                        <th className="spec-table-element">Engine</th>
                        <td className="spec-table-element">{listing.listing.engine}</td>
                    </tr>
                    <tr className="spec-table-row">
                        <th className="spec-table-element">Horsepower</th>
                        <td className="spec-table-element">{listing.listing.horsepower}</td>
                    </tr>
                    <tr className="spec-table-row">
                        <th className="spec-table-element">Engine displacement</th>
                        <td className="spec-table-element">{listing.listing.engineDisplacement} cc</td>
                    </tr>
                    <tr className="spec-table-row">
                        <th className="spec-table-element">Gearbox</th>
                        <td className="spec-table-element">{listing.listing.gearbox}</td>
                    </tr>
                    <tr >
                        <th className="spec-table-element">Body Type</th>
                        <td className="spec-table-element">{listing.listing.body}</td>
                    </tr>
                    <tr className="spec-table-row">
                        <th className="spec-table-element">Mileage (km)</th>
                        <td className="spec-table-element">{listing.listing.mileage} km</td>
                    </tr>
                    <tr className="spec-table-row">
                        <th className="spec-table-element">Color</th>
                        <td className="spec-table-element">{listing.listing.color}</td>
                    </tr>
                    <tr className="spec-table-row">
                        <th className="spec-table-element">Euro Standard</th>
                        <td className="spec-table-element">{listing.listing.euroStandard}</td>
                    </tr>
                    <tr className="spec-table-row">
                        <th className="spec-table-element">Manufacture Date</th>
                        <td className="spec-table-element">{month[new Date(listing.listing.manufactureDate).getMonth()]} {new Date(listing.listing.manufactureDate).getFullYear()}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Specs