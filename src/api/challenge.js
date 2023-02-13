import request from './config'

export const getChallenges = async () => {
    const response = await request({ method: "get", url: `/challenges` })
    if (response.status === 200) {
        return response.data
    } else {
        return false
    }
}