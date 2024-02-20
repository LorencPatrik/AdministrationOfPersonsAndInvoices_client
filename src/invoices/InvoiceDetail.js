import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { apiGet } from "../utils/api";
import LoadingSpiner from "../components/LoadingSpiner";

const InvoiceDetail = () => {

    const { id } = useParams();
    const [invoice, setInvoice] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        apiGet("/api/invoices/" + id).then((data) => {
            setInvoice(data);
            setIsLoading(false);
        })
    }, [id]);

    return (
        <div className="px-2">
            <h3 className="text-decoration-underline text-black text-opacity-75 mb-4">Detail faktury</h3>
            {isLoading ? (
                <LoadingSpiner size="5" />
            ) : (
                <>
                    <h4>
                        {invoice.product} ({invoice.invoiceNumber})
                    </h4>
                    <p>
                        <strong>Datum vydání: </strong>{invoice.issued}<br />
                    </p>
                    <p>
                        <strong>Datum splatnosti: </strong>{invoice.dueDate}
                    </p>
                    <p>
                        <strong>Cena: </strong>{invoice.price},-
                    </p>
                    <p>
                        <strong>Dph: </strong>{invoice.vat}%
                    </p>
                    <p>
                        <strong>Kupující: </strong>{invoice.buyer.name}, {invoice.buyer.city}
                        (IČO: {invoice.buyer.identificationNumber})
                    </p>
                    <p>
                        <strong>Prodávající: </strong>{invoice.seller.name}, {invoice.seller.city}
                        (IČO: {invoice.seller.identificationNumber})
                    </p>
                    <p>
                        <strong>Poznámka: </strong>{invoice.note}
                    </p>
                    <Link to={"/invoices"} className="btn btn-primary border border-black shadow">
                        Zpět
                    </Link>
                </>
            )}
        </div>
    );
}

export default InvoiceDetail;
