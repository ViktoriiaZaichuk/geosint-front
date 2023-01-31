import React from 'react'

const ThemeContext = React.createContext("light");

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = React.useState("light");

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeContext, ThemeProvider };