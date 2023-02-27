import request from './config'

export const getUser = async () => {
    const response = await request({ method: 'get', url: `/me` })
    if (response.status === 200) {
        return response.data.user
    }
}

export const updateUser = async (formData) => {
    const response = await request({
        method: 'patch',
        url: `/me/update`,
        data: formData,
    })
    if (response.status === 200) {
        return true
    } else {
        return false
    }
}

export const updatePassword = async (formData) => {
    const response = await request({
        method: 'patch',
        url: `/me/change_password`,
        data: formData,
    })
    if (response.status === 200) {
        return true
    } else {
        return false
    }
}

export const getChallengesDone = async () => {
    const response = await request({ method: 'get', url: `/me/challenges/done` })
    if (response.status === 200) {
        return response.data.doneChallenges
    } else {
        return false
    }
}

export const getUsersRanking = async () => {
    const response = await request({ method: 'get', url: `/users_ranking` })
    if (response.status === 200) {
        return response.data.usersByScore
    } else {
        return false
    }
}

export const forgotPassword = async (email) => {
    const response = await request({ method: 'post', url: `/forgot_password`, data: { email } })
    if (response.status === 200) {
        return true
    } else {
        return false
    }
}
