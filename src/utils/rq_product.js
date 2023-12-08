import axios from "axios";
const rq_product = axios.create({
    baseURL: 'http://localhost:5000/product/api'
})
export default rq_product