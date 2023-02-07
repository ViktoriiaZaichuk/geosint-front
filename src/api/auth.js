import request from "./config"

export const loginUser = async (dispatch, email, password) => {
    dispatch({ type: "REQUEST_LOGIN" })
    const response = await request({ method: "post", url: "/login", data: { email, password } })
    const { id, token } = response.data
    if (id && token) {
        dispatch({ type: "LOGIN_SUCCESS", payload: id })
        dispatch({ type: "GET_TOKEN", payload: token })
        return true
    } else {
        dispatch({ type: "LOGIN_ERROR", error: response.message })
        return false
    }
}

export const registerUser = async (formData) => {
    const response = await request({ method: "post", url: "/signup", data: formData })
    if (response.status === 201) {
        return true
    } else {
        return false
    }
}

export const logoutUser = async (dispatch) => {
    return dispatch({ type: "LOGOUT" })
}