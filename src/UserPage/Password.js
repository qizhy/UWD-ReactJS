
import './userpage.scss'
import Password from './Password';
import { useContext,useEffect , useRef, useState } from 'react';
import { Context } from '../UseContext/ThemeContext';
import Notification from '../Notification'
import { Link, useNavigate } from 'react-router-dom';
import defaultUser from '../default-user.jpg'
import axios from 'axios';

function PasswordPage({user}) {
    const navigate = useNavigate()
    const [handle, data] = useContext(Context)
    const [currentUser, setCurrentUser] = useState()
    useEffect(() => {
        setCurrentUser(user)
    },[user])
    const [notifi, setNotifi] = useState({status : 'none', message : ''})
    handle.checkLogged()

    const treatmentRef = useRef()
    
    const handleChange = () => {
        const passnew = document.querySelector('.txt-passnew').value
        const passold = document.querySelector('.txt-passold').value
        const repassnew = document.querySelector('.txt-repassnew').value
        if (passnew != '' && passold != '' && repassnew != "") {
            if (passnew.length < 6) {
                setNotifi({status : 'none', message : ''})
                setTimeout(() => {setNotifi({status : 'warning', message : 'New password must be more than 6 characters'})}, 50);
            } else {
                if (passnew != repassnew) {
                    setNotifi({status : 'none', message : ''})
                    setTimeout(() => {setNotifi({status : 'warning', message : 'New password and confirmation password must match'})}, 50);
                } else {
                    axios.put('https://uwd-node.vercel.app/v1/user/update-password', {oldPassword : passold, newPassword : passnew}, {headers : {token : 'Bearer ' + JSON.parse(localStorage.getItem('current-user')).token}})
                    .then(res => {
                        if (res.data.code == 200) {
                            document.querySelector('.txt-passnew').value = ''
                            document.querySelector('.txt-passold').value  = ''
                            document.querySelector('.txt-repassnew').value = ''
                            setNotifi({status : 'none', message : ''})
                            setTimeout(() => {setNotifi({status : 'success', message : 'Password update successfully'})}, 50);

                        } else if (res.data.code == 401) {
                            setNotifi({status : 'none', message : ''})
                            setTimeout(() => {setNotifi({status : 'warning', message : 'Old password does not exist'})}, 50);
                        } else {
                            setNotifi({status : 'none', message : ''})
                            setTimeout(() => {setNotifi({status : 'fail', message : 'Password update failed'})}, 50);
                        }
                    })
                }
            }
        } else {
            setNotifi({status : 'none', message : ''})
            setTimeout(() => {setNotifi({status : 'warning', message : 'Please enter complete information'})}, 50);
        }
    }

    const handleDeleteUser = () => {
        axios.delete('https://uwd-node.vercel.app/v1/user/delete-user', {headers : {token :  'Bearer ' + JSON.parse(localStorage.getItem('current-user')).token}})
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
                        <div className='title'> {currentUser ? currentUser.name : ''} / Password</div>
                        <div className='description'>
                            Manage your password
                        </div>
                    </div>
                </div>
                <div className='col-lg-12 menu-and-treatment'>
                    <div className='col-lg-4 menus'>
                        <Link className='link' to='/account/general'><div className='menu-item general'>General</div></Link>
                        <Link className='link' to='/account/edit-profile'><div className='menu-item edit-profile'>Edit Profile</div></Link>
                        <Link className='link' to='/account/password'><div className='menu-item password active'>Password</div></Link>
                        <div className='cut-across'></div>
                        <div className='menu-item' onClick={handleDeleteUser} style={{color : 'red'}}>Delete Account</div>
                    </div>
                    <div ref={treatmentRef} className='col-lg-8 treatment'>
                        <div className='col-lg-12' id='password' style={{minHeight : '350px'}}>
                            <div className='group'>
                                <label>Old Password</label>
                                <input type="password" className="form-control txt-passold txt" />
                            </div>
                            <div className='group'>
                                <label>New Password</label>
                                <input type="password" className="form-control txt-passnew txt" />
                                <span>Minimum 6 characters</span>
                            </div>
                            <div className='group'>
                                <label>Confirm New Password</label>
                                <input type="password" className="form-control txt-repassnew txt" />
                            </div>
                            <div className='group' style={{display : 'flex', justifyContent : 'end'}}>
                                <button className='btn-save' onClick={handleChange}>Change</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PasswordPage;