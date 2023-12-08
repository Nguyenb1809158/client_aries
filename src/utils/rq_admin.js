import axios from "axios";
const rq_admin = axios.create({
    baseURL: 'http://localhost:5000/admin/api'
})
export default rq_admin