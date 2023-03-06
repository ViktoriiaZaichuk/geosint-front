import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Switch from "react-switch";

import { ReactComponent as Sun } from '../assets/icons/white_sun.svg'
import { ReactComponent as Moon } from '../assets/icons/white_moon.svg'

const ThemeSwitch = ({ style }) => {
    const { theme, toggleTheme } = useContext(ThemeContext)

    return (
        <Switch
            onChange={toggleTheme}
            checked={theme === "dark"}
            checkedIcon={
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "5px" }}>
                    <Moon />
                </div>
            }
            uncheckedIcon={
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "5px" }}>
                    <Sun />
                </div>
            }
            height={30}
            width={80}
            handleDiameter={32}
            offColor="#3E3E3E"
            onColor="#FFFFFF"
            onHandleColor="#BFFFD6"
            offHandleColor="#CDB4FF"
            style={style}
        />
    );
};

export default ThemeSwitch;