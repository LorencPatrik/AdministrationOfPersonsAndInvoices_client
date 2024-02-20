import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { apiDelete, apiGet } from "../utils/api";
import PersonTable from "./PersonTable";
import PersonFilter from "./PersonFilter";
import Pagination from "../components/Pagination";
import LoadingSpiner from "../components/LoadingSpiner";

let sortProperty = { nameOfAttribute: "name", ascending: 1 };

const PersonIndex = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [people, setPeople] = useState([]);
    const [paginationInfo, setPaginationInfo] = useState({ count: undefined, limit: undefined });
    const [page, setPage] = useState(1);
    const [filterState, setFilterState] = useState({
        name: undefined,
        identificationNumber: undefined,
        telephone: undefined,
        mail: undefined,
        city: undefined,
        limit: undefined,
        limit: undefined,
        pageNumber: undefined
    });

    const deletePerson = (id) => {
        setIsLoading(true);
        apiDelete("/api/people/" + id).then(() => {
            let filterParams = {
                ...filterState,
                nameOfAttribute: sortProperty.nameOfAttribute,
                ascending: sortProperty.ascending,
                pageNumber: (page - 1)
            };
            apiGet("/api/people/page", filterParams).then((data) => {
                setPeople(data.persons)
                setPaginationInfo({
                    ...paginationInfo,
                    count: data.count,
                    limit: data.limit
                });
                let displayedItems = paginationInfo.count - ((page - 1) * paginationInfo.limit);
                if (displayedItems == 1)
                    setPage(page - 1);
                setIsLoading(false);
            });
        });
    }

    useEffect(() => {
        setIsLoading(true);
        apiGet("/api/people/page", filterState).then((data) => {
            setPeople(data.persons)
            setPaginationInfo({
                ...paginationInfo,
                count: data.count,
                limit: data.limit
            });
            setIsLoading(false);
        });
    }, []);

    const handleChange = (e) => {
        if (e.target.value === "0" || e.target.value === "") {
            setFilterState({ ...filterState, [e.target.name]: undefined });
        } else
            setFilterState({ ...filterState, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let filterParams = {
            ...filterState,
            nameOfAttribute: sortProperty.nameOfAttribute,
            ascending: sortProperty.ascending,
            pageNumber: 0
        };
        apiGet("/api/people/page", filterParams).then((data) => {
            setPeople(data.persons)
            setPaginationInfo({
                ...paginationInfo,
                count: data.count,
                limit: data.limit
            });
        });
        setPage(1);
    };

    const handlePaginationOnClick = async (page) => {
        let filterParams = {
            ...filterState,
            nameOfAttribute: sortProperty.nameOfAttribute,
            ascending: sortProperty.ascending,
            pageNumber: (page - 1)
        };
        apiGet("/api/people/page", filterParams).then((data) => {
            setPeople(data.persons);
        });
    }

    const handleSortOnClick = (nameOfAttribute, ascending) => {
        sortProperty = { ...sortProperty, ascending: ascending, nameOfAttribute: nameOfAttribute };
        let filterParams = {
            ...filterState,
            nameOfAttribute: nameOfAttribute,
            ascending: ascending,
            pageNumber: (page - 1)
        };
        apiGet("/api/people/sort", filterParams).then((data) => {
            setPeople(data.persons)
            setPaginationInfo({
                ...paginationInfo,
                count: data.count,
                limit: data.limit
            });
        });
    }

    return (
        <div className="px-2">
            <h3 className="text-decoration-underline text-black text-opacity-75">Seznam osob</h3>
            {isLoading ? (
                <LoadingSpiner size="5" />
            ) : (
                <>
                    <PersonFilter
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        filter={filterState}
                    />
                    <hr />
                    {!people[0] ? (
                        <div className="text-center my-4">
                            <h5>Žádná data k zobrazení... Můžete vytvořit novou osobu.</h5>
                            <Link to={"/people/create"} className="btn btn-success mt-3">
                                Nová osoba
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="d-flex justify-content-between me-5 align-items-center">
                                <span>Počet osob: {paginationInfo.count}</span>
                                <Pagination
                                    paginationInfo={paginationInfo}
                                    handlePaginationOnClick={handlePaginationOnClick}
                                    page={page}
                                    setPage={setPage}
                                />
                            </div>
                            <PersonTable
                                deletePerson={deletePerson}
                                items={people}
                                paginationInfo={paginationInfo}
                                page={page}
                                handleSortOnClick={handleSortOnClick}
                                sortPropertyName={sortProperty.nameOfAttribute}
                                sortIsAscending={sortProperty.ascending}
                            />
                            <div className="d-flex justify-content-between me-5 mb-3 align-items-center">
                                <Link to={"/people/create"} className="btn btn-success border border-black shadow">
                                    Nová osoba
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

export default PersonIndex;
