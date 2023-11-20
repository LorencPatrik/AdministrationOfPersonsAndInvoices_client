import { useState, useEffect } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";

import { apiGet } from "../utils/api";
import LoadingSpinner from "../components/LoadingSpinner";

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
            <h3 className="pb-2">Statistiky příjmu všech firem</h3>
            {isLoadingInvoices ? (
                <LoadingSpinner size="4" />
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
            <h3>Statistiky příjmu jednotlivých firem</h3>
            {isLoadingPeople ? (
                <LoadingSpinner size="4" />
                ) : (
                    <>  
                        <label>Vyberte firmu:</label>
                        <Select
                            className="mb-3"
                            value={selectedPerson}
                            defaultValue={options[0]}
                            options={options}
                            onChange={(e) => {
                                setSelectedPerson({ ...selectedPerson, value: e.value, label: e.label })
                            }}
                        />
                        <h5>
                            <strong>Celkem za celou dobu: </strong>{person.revenue},-
                        </h5>
                        <p>Celkem faktur za celou dobu: {person.count}</p>
                        <h5>
                            <strong>Celkem za minulý rok: </strong>{person.lastYearRevenue},-
                        </h5>
                        <p>Celkem faktur minulý rok: {person.lastYearCount}</p>
                    </>
                )
            }
            <Link to={-1} className="btn btn-primary mb-3">
                Zpět
            </Link>
        </div>
    )
}

export default Statistic;