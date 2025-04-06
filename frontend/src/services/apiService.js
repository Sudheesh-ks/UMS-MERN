import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/"
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => Promise.reject(err)
)

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response from backend", response.data)
    return response
  },
  (err) => {
    console.error("Error in response:", err)
    return Promise.reject("An Unexpected Error occurred")
  }
)

export { axiosInstance }
