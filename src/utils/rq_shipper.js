import axios from "axios";
const rq_shipper = axios.create({
    baseURL: 'https://server-aries-shop.onrender.com/shipper/api'
})
export default rq_shipper