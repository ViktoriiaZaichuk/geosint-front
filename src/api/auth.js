import request from "./config"

export const loginUser = async (dispatch, email, password) => {
    dispatch({ type: "REQUEST_LOGIN" })
    const user = await request({ method: "post", url: "/login", data: { email, password } })
}