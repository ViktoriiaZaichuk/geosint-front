import request from "./config";

export const createChallenge = async (formData) => {
    const response = await request({ method: "post", url: "/challenge/create", data: formData})
    if (response.status === 201) {
        return true
    } else {
        return false
    }
}
export const getChallenges = async () => {
    const response = await request({ method: "get", url: `/challenges` })
    if (response.status === 200) {
        return response.data
    } else {
        return false
    }
}