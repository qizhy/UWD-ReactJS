
import './login.scss'
import imageLogin from './login.png'
import Notification from '../../Notification'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function Login() {

    const navigate = useNavigate()
    const [notifi, setNotifi] = useState({status : 'none', message : '', isAuth : true})

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('https://uwd-node.vercel.app/v1/auth/login', {
            username : document.querySelector('#txtusername').value,
            password : document.querySelector('#txtpassword').value
        })
            .then(res => {
                if (res.data.token) {
                    localStorage.setItem('current-user', JSON.stringify({token : res.data.token}))
                    setNotifi({status : 'none', message : '', isAuth : true})
                    setTimeout(() => {setNotifi({status : 'success', message : 'Logged in successfully',  isAuth : true})}, 50);
                    setTimeout(() => {
                        setNotifi({status : 'none', message : ''})
                        setTimeout(() => {
                            navigate('/home')
                            window.location.reload()
                        }, 500);
                    }, 1500)
                } else {
                    setNotifi({status : 'none', message : ''})
                    setTimeout(() => {setNotifi({status : 'fail', message : "Invalid login infomation", isAuth : true})}, 50);
                }
            })
    }



    return (
        <div id='login' className='col-lg-12 col-12'>
            <Notification status={notifi.status} message={notifi.message} isAuth={true} />
            <div className='img col-lg-3 col-0' >
                <img src={imageLogin}  height={window.innerHeight + "px"}/>
            </div>
            <div className='col-lg-8 col-12' style={{position:'relative',display:'flex', justifyContent:'center', alignItems:'center'}}>
                <form onSubmit={handleSubmit} className='form-login'>
                    <h2 className='title'>Sign in to UWD</h2>
                    <div className='form-group'>
                        <label>Username or Email Address</label>
                        <input type="text" className="form-control" id="txtusername" placeholder="name@example.com" />
                    </div>
                    <div className='form-group'>
                        <label>Password</label>
                        <input type="password" className="form-control" id="txtpassword" />
                    </div>
                    <button type="submit" className="btn btn-signin">Sign in</button>
                </form>
                <p className='signup-now' style={{position:'absolute'}}>Not a member? <Link to='/signup/new'>Sign up now</Link></p>
            </div>
        </div>
    );
}

export default Login;