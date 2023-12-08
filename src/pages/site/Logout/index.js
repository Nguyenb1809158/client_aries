import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import request from "~/utils/request";

function Logout() {
    const navigate = useNavigate()
    useEffect(()=>{
        request.get('/logout')
        .then(res=>{
            if(res.data.logout)
            navigate('/')
        })
    })
    return ( <div></div> );
}

export default Logout;