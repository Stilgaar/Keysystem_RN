import { useState, useEffect } from "react"

/* Change color themes yheaaaay */

function useTheme() {

    const getTheme = () => {
        return localStorage.getItem('@theme-humanneo')
    }

    const [theme, setTheme] = useState(() => getTheme())


    useEffect(() => {

        if (theme === null || theme === "null") {
            localStorage.setItem('@theme-humanneo', "white")
        } else {
            localStorage.setItem('@theme-humanneo', theme)
        }

    }, [theme])


    return { theme, setTheme }

}

export default useTheme; 