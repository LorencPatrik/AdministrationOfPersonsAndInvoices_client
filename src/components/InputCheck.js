function InputCheck({ type, name, label, value, handleChange, checked }) {

    const INPUTS = ["checkbox", "radio"];
    const typeCheck = type.toLowerCase();
    const checkedInput = checked || "";

    if (!INPUTS.includes(typeCheck)) {
        return null;
    }

    return (
        <div className="form-group form-check">
            <label className="form-check-label">
                <input
                    type={typeCheck}
                    className="form-check-input"
                    name={name}
                    value={value}
                    checked={checkedInput}
                    onChange={handleChange}
                />{" "}
                {label}
            </label>
        </div>
    );
}

export default InputCheck;
