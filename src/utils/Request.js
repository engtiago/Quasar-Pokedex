import axios from 'axios'
// import { getStorage } from './localStorage'

const HTTPClient = axios.create({
  baseURL: process.env.API_POKE
})
// HTTPClient.interceptors.request.use(
//   (config) => {
//     const token = getStorage('token')
//     if (token) {
//       config.headers.common.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )

// HTTPClient.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   (error) => Promise.reject(error)
// )

export { HTTPClient }
