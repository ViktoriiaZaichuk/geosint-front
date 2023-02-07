import axios from 'axios'
import { getData } from '../utils/secureStore'

// const getCSRFToken = async () => {
//     const response = await axios.get('http://la-tote-server.eddi.cloud:8080/api/csrf-token')
//     return response.data.CSRFToken
// }

const instance = axios.create({
    baseURL: 'http://la-tote-server.eddi.cloud:8080/api',
})

instance.interceptors.request.use(async (config) => {
    const { token } = await getData('currentUser');
    config.headers.Authorization = `Bearer ${token}`;
    // config.headers.post['X-CSRF-Token'] = await getCSRFToken();
    // config.headers.put['X-CSRF-Token'] = await getCSRFToken();
    // config.headers.delete['X-CSRF-Token'] = await getCSRFToken();
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