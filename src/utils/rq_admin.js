import axios from "axios";
const rq_admin = axios.create({
    baseURL: 'https://server-aries-shop.onrender.com/admin/api'
})
export default rq_admin