import React from "react";
import { Controller } from "react-hook-form";

const TextInput = ({ control, name, type, label, placeholder, error }) => {
    return (
        <div className="login--form__input">
            <label htmlFor={name}>{label}</label>
            <Controller 
                name={name}
                control={control}
                defaultValue = ''
                render={({ field: { onChange, onBlur, value } }) => (
                    <input 
                        type={type}
                        name={name}
                        id={name}
                        autoComplete="off"
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                    />
                )}
            />
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default TextInput;