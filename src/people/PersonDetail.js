import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


import { apiGet } from "../utils/api";
import LoadingSpiner from "../components/LoadingSpiner";
import Country from "./Country";

const PersonDetail = () => {

    const { id } = useParams();
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingSellers, setIsLoadingSellers] = useState(true);
    const [isLoadingBuyers, setIsLoadingBuyers] = useState(true);
    const [person, setPerson] = useState({});
    const [sellers, setSellers] = useState([]);
    const [buyers, setBuyers] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        setIsLoadingSellers(true);
        setIsLoadingBuyers(true);
        apiGet("/api/people/" + id)
            .then((data) => {
                setPerson(data);
                apiGet("/api/identification/" + (data.identificationNumber) + "/sales")
                    .then((data) => {
                        setSellers(data)
                        setIsLoadingSellers(false);
                    });
                apiGet("/api/identification/" + data.identificationNumber + "/purchases")
                    .then((data) => {
                        setBuyers(data)
                        setIsLoadingBuyers(false);
                    });
                setIsLoading(false);
            })
            .catch(() => {
                setIsError(true);
                setIsLoading(false);
            });
    }, [id]);

    const country = Country.CZECHIA === person.country ? "Česká republika" : "Slovensko";

    return (
        <div className="px-2">
            <h3 className="text-decoration-underline text-black text-opacity-75 mb-4">Detail osoby/firmy</h3>
            {isLoading ? (
                <LoadingSpiner size="5" />
            ) : (
                isError ? (
                    <h6 className="text-danger mb-4"> Nastala chyba při komunikace se serverem...</h6>
                ) : (
                    <>
                        <h4>{person.name}</h4>
                        <div className="d-flex pt-2">
                            <p>
                                <strong>IČO:</strong> {person.identificationNumber}
                            </p>
                            <p className="ms-5">
                                <strong>DIČ:</strong> {person.taxNumber}
                            </p>
                        </div>
                        <p>
                            <strong>Bankovní účet:</strong> {person.accountNumber} / {person.bankCode}
                        </p>
                        <p>
                            <strong>IBAN:</strong> {person.iban}
                        </p>
                        <div className="d-flex">
                            <p>
                                <strong>Tel.:</strong> {person.telephone}
                            </p>
                            <p className="ms-5">
                                <strong>Mail:</strong> {person.mail}
                            </p>
                        </div>
                        <p>
                            <strong>Sídlo:</strong> {person.street}, {person.city}, {person.zip}, {country}
                        </p>
                        <p>
                            <strong>Poznámka:</strong> {person.note}
                        </p>
                        <h5>Výpis faktur prodaných položek</h5>
                        {isLoadingSellers ? (
                            <LoadingSpiner size="2" />
                        ) : (
                            <>
                                {!sellers[0] ? (
                                    <div className="shadow border mb-3">
                                        <h6 className="ms-4 py-4">Pro tuto osobu/firmu nejsou k dispozici záznamy o prodejích...</h6>
                                    </div>
                                ) : (
                                    <table className="table table-bordered shadow">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Faktrua číslo</th>
                                                <th>Produkt</th>
                                                <th>Datum prodeje</th>
                                                <th>Cena</th>
                                                <th>Kupující</th>
                                                <th>IČO</th>
                                                <th>Město</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sellers.map((item, index) => (
                                                <tr key={index + 1}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.invoiceNumber}</td>
                                                    <td>{item.product}</td>
                                                    <td>{item.dueDate}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.buyer.name}</td>
                                                    <td>{item.buyer.identificationNumber}</td>
                                                    <td>{item.buyer.city}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </>
                        )
                        }
                        <h5>Výpis faktru nakoupených položek</h5>
                        {isLoadingBuyers ? (
                            <LoadingSpiner size="2" />
                        ) : (
                            <>
                                {!buyers[0] ? (
                                    <div className="shadow border mb-3">
                                        <h6 className="ms-4 py-4">Pro tuto osobu/firmu nejsou k dispozici záznamy o nákupech...</h6>
                                    </div>
                                ) : (
                                    <table className="table table-bordered shadow">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Faktrua číslo</th>
                                                <th>Produkt</th>
                                                <th>Datum nákupu</th>
                                                <th>Cena</th>
                                                <th>Prodávající</th>
                                                <th>IČO</th>
                                                <th>Město</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {buyers.map((item, index) => (
                                                <tr key={index + 1}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.invoiceNumber}</td>
                                                    <td>{item.product}</td>
                                                    <td>{item.dueDate}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.seller.name}</td>
                                                    <td>{item.seller.identificationNumber}</td>
                                                    <td>{item.seller.city}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </>
                        )}
                    </>
                )
            )}
            <Link to={"/people"} className="btn btn-primary border border-black shadow mb-3">
                Zpět
            </Link>
        </div>
    );
}

export default PersonDetail;
