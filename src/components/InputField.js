function InputField({
    requied,
    type,
    name,
    error,
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
            <label>{label}: <span className="text-danger">{error}</span></label>
            <input
                required={required}
                type={typeField}
                className="form-control border-secondary-subtle shadow-sm"
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
