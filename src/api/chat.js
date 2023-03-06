import request from "./config";

export const getChatListByChallenge = async (challengeId) => {
    const response = await request({ method: "get", url: `/chat/${challengeId}/messages` })
    if (response.status === 200) {
        return response.data
    } else {
        return false
    }
}