import { useState, useEffect } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";

import { apiGet } from "../utils/api";
import LoadingSpiner from "../components/LoadingSpiner";

let person;

const Statistic = () => {

    const [statistic, setStatistic] = useState();
    const [isLoadingInvoices, setIsLoadnigInvoices] = useState(true);
    const [isLoadingPeople, setIsLoadingPeople] = useState(true);
    const [personsStatistic, setPersonsStatistic] = useState();
    const [options, setOptions] = useState();
    const [selectedPerson, setSelectedPerson] = useState();

    useEffect(() => {
        setIsLoadnigInvoices(true);
        setIsLoadingPeople(true);
        apiGet("/api/invoices/statistics").then((data) => {
            setStatistic(data);
            setIsLoadnigInvoices(false);
        })
        apiGet("/api/people/statistics").then((data) => {
            setPersonsStatistic(data);
            setOptions(data.map(item => ({ ...options, value: item.personId, label: item.personName })));
            setSelectedPerson({ ...selectedPerson, value: data[0].personId, label: data[0].personName });
            setIsLoadingPeople(false);
        })
    }, []);

    if (!isLoadingPeople) {
        const onePersonInArray = personsStatistic.filter((item) => {
            return (item.personId == selectedPerson.value);
        });
        person = onePersonInArray[0];
    }

    return (
        <div className="px-2">
            <h3 className="text-decoration-underline  text-black text-opacity-75 mb-3">Statistiky příjmu všech osob</h3>
            {isLoadingInvoices ? (
                <LoadingSpiner size="4" />
            ) : (
                <>
                    <h5>
                        <strong>Celkem za celou dobu: </strong>{statistic.allTimeRevenue},-
                    </h5>
                    <p>Celkem faktur za celou dobu: {statistic.allTimeCount}</p>
                    <h5>
                        <strong>Celkem minulý rok: </strong>{statistic.lastYearRevenue},-
                    </h5>
                    <p>Celkem faktur minulý rok: {statistic.lastYearCount}</p>
                </>
            )
            }
            <hr />
            <h3 className="text-black text-opacity-75">Statistiky příjmu jednotlivých osob</h3>
            {isLoadingPeople ? (
                <LoadingSpiner size="4" />
            ) : (
                <>
                    <label>Vyberte osobu:</label>
                    <Select
                        className="mb-3 shadow-sm"
                        value={selectedPerson}
                        defaultValue={options[0]}
                        options={options}
                        onChange={(e) => {
                            setSelectedPerson({ ...selectedPerson, value: e.value, label: e.label })
                        }}
                    />
                    <h5>
                        <strong>Celkem za celou dobu: </strong>{person.revenue ? person.revenue : 0},-
                    </h5>
                    <p>Celkem faktur za celou dobu: {person.count ? person.count : 0}</p>
                    <h5>
                        <strong>Celkem minulý rok: </strong>{person.lastYearRevenue ? person.lastYearRevenue : 0},-
                    </h5>
                    <p>Celkem faktur minulý rok: {person.lastYearCount ? person.lastYearCount : 0}</p>

                    <p><em>Dále si můžete zobrazit všechny přijaté a vydané faktury konkrétní osobou v zálžce Osoby/Zobrazit</em></p>
                </>
            )
            }
            <Link to={-1} className="btn btn-primary border border-black shadow mb-3">
                Zpět
            </Link>
        </div>
    )
}

export default Statistic;
