import { Link, useNavigate } from "react-router-dom";

import TableSortButtons from "../components/TableSortButtons";
import "./InvoiceTable.css";

const InvoiceTable = ({
    items,
    deleteInvoice,
    paginationInfo,
    page,
    handleSortOnClick,
    sortPropertyName,
    sortIsAscending }) => {

    const navigate = useNavigate();
    let lengthOfItems = items.length;
    if (lengthOfItems < paginationInfo.limit && page > 1) {
        for (let i = 1; i <= paginationInfo.limit - lengthOfItems; i++)
            items.push({});
    }

    return (
        <>
            <table className="table table-bordered table-hover align-middle min-height shadow">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>
                            <TableSortButtons
                                label="Číslo faktury"
                                propertyName="invoiceNumber"
                                handleSortOnClick={handleSortOnClick}
                                sortPropertyName={sortPropertyName}
                                sortIsAscending={sortIsAscending}
                            />
                        </th>
                        <th>
                            <TableSortButtons
                                label="Název produktu"
                                propertyName="product"
                                handleSortOnClick={handleSortOnClick}
                                sortPropertyName={sortPropertyName}
                                sortIsAscending={sortIsAscending}
                            />
                        </th>
                        <th>
                            <TableSortButtons
                                label="Cena"
                                propertyName="price"
                                handleSortOnClick={handleSortOnClick}
                                sortPropertyName={sortPropertyName}
                                sortIsAscending={sortIsAscending}
                            />
                        </th>
                        <th>Akce</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index + 1} onClick={() => navigate("/invoices/show/" + item._id)}>
                            {item.invoiceNumber ?
                                (<>
                                    <td>{(page - 1) * paginationInfo.limit + index + 1}</td>
                                    <td>{item.invoiceNumber}</td>
                                    <td className="w-50">{item.product}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <div className="btn-group shadow-sm" onClick={(e) => e.stopPropagation()}>
                                            <Link
                                                to={"/invoices/show/" + item._id}
                                                className="btn btn-sm btn-info border border-secondary"
                                            >
                                                Zobrazit
                                            </Link>
                                            <Link
                                                to={"/invoices/edit/" + item._id}
                                                className="btn btn-sm btn-warning border border-secondary"
                                            >
                                                Upravit
                                            </Link>
                                            <button
                                                onClick={() => deleteInvoice(item._id)}
                                                className="btn btn-sm btn-danger border border-dark"
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
                                </>)
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default InvoiceTable;
