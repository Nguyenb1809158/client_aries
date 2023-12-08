import axios from "axios";
const rq_product = axios.create({
    baseURL: 'https://server-aries-shop.onrender.com/product/api'
})
export default rq_product