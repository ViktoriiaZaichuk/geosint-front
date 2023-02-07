import React, { useRef } from "react";

const SelectLevel = ({ onChange, onBlur, name, label }) => {
    const selectRef = useRef(null);

    return (
        <div className="form-select">
          <label>{label}</label>
          <select 
            name={name} 
            ref={selectRef} 
            onChange={onChange} 
            onBlur={onBlur}
          >
            <option value="Facile">Facile</option>
            <option value="Intermédiaire">Intermédiaire</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
    );
}

export default SelectLevel;