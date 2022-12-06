import axios from 'axios'




export const axiosInstance = axios.create({
    baseURL:"https://veriphy-api.onrender.com"
})