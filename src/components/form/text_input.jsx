import React from "react";
import { Controller } from "react-hook-form";
import { GiBleedingEye } from "react-icons/gi";
import { GiBoltEye } from "react-icons/gi";

const TextInput = ({ id, control, name, type, label, placeholder, error, challengeResponse, challengeAnswer }) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [isSingleQuoteTyped, setIsSingleQuoteTyped] = React.useState(false);

    const handleKeyPress = (e) => {
        if (challengeResponse && e.key === "'") {
            setIsSingleQuoteTyped(true);
        } else {
            setIsSingleQuoteTyped(false);
        }
    }

    return (
        <div className="login--form__input" id={id}>
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
                            onChange={challengeResponse ? (e) => onChange(e.target.value.replace("'", "")) : onChange}
                            onBlur={onBlur}
                            onKeyPress={challengeResponse ? handleKeyPress : null}
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
                        {challengeAnswer && <button type="submit">OK</button>}
                    </>
                )}
            />
            {error && <p className="error">{error}</p>}
            {(isSingleQuoteTyped && challengeResponse) && <p className="error">Les apostrophes ne sont pas autorisées</p>}
        </div>
    );
}

export default TextInput;