
import './userpage.scss'
import General from './General';
import { useContext,useEffect , useRef, useState } from 'react';
import { Context } from '../UseContext/ThemeContext';
import Notification from '../Notification'
import { Link, useNavigate } from 'react-router-dom';
import defaultUser from '../default-user.jpg'
import axios from 'axios';

function GeneralPage({user}) {
    const navigate = useNavigate()
    const [handle, data] = useContext(Context)
    const [currentUser, setCurrentUser] = useState()
    useEffect(() => {
        setCurrentUser(user)
    },[user])
    const [notifi, setNotifi] = useState({status : 'none', message : ''})
    handle.checkLogged()
    const treatmentRef = useRef()
    
    useEffect(() => {
        document.querySelector('.txt-username').value = currentUser ? currentUser.username : ''
        document.querySelector('.txt-email').value = currentUser ? currentUser.email : ''
    },[currentUser]) 

    const handleChange = () => {
        const value = document.querySelector('.txt-email').value
        if (value == currentUser.email) {
            setNotifi({status : 'none', message : ''})
            setTimeout(() => {setNotifi({status : 'warning', message : 'You should change your email before saving your changes'})}, 50);
        } else {
            if (value.includes('@') && value.includes('.com')) {
                axios.put('https://uwd-node-js.vercel.app/v1/user/update-email', {email : value}, {headers : {token : 'Bearer ' + JSON.parse(localStorage.getItem('current-user')).token}})
                    .then(res => {
                        if (res.data.code == 200) {
                            window.location.reload()
                        }
                    })
            } else {
                setNotifi({status : 'none', message : ''})
                setTimeout(() => {setNotifi({status : 'fail', message : 'Invalid Email'})}, 50);
            }
        }
    }

    const handleDeleteUser = () => {
        axios.delete('https://uwd-node-js.vercel.app/v1/user/delete-user', {headers : {token :  'Bearer ' + JSON.parse(localStorage.getItem('current-user')).token}})
            .then(res => {
                if(res.data.code == 200) {
                    localStorage.removeItem('current-user')
                    setNotifi({status : 'none', message : ''})
                    setTimeout(() => {setNotifi({status : 'success', message : 'User delete successfully'})}, 50);
                    setTimeout(() => {
                        setNotifi({status : 'none', message : ''})
                        setTimeout(() => {navigate('/')},500)
                    }, 1500);
                } else {
                    setNotifi({status : 'none', message : ''})
                    setTimeout(() => {setNotifi({status : 'fail', message : 'User delete failed'})}, 50);
                }
            })
    }

    return (
        <div className="col-lg-12" style={{display : 'flex', justifyContent : 'center'}}>
            <Notification status={notifi.status}  message={notifi.message} isAuth={false}/>
            <div className="col-lg-8 userpage">
                <div className='col-lg-12 slat-header'>
                    <div className='logo'>
                        {currentUser ? <img src={currentUser.URL_Avatar != '' ? currentUser.URL_Avatar  : defaultUser} height='100%'/> : <></>}
                    </div>
                    <div className='col-lg-7 title-and-description'>
                        <div className='title'> {currentUser ? currentUser.name : ''} / General</div>
                        <div className='description'>
                            Update your username and manage your account
                        </div>
                    </div>
                </div>
                <div className='col-lg-12 menu-and-treatment'>
                    <div className='col-lg-4 menus'>
                        <Link className='link' to='/account/general'><div className='menu-item general active'>General</div></Link>
                        <Link className='link' to='/account/edit-profile'><div className='menu-item edit-profile'>Edit Profile</div></Link>
                        <Link className='link' to='/account/password'><div className='menu-item password'>Password</div></Link>
                        <div className='cut-across'></div>
                        <div className='menu-item' onClick={handleDeleteUser} style={{color : 'red'}}>Delete Account</div>
                    </div>
                    <div ref={treatmentRef} className='col-lg-8 treatment'>
                        <div className='col-lg-12' id='general' style={{minHeight : '350px'}}>
                            <div className='group'>
                                <label>Username</label>
                                <input type="text" className="form-control txt-username txt" disabled />
                            </div>
                            <div className='group'>
                                <label>Email</label>
                                <input type="text" className="form-control txt-email txt" />
                            </div>
                            <div className='group' style={{display : 'flex', justifyContent : 'end'}}>
                                <button className='btn-save' onClick={handleChange}>Save Change</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GeneralPage;