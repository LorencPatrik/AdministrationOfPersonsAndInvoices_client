import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { apiDelete, apiGet } from "../utils/api";
import InvoiceTable from "./InvoiceTable";
import InvoiceFilter from "./InvoiceFilter";
import Pagination from "../components/Pagination";
import LoadingSpiner from "../components/LoadingSpiner";

let sortProperty = { nameOfAttribute: "product", ascending: 1 };

const InvoiceIndex = () => {

    const [isLoadingInvoices, setIsLoadingInvoices] = useState(true);
    const [isLoadingPersons, setIsLoadingPersons] = useState(true);
    const [invoices, setInvoices] = useState([]);
    const [paginationInfo, setPaginationInfo] = useState({ count: undefined, limit: undefined });
    const [page, setPage] = useState(1);
    const [personsListState, setPersonsListState] = useState([]);
    const [filterState, setFilterState] = useState({
        buyerID: undefined,
        sellerID: undefined,
        product: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        invoiceNumber: undefined,
        limit: undefined,
        pageNumber: undefined
    });

    const deleteInvoice = (id) => {
        setIsLoadingInvoices(true);
        apiDelete("/api/invoices/" + id).then(() => {
            let filterParams = {
                ...filterState,
                nameOfAttribute: sortProperty.nameOfAttribute,
                ascending: sortProperty.ascending,
                pageNumber: (page - 1)
            };
            apiGet("/api/invoices", filterParams).then((data) => {
                setInvoices(data.invoices)
                setPaginationInfo({
                    ...paginationInfo,
                    count: data.count,
                    limit: data.limit
                });
                let displayedItems = paginationInfo.count - ((page - 1) * paginationInfo.limit);
                if (displayedItems == 1)
                    setPage(page - 1);
                setIsLoadingInvoices(false);
            });
        });
    }

    useEffect(() => {
        setIsLoadingInvoices(true);
        apiGet("/api/invoices", filterState).then((data) => {
            setInvoices(data.invoices)
            setPaginationInfo({
                ...paginationInfo,
                count: data.count,
                limit: data.limit
            });
            setIsLoadingInvoices(false);
        });
        setIsLoadingPersons(true);
        apiGet("/api/people").then((data) => {
            data.unshift({ _id: 0, name: "nevybrán" });
            setPersonsListState(data.map(item => (
                { ...personsListState, value: item._id, label: item.name }
            )
            ));
            setIsLoadingPersons(false);
        });
    }, []);

    const handleChange = (e) => {
        if (e.target.value === "0" || e.target.value === "") {
            setFilterState({ ...filterState, [e.target.name]: undefined });
        } else {
            setFilterState({ ...filterState, [e.target.name]: e.target.value });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let filterParams = {
            ...filterState,
            nameOfAttribute: sortProperty.nameOfAttribute,
            ascending: sortProperty.ascending,
            pageNumber: 0
        };
        apiGet("/api/invoices", filterParams).then((data) => {
            setInvoices(data.invoices)
            setPaginationInfo({
                ...paginationInfo,
                count: data.count,
                limit: data.limit
            });
        });
        setPage(1);
    }

    const handlePaginationOnClick = (page) => {
        let filterParams = {
            ...filterState,
            nameOfAttribute: sortProperty.nameOfAttribute,
            ascending: sortProperty.ascending,
            pageNumber: (page - 1)
        };

        apiGet("/api/invoices/page", filterParams).then((data) => {
            setInvoices(data.invoices)
        });
    }

    const handleSortOnClick = (nameOfAttribute, ascending) => {
        sortProperty = { ...sortProperty, nameOfAttribute: nameOfAttribute, ascending: ascending };
        let filterParams = {
            ...filterState,
            nameOfAttribute: nameOfAttribute,
            ascending: ascending,
            pageNumber: (page - 1)
        };
        apiGet("/api/invoices/sort", filterParams).then((data) => {
            setInvoices(data.invoices)
            setPaginationInfo({
                ...paginationInfo,
                count: data.count,
                limit: data.limit
            });
        });
    }

    return (
        <div className="px-2">
            <h3 className="text-decoration-underline text-black text-opacity-75">Seznam faktur</h3>
            {isLoadingPersons ? (
                <LoadingSpiner size="5" />
            ) : (
                <>
                    <InvoiceFilter
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        personsList={personsListState}
                        filter={filterState}
                    />
                    <hr />
                    {(!isLoadingInvoices && !invoices[0]) ? (
                        <div className="text-center my-4">
                            <h5>Žádná data k zobrazení... Můžete vytvořit novou fakturu.</h5>
                            <p>Při vytváření nové faktury budete vybírat kupující a prodávající osobu/firmu. Ujistěte se prosím, že již máte z čeho vybírat.</p>
                            <Link to={"/invoices/create"} className="btn btn-success">
                                Nová faktura
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="d-flex justify-content-between me-5 align-items-center">
                                <span>Počet faktur: {paginationInfo.count}</span>
                                <Pagination
                                    paginationInfo={paginationInfo}
                                    handlePaginationOnClick={handlePaginationOnClick}
                                    page={page}
                                    setPage={setPage}
                                />
                            </div>
                            <InvoiceTable
                                deleteInvoice={deleteInvoice}
                                items={invoices}
                                paginationInfo={paginationInfo}
                                page={page}
                                handleSortOnClick={handleSortOnClick}
                                sortPropertyName={sortProperty.nameOfAttribute}
                                sortIsAscending={sortProperty.ascending}
                            />
                            <div className="d-flex justify-content-between me-5 mb-3 align-items-center">
                                <Link to={"/invoices/create"} className="btn btn-success border border-black shadow">
                                    Nová faktura
                                </Link>
                                <Pagination
                                    paginationInfo={paginationInfo}
                                    handlePaginationOnClick={handlePaginationOnClick}
                                    page={page}
                                    setPage={setPage}
                                />
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default InvoiceIndex;
