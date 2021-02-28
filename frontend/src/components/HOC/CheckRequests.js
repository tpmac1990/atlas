import React, { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const checkRequests = Wrapped => {
    function CheckRequests(props) {
        let history = useHistory();
        useEffect(()=>{
            axios.interceptors.response.use(function (response) {
                // Do something with response data
                return response;
            }, function (error) {
                switch (error.response.status) {
                    case 503 :
                        history.push('/503') //we will redirect user into 503 page 
                        break
                    case 404 :
                        console.log('this is the 404 push')
                        history.push('/404') 
                        break
                    default :
                        break
                }
                // Do something with response error
                return Promise.reject(error);
            });
        })

        return (
            <Wrapped {...props} />
        )
    }
    return CheckRequests
}

export default checkRequests