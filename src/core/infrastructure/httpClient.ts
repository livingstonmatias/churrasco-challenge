import axios from 'axios'

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Accept':'application/json',
        'Content-Type': 'application/json'
    }
})

instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
})

export default instance
