import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { apiGet, apiPost, apiPut } from "../utils/api";
import InputField from "../components/InputField";
import InputCheck from "../components/InputCheck";
import LoadingSpiner from "../components/LoadingSpiner";

import Country from "./Country";

const PersonForm = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(id ? true : false);
    const [personErrors, setPersonErrors] = useState({});
    const [person, setPerson] = useState({
        name: "",
        identificationNumber: "",
        taxNumber: "",
        accountNumber: "",
        bankCode: "",
        iban: "",
        telephone: "",
        mail: "",
        street: "",
        zip: "",
        city: "",
        country: Country.CZECHIA,
        note: ""
    });

    useEffect(() => {
        if (id) {
            setIsLoading(true);
            apiGet("/api/people/" + id).then((data) => {
                setPerson(data)
                setIsLoading(false);
            });
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        (id ? apiPut("/api/people/" + id, person) : apiPost("/api/people", person))
            .then((data) => {
                if (data.status !== "400")
                    navigate("/people")
                setPersonErrors(data);
            });
    }

    return (
        <div className="px-2">
            <h3 className="text-decoration-underline">{id ? "Upravit" : "Vytvořit"} osobu/firmu</h3>
            {isLoading ? (
                <LoadingSpiner size="5" />
            ) : (
                <form onSubmit={handleSubmit}>
                    <InputField
                        required={true}
                        type="text"
                        name="personName"
                        min={3}
                        label="Jméno"
                        error={personErrors.name}
                        prompt="Zadejte celé jméno"
                        value={person.name}
                        handleChange={(e) => {
                            setPerson({ ...person, name: e.target.value });
                        }}
                    />
                    <InputField
                        required={true}
                        type="text"
                        name="identificationNumber"
                        min={3}
                        label="IČO"
                        error={personErrors.identificationNumber}
                        prompt="Zadejte IČO"
                        value={person.identificationNumber}
                        handleChange={(e) => {
                            setPerson({ ...person, identificationNumber: e.target.value });
                        }}
                    />
                    <InputField
                        required={true}
                        type="text"
                        name="taxNumber"
                        min={3}
                        label="DIČ"
                        error={personErrors.taxNumber}
                        prompt="Zadejte DIČ"
                        value={person.taxNumber}
                        handleChange={(e) => {
                            setPerson({ ...person, taxNumber: e.target.value });
                        }}
                    />
                    <InputField
                        required={true}
                        type="text"
                        name="accountNumber"
                        min={3}
                        label="Číslo bankovního účtu"
                        error={personErrors.accountNumber}
                        prompt="Zadejte číslo bankovního účtu"
                        value={person.accountNumber}
                        handleChange={(e) => {
                            setPerson({ ...person, accountNumber: e.target.value });
                        }}
                    />
                    <InputField
                        required={true}
                        type="text"
                        name="bankCode"
                        min={3}
                        label="Kód banky"
                        error={personErrors.bankCode}
                        prompt="Zadejte kód banky"
                        value={person.bankCode}
                        handleChange={(e) => {
                            setPerson({ ...person, bankCode: e.target.value });
                        }}
                    />
                    <InputField
                        required={true}
                        type="text"
                        name="IBAN"
                        min={3}
                        label="IBAN"
                        error={personErrors.iban}
                        prompt="Zadejte IBAN"
                        value={person.iban}
                        handleChange={(e) => {
                            setPerson({ ...person, iban: e.target.value });
                        }}
                    />
                    <InputField
                        required={true}
                        type="text"
                        name="telephone"
                        min={3}
                        label="Telefon"
                        error={personErrors.telephone}
                        prompt="Zadejte Telefon"
                        value={person.telephone}
                        handleChange={(e) => {
                            setPerson({ ...person, telephone: e.target.value });
                        }}
                    />
                    <InputField
                        required={true}
                        type="text"
                        name="mail"
                        min={3}
                        label="Mail"
                        error={personErrors.mail}
                        prompt="Zadejte mail"
                        value={person.mail}
                        handleChange={(e) => {
                            setPerson({ ...person, mail: e.target.value });
                        }}
                    />
                    <InputField
                        required={true}
                        type="text"
                        name="street"
                        min={3}
                        label="Ulice"
                        error={personErrors.street}
                        prompt="Zadejte ulici"
                        value={person.street}
                        handleChange={(e) => {
                            setPerson({ ...person, street: e.target.value });
                        }}
                    />
                    <InputField
                        required={true}
                        type="text"
                        name="city"
                        min={3}
                        label="Město"
                        error={personErrors.city}
                        prompt="Zadejte město"
                        value={person.city}
                        handleChange={(e) => {
                            setPerson({ ...person, city: e.target.value });
                        }}
                    />
                    <InputField
                        required={true}
                        type="text"
                        name="ZIP"
                        min={3}
                        label="PSČ"
                        error={personErrors.zip}
                        prompt="Zadejte PSČ"
                        value={person.zip}
                        handleChange={(e) => {
                            setPerson({ ...person, zip: e.target.value });
                        }}
                    />
                    <InputField
                        required={true}
                        type="text"
                        name="note"
                        label="Poznámka"
                        error={personErrors.note}
                        value={person.note}
                        handleChange={(e) => {
                            setPerson({ ...person, note: e.target.value });
                        }}
                    />
                    <h6 className="mt-3">Země:</h6>
                    <InputCheck
                        type="radio"
                        name="country"
                        label="Česká republika"
                        value={Country.CZECHIA}
                        handleChange={(e) => {
                            setPerson({ ...person, country: e.target.value });
                        }}
                        checked={Country.CZECHIA === person.country}
                    />
                    <InputCheck
                        type="radio"
                        name="country"
                        label="Slovensko"
                        value={Country.SLOVAKIA}
                        handleChange={(e) => {
                            setPerson({ ...person, country: e.target.value });
                        }}
                        checked={Country.SLOVAKIA === person.country}
                    />

                    <div className="my-3">
                        <input type="submit" className="btn btn-success border border-black shadow" value="Uložit" />
                        <Link to={"/people"} className="btn btn-primary border border-black shadow ms-2">
                            Zpět
                        </Link>
                    </div>
                </form>
            )}
        </div>
    );
}

export default PersonForm;
