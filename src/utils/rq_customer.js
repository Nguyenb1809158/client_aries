import axios from "axios";
const rq_customer = axios.create({
    baseURL: 'https://server-aries-shop.onrender.com/customer/api'
})
export default rq_customer