import axios from "axios";
const rq_customer = axios.create({
    baseURL: 'http://localhost:5000/customer/api'
})
export default rq_customer