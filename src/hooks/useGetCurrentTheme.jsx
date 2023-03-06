import { useContext, useEffect, useState } from "react"

import { getData } from "../utils/secureStore"
import { ThemeContext } from "../context/ThemeContext"

export const useGetCurrentTheme = () => {
    const { theme, toggleTheme } = useContext(ThemeContext)
    const [currentTheme, setCurrentTheme] = useState(theme)
    
    useEffect(() => {
        const storedTheme = getData("currentTheme")
        storedTheme && setCurrentTheme(storedTheme)
    }, [])

    useEffect(() => {
        if (currentTheme === "dark" && theme === "light") {
            toggleTheme()
        } 
    }, [currentTheme])
    
    return { theme, toggleTheme }
}