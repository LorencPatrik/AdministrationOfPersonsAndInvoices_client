import "../components/TableSortButton.css";

function TableSortButtons({
    label,
    propertyName,
    handleSortOnClick,
    sortPropertyName,
    sortIsAscending }) {

    let buttonLeftClass = "btn-outline-secondary", buttonRightClass = "btn-outline-secondary";

    if (sortPropertyName == propertyName) {
        if (sortIsAscending) {
            buttonLeftClass = "btn-primary"
        } else
            buttonRightClass = "btn-primary";
    }

    return (
        <div className="d-flex align-items-end">{label}
            <button type="button" className={"btn height px-1 py-0 shadow-sm ms-auto " + buttonLeftClass}
                onClick={() => { handleSortOnClick(propertyName, 1) }}>&uarr;
            </button>
            <button type="button" className={"btn height px-1 py-0 shadow-sm ms-1 " + buttonRightClass}
                onClick={() => { handleSortOnClick(propertyName, 0) }}>&darr;
            </button>
        </div>
    )
}

export default TableSortButtons;
