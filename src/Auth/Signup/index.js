
import './signup.scss'
import imageSignup from './signup.png'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Notification from '../../Notification';
import { useState } from 'react';


function Signup() {

    let resultUsername = false
    let resultEmail = false
    const [notifi, setNotifi] =  useState({status : 'none', message  : '', isAuth : true})

    const handleSubmit  = (e)  => {
        e.preventDefault()
        if (document.querySelector('#txtname').value  && document.querySelector('#txtdateofbirth').value && document.querySelector('#txtpassword').value &&  resultEmail && resultUsername) {
            axios.post('https://uwd-node-js.vercel.app/v1/auth/register', {
            username : document.querySelector('#txtusername').value,
            name : document.querySelector('#txtname').value,
            password : document.querySelector('#txtpassword').value,
            dateOfBirth : document.querySelector('#txtdateofbirth').value,
            email : document.querySelector('#txtemail').value
            })
                .then (res => {
                    if (res.data)  {
                        document.querySelector('#txtusername').value = ''
                        document.querySelector('#txtname').value  = ''
                        document.querySelector('#txtpassword').value = ''
                        document.querySelector('#txtdateofbirth').value = null
                        document.querySelector('#txtemail').value = ''
                        document.querySelector('.resultUsernameSuccessfully').style.opacity = 0
                        document.querySelector('.resultUsernameFail').style.opacity = 0
                        document.querySelector('.resultEmailSuccessfully').style.opacity = 0
                        document.querySelector('.resultEmailFail').style.opacity = 0
                        setNotifi({status : 'none',message : ''})
                        setTimeout(() => {
                            setNotifi({status : 'success',message : 'Account successfully created'})
                         }, 100); 
                    }
                })
        } else {
            setNotifi({status : 'none',message : ''})
            setTimeout(() => {setNotifi({status : 'fail',message : 'Invalid input value'})}, 50); 
        }
    }

    const handleChangeUsername = (e) =>  {
        e.preventDefault()
        const txtusername  = document.querySelector('#txtusername')
        axios.get('https://uwd-node-js.vercel.app/v1/auth/check-username?username=' + txtusername.value)
            .then (res => {
                resultUsername = res.data.exist
                if(resultUsername) {
                    document.querySelector('.resultUsernameSuccessfully').style.opacity = 1
                    document.querySelector('.resultUsernameFail').style.opacity = 0
                } else {
                    document.querySelector('.resultUsernameSuccessfully').style.opacity = 0
                    document.querySelector('.resultUsernameFail').style.opacity = 1
                }
            })
    }

    const handleChangeEmail = (e) =>  {
        e.preventDefault()
        const txtemail  = document.querySelector('#txtemail')
        if  (txtemail.value.includes('@') && txtemail.value.includes('.com')) {
            axios.get('https://uwd-node-js.vercel.app/v1/auth/check-email?email=' + txtemail.value)
            .then (res => {
                resultEmail = res.data.exist
                if(resultEmail) {
                    document.querySelector('.resultEmailSuccessfully').style.opacity = 1
                    document.querySelector('.resultEmailFail').style.opacity = 0
                } else {
                    document.querySelector('.resultEmailSuccessfully').style.opacity = 0
                    document.querySelector('.resultEmailFail').style.opacity = 1
                }
            })
        }
    }

    return (
        <div id='signup' className='col-lg-12 col-12'>
            <Notification status={notifi.status}  message={notifi.message} isAuth={true} />
            <div className='img col-lg-3 col-0' >
                <img src={imageSignup}  height={window.innerHeight + "px"}/>
            </div>
            <div className='col-lg-8 col-12' style={{position:'relative',display:'flex', justifyContent:'center', alignItems:'center'}}>
                <form onSubmit={handleSubmit} className='form-login'>
                    <h2 className='title'>Sign up to UWD</h2>
                    <div className='form-group'>
                        <label>Name</label>
                        <input type="text" className="form-control" id="txtname" />
                    </div>
                    <div className='form-group'>
                        <label>Date Of Birth</label>
                        <input type="date" className="form-control" id="txtdateofbirth" />
                    </div>
                    <div className='form-group'>
                        <label>Username</label>
                        <input type="text" onChange={handleChangeUsername} className="form-control" id="txtusername"/>
                        <span className='resultUsernameSuccessfully successfully result-item'><i className='bx bx-check-circle'></i> Valid username</span>
                        <span className='resultUsernameFail fail result-item'><i className='bx bx-x-circle'></i> Username already used</span>
                    </div>
                    <div className='form-group'>
                        <label>Email Address</label>
                        <input type="email" onChange={handleChangeEmail} className="form-control" id="txtemail" placeholder="name@example.com" />
                        <span className='resultEmailSuccessfully successfully result-item'><i className='bx bx-check-circle'></i> Valid email</span>
                        <span className='resultEmailFail fail result-item'><i className='bx bx-x-circle'></i> Email already used</span>
                    </div>
                    <div className='form-group'>
                        <label>Password</label>
                        <input type="password" className="form-control" id="txtpassword" />
                    </div>
                    <button type="submit" className="btn btn-signup">Create Account</button>
                </form>
                <p className='signup-now' style={{position:'absolute'}}>Already a member? <Link to='/signin'>Sign In</Link></p>
            </div>
        </div>
    );
}

export default Signup;