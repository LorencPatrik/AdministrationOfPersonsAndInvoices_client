function InputField({
    requied,
    type,
    name,
    min,
    label,
    prompt,
    value,
    handleChange }) {

    const INPUTS = ["text", "number", "date"];
    const typeField = type.toLowerCase();
    const required = requied || false;
    if (!INPUTS.includes(typeField)) {
        return null;
    }

    const minProp = min || null;
    const minValue = ["number", "date"].includes(typeField) ? minProp : null;
    const minlength = ["text"].includes(typeField) ? minProp : null;

    return (
        <div className="form-group">
            <label>{label}:</label>
            <input
                required={required}
                type={typeField}
                className="form-control"
                placeholder={prompt}
                minLength={minlength}
                min={minValue}
                name={name}
                value={value}
                onChange={handleChange}
            />
        </div>
    );
}

export default InputField;
