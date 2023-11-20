import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Select from 'react-select';

import { apiGet, apiPost, apiPut } from "../utils/api";
import InputField from "../components/InputField";
import LoadingSpinner from "../components/LoadingSpinner";

const InvoiceForm = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [isLoadingPersons, setIsLoadingPersons] = useState(true);
    const [isLoadingInvoices, setIsLoadingInvoices] = useState(id ? true : false);
    const [persons, setPersons] = useState(undefined);
    const [selectedSeller, setSelectedSeller] = useState();
    const [selectedBuyer, setSelectedBuyer] = useState();
    const [invoice, setInvoice] = useState({
        invoiceNumber: "",
        seller: { _id: selectedSeller },
        buyer: { _id: selectedBuyer },
        issued: "",
        dueDate: "",
        product: "",
        price: "",
        vat: "",
        note: ""
    });

    useEffect(() => {
        setPersons([]);
        setIsLoadingPersons(true);
        apiGet("/api/people").then((data) => {
            setPersons(data.map(item => ({ ...persons, value: item._id, label: item.name }) ));
            setIsLoadingPersons(false);
        })

        if (id) {
            setIsLoadingInvoices(true);
            apiGet("/api/invoices/" + id).then((item) => {
                setInvoice({
                    ...item,
                    seller: { _id: item.seller._id },
                    buyer: { _id: item.buyer._id }
                });
                setSelectedBuyer({ value: item.buyer._id, label: item.buyer.name });
                setSelectedSeller({ value: item.seller._id, label: item.seller.name });
                setIsLoadingInvoices(false);
            });
        }

    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();
        (id ? apiPut("/api/invoices/" + id, invoice) : apiPost("/api/invoices", invoice))
            .then(() => navigate("/invoices"))
    };

    return (
        <div className="px-2">
            <h3>{id ? "Upravit" : "Vytvořit novou"} fakturu</h3>
            <hr />
            {isLoadingPersons || isLoadingInvoices ? (
                    <LoadingSpinner size="5" />
                ) : (
                    <>
                        {(!persons.length) ? (
                                <div className="text-center my-4">
                                    <h5>Nelze vytvořit novou fakturu!</h5>
                                    <p>V databázi nemáte žádné osoby/firmy! Novou fakturu není možno založit. Nejdříve prosím vložte nové osoby/firmy, aby jste z nich mohli vybrat kupující a prodávající.</p>
                                    <Link to={"/people/create"} className="btn btn-success">
                                        Nová osoba
                                    </Link>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <InputField
                                        required={true}
                                        type="text"
                                        name="invoiceNumber"
                                        min="3"
                                        label="Číslo faktury"
                                        prompt="Zadejte číslo faktury"
                                        value={invoice.invoiceNumber}
                                        handleChange={(e) => {
                                            setInvoice({ ...invoice, invoiceNumber: e.target.value });
                                        }}
                                    />
                                    <label>Vyberte prodávajícího:</label>
                                    <Select
                                        value={selectedSeller}
                                        options={persons}
                                        onChange={(e) => {
                                            setInvoice({ ...invoice, seller: { _id: e.value } });
                                        }} />
                                    <label>Vyberte kupujícího:</label>
                                    <Select
                                        value={selectedBuyer}
                                        options={persons}
                                        onChange={(e) => {
                                            setInvoice({ ...invoice, buyer: { _id: e.value } });
                                        }} />
                                    <InputField
                                        required={true}
                                        type="date"
                                        name="issued"
                                        min="8"
                                        label="Datum vystavení"
                                        prompt="Zadejte datum vystavení"
                                        value={invoice.issued}
                                        handleChange={(e) => {
                                            setInvoice({ ...invoice, issued: e.target.value });
                                        }}
                                    />
                                    <InputField
                                        required={true}
                                        type="date"
                                        name="dueDate"
                                        min="8"
                                        label="Datum splatnosti"
                                        prompt="Zadejte datum splatnosti"
                                        value={invoice.dueDate}
                                        handleChange={(e) => {
                                            setInvoice({ ...invoice, dueDate: e.target.value });
                                        }}
                                    />
                                    <InputField
                                        required={true}
                                        type="text"
                                        name="product"
                                        min="3"
                                        label="Product"
                                        prompt="Zadejte product"
                                        value={invoice.product}
                                        handleChange={(e) => {
                                            setInvoice({ ...invoice, product: e.target.value });
                                        }}
                                    />
                                    <InputField
                                        required={true}
                                        type="number"
                                        name="price"
                                        min="1"
                                        label="Cena"
                                        prompt="Zadejte cenu"
                                        value={invoice.price}
                                        handleChange={(e) => {
                                            setInvoice({ ...invoice, price: e.target.value });
                                        }}
                                    />
                                    <InputField
                                        required={true}
                                        type="number"
                                        name="vat"
                                        min="1"
                                        label="Dph"
                                        prompt="Zadejte dph"
                                        value={invoice.vat}
                                        handleChange={(e) => {
                                            setInvoice({ ...invoice, vat: e.target.value });
                                        }}
                                    />
                                    <InputField
                                        required={true}
                                        type="text"
                                        name="note"
                                        min="3"
                                        label="Poznámka"
                                        prompt="Zadejte poznámku"
                                        value={invoice.note}
                                        handleChange={(e) => {
                                            setInvoice({ ...invoice, note: e.target.value });
                                        }}
                                    />
                                    <div className="my-3">
                                        <input type="submit" className="btn btn-success" value="Uložit" />
                                        <Link to={"/invoices"} className="btn btn-primary ms-2">
                                            Zpět
                                        </Link>
                                    </div>
                                </form>
                            )
                        }
                    </>
                )
            }
        </div>
    );
}

export default InvoiceForm;
