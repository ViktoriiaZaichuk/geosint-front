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
    console.log(response.data)
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

export const deleteChallenge = async (id, formData) => {
    const response = await request({ method: "delete", url: `/challenge/challenge_id/delete`, data: formData })
    if (response.status === 200) {
        return true
    } else {
        return false
    }
}