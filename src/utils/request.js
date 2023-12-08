import axios from "axios";
const request= axios.create({
    baseURL: 'https://server-aries-shop.onrender.com/api'
})
export default request