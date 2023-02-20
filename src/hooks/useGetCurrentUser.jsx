import { useContext, useEffect, useState } from "react"

import { getData } from "../utils/secureStore"
import { UserContext } from "../context/UserContext"

const useGetCurrentUser = () => {
    const { user, dispatch } = useContext(UserContext)
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const storedUser = getData("currentUser")
        storedUser && setCurrentUser(storedUser)
    }, [])

    useEffect(() => {
        if (currentUser?.login) {
            dispatch({ type: "REQUEST_LOGIN" })
            const payload = {
                username: currentUser.username,
                avatar: currentUser.avatar,
                global_score: currentUser.global_score
            }
            dispatch({ type: "GET_USER", payload })
            dispatch({ type: "GET_TOKEN", payload: currentUser.token })
            dispatch({ type: "LOGIN_SUCCESS", payload: currentUser.id })
        }
    }, [currentUser, dispatch])

    return user
}

export default useGetCurrentUser