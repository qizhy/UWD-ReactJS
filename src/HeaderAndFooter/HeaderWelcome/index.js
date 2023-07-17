
import { useEffect, useState } from 'react'
import './header.scss'
import logoGray from './logoGray.png'
import { Link } from 'react-router-dom'
import axios from 'axios'

function HeaderWelcome() {

    const currentUser = JSON.parse(localStorage.getItem('current-user'))
    const [isLogged, setIsLogged] = useState(false)
    useEffect(() => {
        if (currentUser) {
            axios.get('https://uwd-node-js.vercel.app/v1/auth/check-token?token='+currentUser.token)
                .then(res => {
                    if (res.data.message) {
                        setIsLogged(true)
                    }
                })
        }
    },[])

    return (
        <div id='headerWelcome' className='col-lg-12'>
            <div className='logo'>
                <img src={logoGray} height='90%' />
            </div>
            <div className='menu'>
                <div className='menu-item'>COLLECTIONS</div>
                <div className='menu-item'>LEARN</div>
                <div className='menu-item'>COMMUNITY</div>
                <div className='menu-item'>FAQ</div>
            </div>
            <div className='login-logout'>
                {
                    isLogged == true ? 
                    <>
                        <button className='btn-signup' ><Link to='/home' style={{textDecoration : 'none', color : 'rgb(89, 87, 87)'}}>Dashboard</Link></button>
                    </>:
                    <>
                        <button><Link to='/signin' style={{textDecoration : 'none', color : 'rgb(89, 87, 87)'}}>Sign in</Link></button>
                        <button className='btn-signup' ><Link to='/signup/new' style={{textDecoration : 'none', color : 'rgb(89, 87, 87)'}}>Sign up</Link></button>   
                    </>
                }
            </div>
        </div>
    );
}

export default HeaderWelcome;