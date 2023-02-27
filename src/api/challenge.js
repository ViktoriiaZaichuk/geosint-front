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

export const getChallenge = async (id) => {
    const response = await request({ method: "get", url: `/challenge/${id}` })
    if (response.status === 200) {
        return response.data
    } else {
        return false
    }
}

export const checkAnswer = async (id, answer) => {
    const response = await request({ method: "post", url: "userchallenge/check_answer", data: {challenge_id: id, answer: answer} })
    return response.data
}


export const updateChallenge = async (formData) => {
    const response = await request({ method: "patch", url: `/challenge/edit`, data: formData })

    if (response.status === 200) {
        return true
    } else {
        return false
    }
}

export const deleteChallenge = async (challengeId) => {
    const response = await request({ method: "delete", url: `/challenge/delete`, data: {challenge_id: challengeId} })
    if (response.status === 200) {
        return true
    } else {
        return false
    }
}


export const getRandomChallenges = async () => {
    const response = await request({ method: "get", url: `/challenges/random` })
    if (response.status === 200) {
        return response.data
    } else {
        return false
    }
}

export const  getLastCreatedChallenge = async () => {
    const response = await request({ method: "get", url: `/challenges/last_created` })
    if (response.status === 200) {
        return response.data[0]
    } else {
        return false
    }
}