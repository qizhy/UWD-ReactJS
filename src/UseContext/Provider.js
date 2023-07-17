import { Context } from "./ThemeContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Provider({children}) {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('current-user'))
    const data = {
        currentUser : ''
    }
    const handle = {
        checkLogged : () =>{
            const currentUser = JSON.parse(localStorage.getItem('current-user'))
            if (currentUser == null) {
                setTimeout(() => {
                    navigate('/')
                }, 0); 
            } else {
                axios.get('https://uwd-node-js.vercel.app/v1/auth/check-token?token='+ currentUser.token)
                    .then (res => {
                        if (!res.data.message) {
                            navigate('/')
                        }
                    })
            }
        }
    }

    return ( 
        <Context.Provider value={[handle , data]}>
            {children}
        </Context.Provider>
     );
}

export default Provider;