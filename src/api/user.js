import request from "./config"

export const getUser = async () => {
    const response = await request({ method: "get", url: `/me` })
    if (response.status === 200) {
        return response.data.user
    } 
}

export const updateUser = async (formData) => {
    const response = await request({ method: "patch", url: `/me/update`, data: formData })
    if (response.status === 200) {
        return true
    } else {
        return false
    }
}