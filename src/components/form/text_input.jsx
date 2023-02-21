import React from "react";
import { Controller } from "react-hook-form";
import { GiBleedingEye } from "react-icons/gi";
import { GiBoltEye } from "react-icons/gi";

const TextInput = ({ control, name, type, label, placeholder, error }) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <div className="login--form__input">
            <label htmlFor={name}>{label}</label>
            <Controller 
                name={name}
                control={control}
                defaultValue = ''
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <input 
                            type={type === "password" && !showPassword ? "password" : "text"}
                            name={name}
                            id={name}
                            autoComplete="off"
                            placeholder={placeholder}
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                        />
                        {(type === "password" && showPassword) ? (
                            <GiBleedingEye
                                onClick={() => setShowPassword(!showPassword)}
                                size={23}
                                fill={"#3E3E3E"}
                            />
                        ) : (type === "password" && !showPassword) && (
                            <GiBoltEye
                                onClick={() => setShowPassword(!showPassword)}
                                size={23}
                                fill={"#3E3E3E"}
                            />
                        )}
                    </>
                )}
            />
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default TextInput;