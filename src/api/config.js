import axios from 'axios'
import { getData } from '../utils/secureStore'

const instance = axios.create({
    baseURL: 'http://la-tote-server.eddi.cloud:8080/api',
})

instance.interceptors.request.use(async (config) => {
    const { token } = getData('currentUser');
    config.headers.Authorization = token;
    return config;
})

const request = async ({ ...options }) => {
    const onSuccess = response => {
        return response;
    }

    const onError = error => error

    return instance(options).then(onSuccess).catch(onError)
}

export default request