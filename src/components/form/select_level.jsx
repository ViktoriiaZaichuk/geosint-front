import React, { useRef, useState } from "react";

const SelectLevel = ({ onChange, onBlur, name, label, defaultValue }) => {
    const selectRef = useRef(null);
    const [value, setValue] = useState(1);

    const handleChange = (event) => {
        onChange(event);
        setValue(parseInt(event.target.value));
    };

    return (
      <div className="form-select">
        <label for="level">{label}</label>
        <select 
          id='level'
          name={name} 
          ref={selectRef} 
          onChange={handleChange} 
          onBlur={onBlur}
          value={value}
          defaultValue={1} 
        >
          <option value={1}>Facile</option>
          <option value={2}>Intermédiaire</option>
          <option value={3}>Expert</option>
        </select>
    </div>
    );
}

export default SelectLevel;