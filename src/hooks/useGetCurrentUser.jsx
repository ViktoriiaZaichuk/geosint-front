import { useContext, useEffect, useState } from "react"
import jwt_decode from "jwt-decode"

import { getData, storeData } from "../utils/secureStore"
import { UserContext } from "../context/UserContext"

const useGetCurrentUser = () => {
    const { user, dispatch } = useContext(UserContext)
    const [currentUserToken, setCurrentUserToken] = useState(null)

    useEffect(() => {
        const storedUser = getData("currentUserToken")
        storedUser && setCurrentUserToken(storedUser)
    }, [])

    useEffect(() => {
        if (currentUserToken) {
            dispatch({ type: "REQUEST_LOGIN" })
            const decoded = jwt_decode(currentUserToken)
            dispatch({ type: "LOGIN_SUCCESS", payload: decoded.id })
            dispatch({ type: "GET_TOKEN", payload: currentUserToken })
        }
    }, [currentUserToken, dispatch])

    useEffect(() => {
        storeData("currentUserToken", user.token )
    }, [user])

    return user
}

export default useGetCurrentUser