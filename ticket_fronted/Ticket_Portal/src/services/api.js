import axios from 'axios'
import { apibaseurl } from '../lib'

const API = axios.create({
    baseURL: apibaseurl,
    headers: {
        'Content-Type': 'application/json',
    },
})

export default API