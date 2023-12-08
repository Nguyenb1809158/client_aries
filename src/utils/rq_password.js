import axios from "axios";
const rq_password = axios.create({
    baseURL: 'https://server-aries-shop.onrender.com/password/api'
})
export default rq_password