import InputField from "../components/InputField";

const PersonFilter = ({ handleChange, handleSubmit, filter }) => {

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col">
                    <InputField
                        type="text"
                        min="3"
                        name="name"
                        handleChange={handleChange}
                        label="Jméno"
                        prompt="neuvedeno"
                        value={filter.name ? filter.name : ""}
                    />
                </div>
                <div className="col">
                    <InputField
                        type="number"
                        min="0"
                        name="identificationNumber"
                        handleChange={handleChange}
                        label="Identifikační číslo"
                        prompt="neuvedeno"
                        value={filter.identificationNumber ? filter.identificationNumber : ""}
                    />
                </div>
                <div className="col">
                    <InputField
                        type="text"
                        min="3"
                        name="telephone"
                        handleChange={handleChange}
                        label="Telefonní číslo"
                        prompt="neuvedeno"
                        value={filter.telephone ? filter.telephone : ""}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <InputField
                        type="text"
                        min="3"
                        name="mail"
                        handleChange={handleChange}
                        label="E-mail"
                        prompt="neuveden"
                        value={filter.mail ? filter.mail : ""}
                    />
                </div>
                <div className="col">
                    <InputField
                        type="text"
                        min="2"
                        name="city"
                        handleChange={handleChange}
                        label="Město"
                        prompt="neuvedeno"
                        value={filter.city ? filter.city : ""}
                    />
                </div>
                <div className="col">
                    <InputField
                        type="number"
                        min="1"
                        name="limit"
                        handleChange={handleChange}
                        label="Limit počtu osob na stránku"
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
                        value="Zruš filtry"
                        onClick={() => {
                            filter.name = undefined,
                                filter.identificationNumber = undefined,
                                filter.telephone = undefined,
                                filter.mail = undefined,
                                filter.city = undefined,
                                filter.limit = undefined
                        }}
                    />
                </div>
            </div>
        </form>
    );
}

export default PersonFilter;
