import { useContext, useEffect, useState } from "react"

import { getData, storeData } from "../utils/secureStore"
import { UserContext } from "../context/UserContext"

const useGetCurrentUser = () => {
    const { user, dispatch } = useContext(UserContext)
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const getCurrentUser = async () => {
            const storedUser = await getData("currentUser")
            storedUser && setCurrentUser(storedUser)
        }

        getCurrentUser()
    }, [])

    useEffect(() => {
        if (currentUser?.login) {
            dispatch({ type: "REQUEST_LOGIN" })
            const payload = {
                id: currentUser.id,
                username: currentUser.username,
                avatar: currentUser.avatar,
                global_score: currentUser.global_score,
                login: true,
            }
            dispatch({ type: "LOGIN_SUCCESS", payload })
            dispatch({ type: "GET_TOKEN", payload: { token: currentUser.token } })
        }
    }, [currentUser])

    useEffect(() => {
        const storeCurrentUser = async () => {
            await storeData("currentUser", user)
        }

        storeCurrentUser()
    }, [user])

    return user
}

export default useGetCurrentUser