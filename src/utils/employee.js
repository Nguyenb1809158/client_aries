import axios from "axios";
const rq_nv = axios.create({
    baseURL: 'http://localhost:5000/employee/api'
})
export default rq_nv