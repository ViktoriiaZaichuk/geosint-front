import React, { useEffect } from 'react'
import { storeData, getData } from '../utils/secureStore'

const ThemeContext = React.createContext("light");

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = React.useState("light");

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
        storeData("currentTheme", theme === "light" ? "dark" : "light");
    };

    useEffect(() => {
        const storedTheme = getData("currentTheme");
        storedTheme && setTheme(storedTheme);
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeContext, ThemeProvider };