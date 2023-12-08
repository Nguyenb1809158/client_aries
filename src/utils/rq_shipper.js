import axios from "axios";
const rq_shipper = axios.create({
    baseURL: 'http://localhost:5000/shipper/api'
})
export default rq_shipper