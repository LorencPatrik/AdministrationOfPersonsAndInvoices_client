import Select from 'react-select';

function InputSelect({
    name,
    personsList,
    selectedPerson,
    setSelectedPerson,
    propertyName,
    handleChange }) {

    return (
        <div>
            <label>{name}:</label>
            <Select
                className='shadow-sm'
                styles={{ menu: provided => ({ ...provided, zIndex: 10 }) }}
                value={selectedPerson}
                defaultValue={personsList[0]}
                options={personsList}
                onChange={(e) => {
                    setSelectedPerson({ ...selectedPerson, value: e.value, label: e.label });
                    e = { ...e, target: { value: String(e.value), name: propertyName } };
                    handleChange(e);
                }}
            />
        </div>
    )
}

export default InputSelect;