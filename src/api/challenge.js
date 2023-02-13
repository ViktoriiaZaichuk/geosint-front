import request from "./config";

export const createChallenge = async (formData) => {
    const response = await request({ method: "post", url: "/challenge/create", data: formData})
    if (response.status === 201) {
        console.log(response)
        console.log("yess")
        return true
    } else {
        console.log("noooo")
        return false
    }
}