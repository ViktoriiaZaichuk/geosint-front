export const wait = function (duration) {
    return new Promise((resolve) => {
        window.setTimeout(resolve, duration)
    })
}

export default wait