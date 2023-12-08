import axios from "axios";
const rq_nv = axios.create({
    baseURL: 'https://server-aries-shop.onrender.com/employee/api'
})
export default rq_nv