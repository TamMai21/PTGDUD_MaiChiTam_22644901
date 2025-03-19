import axios from "axios";
import nProgress from "nprogress";
import { store } from '../redux/store'

nProgress.configure({
    showSpinner: false,
    trickleSpeed: 100,
})

const instance = axios.create({
    baseURL: 'http://localhost:8081/',
    timeout: 5000,
})

instance.interceptors.request.use((config) => {
    const access_token = store?.getState()?.user?.account?.access_token

    config.headers["Authorization"] = "Bearer " + access_token
    nProgress.start();
    return config
}, (error) => {
    return Promise.reject(error)
})


instance.interceptors.response.use((response) => {
    nProgress.done();
    return response && response.data ? response.data : response
}, (error) => {
    nProgress.done();
    return error && error.response && error.response.data ? error.response.data : Promise.reject(error)
})

export default instance