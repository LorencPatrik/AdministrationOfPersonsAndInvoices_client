import { useState } from "react";
import InputSelect from "../components/InputSelect";
import InputField from "../components/InputField"

const InvoiceFilter = ({
    handleChange,
    handleSubmit,
    filter,
    personsList }) => {

    const [selectedSeller, setSelectedSeller] = useState();
    const [selectedBuyer, setSelectedBuyer] = useState();

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col">
                    <InputField
                        type="number"
                        min="1"
                        name="invoiceNumber"
                        handleChange={handleChange}
                        label="Číslo faktury"
                        prompt="neuvedeno"
                        value={filter.invoiceNumber ? filter.invoiceNumber : ""}
                    />
                </div>
                <div className="col">
                    <InputField
                        type="text"
                        min="3"
                        name="product"
                        handleChange={handleChange}
                        label="Název produktu"
                        prompt="neuveden"
                        value={filter.product ? filter.product : ""}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <InputSelect
                        name={"Prodávající"}
                        selectedPerson={selectedSeller}
                        setSelectedPerson={setSelectedSeller}
                        personsList={personsList}
                        propertyName={"sellerID"}
                        handleChange={handleChange}
                    />
                </div>
                <div className="col">
                    <InputSelect
                        name={"Kupující"}
                        selectedPerson={selectedBuyer}
                        setSelectedPerson={setSelectedBuyer}
                        personsList={personsList}
                        propertyName={"buyerID"}
                        handleChange={handleChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <InputField
                        type="number"
                        min="0"
                        name="minPrice"
                        handleChange={handleChange}
                        label="Cena od"
                        prompt="neuvedena"
                        value={filter.minPrice ? filter.minPrice : ""}
                    />
                </div>
                <div className="col">
                    <InputField
                        type="number"
                        min="0"
                        name="maxPrice"
                        handleChange={handleChange}
                        label="Cena do"
                        prompt="neuvedena"
                        value={filter.maxPrice ? filter.maxPrice : ""}
                    />
                </div>
                <div className="col">
                    <InputField
                        type="number"
                        min="1"
                        name="limit"
                        handleChange={handleChange}
                        label="Limit počtu faktur na stránku"
                        prompt="neuveden"
                        value={filter.limit ? filter.limit : ""}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <input
                        type="submit"
                        className="btn btn-secondary border border-black shadow mt-2"
                        value="Filtruj"
                    />
                    <input
                        type="submit"
                        className="btn btn-secondary border border-black shadow ms-2 mt-2"
                        value="Zruš Filtry"
                        onClick={() => {
                            setSelectedSeller({ value: 0, label: "nevybrán" });
                            setSelectedBuyer({ value: 0, label: "nevybrán" });
                            filter.invoiceNumber = undefined,
                                filter.product = undefined,
                                filter.sellerID = undefined,
                                filter.buyerID = undefined,
                                filter.minPrice = undefined,
                                filter.maxPrice = undefined,
                                filter.limit = undefined
                        }}
                    />
                </div>
            </div>
        </form>
    );
}

export default InvoiceFilter;
