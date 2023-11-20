import { Link } from "react-router-dom";

import TableSortButtons from "../components/TableSortButtons";
import "./PersonTable.css";

const PersonTable = ({
    items,
    deletePerson,
    paginationInfo,
    page,
    handleSortOnClick,
    sortPropertyName,
    sortIsAscending
}) => {

    let lengthOfItems = items.length;
    if (lengthOfItems < paginationInfo.limit && page > 1) {
        for (let i = 1; i <= paginationInfo.limit - lengthOfItems; i++)
            items.push({});
    }

    return (
        <div>
            <table className="table table-bordered table-hover align-middle min-height">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>
                            <TableSortButtons
                                label="IČO"
                                propertyName="identificationNumber"
                                handleSortOnClick={handleSortOnClick}
                                sortPropertyName={sortPropertyName}
                                sortIsAscending={sortIsAscending}
                            />
                        </th>
                        <th>
                            <TableSortButtons
                                label="Jméno"
                                propertyName="name"
                                handleSortOnClick={handleSortOnClick}
                                sortPropertyName={sortPropertyName}
                                sortIsAscending={sortIsAscending}
                            />
                        </th>
                        <th>
                            <TableSortButtons
                                label="Telefon"
                                propertyName="telephone"
                                handleSortOnClick={handleSortOnClick}
                                sortPropertyName={sortPropertyName}
                                sortIsAscending={sortIsAscending}
                            />
                        </th>
                        <th>
                            <TableSortButtons
                                label="Mail"
                                propertyName="mail"
                                handleSortOnClick={handleSortOnClick}
                                sortPropertyName={sortPropertyName}
                                sortIsAscending={sortIsAscending}
                            />
                        </th>
                        <th>
                            <TableSortButtons
                                label="Město"
                                propertyName="city"
                                handleSortOnClick={handleSortOnClick}
                                sortPropertyName={sortPropertyName}
                                sortIsAscending={sortIsAscending}
                            />
                        </th>
                        <th colSpan={3}>Akce</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index + 1}>
                            {item.identificationNumber ?
                                (<>
                                    <td>{(page - 1) * paginationInfo.limit + index + 1}</td>
                                    <td>{item.identificationNumber}</td>
                                    <td>{item.name}</td>
                                    <td>{item.telephone}</td>
                                    <td>{item.mail}</td>
                                    <td>{item.city}</td>
                                    <td>
                                        <div className="btn-group">
                                            <Link
                                                to={"/people/show/" + item._id}
                                                className="btn btn-sm btn-info"
                                            >
                                                Zobrazit
                                            </Link>
                                            <Link
                                                to={"/people/edit/" + item._id}
                                                className="btn btn-sm btn-warning"
                                            >
                                                Upravit
                                            </Link>
                                            <button
                                                onClick={() => deletePerson(item._id)}
                                                className="btn btn-sm btn-danger"
                                            >
                                                Odstranit
                                            </button>
                                        </div>
                                    </td>
                                </>) :
                                (<>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </>)
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PersonTable;
