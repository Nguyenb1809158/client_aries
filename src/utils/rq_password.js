import axios from "axios";
const rq_password = axios.create({
    baseURL: 'http://localhost:5000/password/api'
})
export default rq_password