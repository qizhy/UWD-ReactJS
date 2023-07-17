
import './userpage.scss'
import axios from "axios";
import { useContext,useEffect , useRef, useState } from 'react';
import { Context } from '../UseContext/ThemeContext';
import Notification from '../Notification'
import { Link, useNavigate } from 'react-router-dom';
import defaultUser from '../default-user.jpg'

function EditProfilePage({user}) {
    const navigate = useNavigate()
    const [i , setI] = useState(0)
    const [handle,  data] = useContext(Context)
    const [currentUser, setCurrentUser] = useState()
    useEffect(() => {
        setCurrentUser(user)
    },[user])
    const [notifi, setNotifi] = useState({status : 'none', message : ''})
    handle.checkLogged()
    const treatmentRef = useRef()
    const imageUser = useRef()

    useEffect(() => {
        if (currentUser && i == 0)  {
            document.querySelector('.txt-name').value = currentUser.name
            document.querySelector('.txt-location').value = currentUser.location
            document.querySelector('.txt-bio').value = currentUser.bio
            document.querySelector('.txt-date').value = currentUser.dateOfBirth.split('T')[0]
        }
    }, [currentUser])

    const handleClickSaveImage = () => {
        if (imageUser.current.files[0]) {
            const formData = new FormData();
            const file = imageUser.current.files[0]
            formData.append('image', file)
            axios.post('https://uwd-node-js.vercel.app/v1/user/upload-new-avatar', formData, {headers : {token :  'Bearer ' + JSON.parse(localStorage.getItem('current-user')).token}})
                .then(res => {
                    if(res.data.code == 200) {
                        window.location.reload()
                    }
                })
        }  else {
            setNotifi({status : 'none', message : ''})
            setTimeout(() => {setNotifi({status : 'fail', message : 'Choose file image, Please'})}, 50);
        }
    }

    const handleDeleteAvatar = () => {
        if (currentUser.URL_Avatar != '') {
            axios.delete('https://uwd-node-js.vercel.app/v1/user/delete-avatar', {headers : {token :  'Bearer ' + JSON.parse(localStorage.getItem('current-user')).token}})
                .then(res => {
                    if(res.data.code == 200) {
                        window.location.reload()
                    }
                })
        } else {
            setNotifi({status : 'none', message : ''})
            setTimeout(() => {setNotifi({status : 'warning', message : 'Cannot delete default avatar'})}, 50);
        }
    }

    const handleChange =  () => {
        const name = document.querySelector('.txt-name').value
        const date = document.querySelector('.txt-date').value
        const location = document.querySelector('.txt-location').value
        const bio = document.querySelector('.txt-bio').value
        if (name == currentUser.name && date == currentUser.dateOfBirth.split('T')[0] && location == currentUser.location && bio == currentUser.bio) {
            setI(1)
            setNotifi({status : 'none', message : ''})
            setTimeout(() => {setNotifi({status : 'warning', message : 'Please change information before saving changes'})}, 50);
        } else {
            if (name != '') {
                axios.put('https://uwd-node-js.vercel.app/v1/user/update-profile', {name : name, date  : date, location : location, bio : bio} ,{headers : {token :  'Bearer ' + JSON.parse(localStorage.getItem('current-user')).token}})
                    .then(res => {
                        if(res.data.code == 200) {
                            window.location.reload()
                        } else {
                            setI(1)
                            setNotifi({status : 'none', message : ''})
                            setTimeout(() => {setNotifi({status : 'fail', message : 'Profile Update Failed'})}, 50);
                        }
                    })
            } else {
                setI(1)
                setNotifi({status : 'none', message : ''})
                setTimeout(() => {setNotifi({status : 'warning', message : 'Please enter name information'})}, 50);
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
                        <div className='title'> {currentUser ? currentUser.name : ''} / Edit Profile</div>
                        <div className='description'>
                            Set up your UWD presence
                        </div>
                    </div>
                </div>
                <div className='col-lg-12 menu-and-treatment'>
                    <div className='col-lg-4 menus'>
                        <Link className='link' to='/account/general'><div className='menu-item general'>General</div></Link>
                        <Link className='link' to='/account/edit-profile'><div className='menu-item edit-profile active'>Edit Profile</div></Link>
                        <Link className='link' to='/account/password'><div className='menu-item password'>Password</div></Link>
                        <div className='cut-across'></div>
                        <div className='menu-item' onClick={handleDeleteUser} style={{color : 'red'}}>Delete Account</div>
                    </div>
                    <div ref={treatmentRef} className='col-lg-8 treatment'>
                        <div className='col-lg-12' id='edit-profile' style={{minHeight : '350px'}}>
                            <div className='group' style={{display : 'flex'}}>
                                <div className="logo">
                                    {currentUser ? <img src={currentUser.URL_Avatar != '' ? currentUser.URL_Avatar  : defaultUser} height='100%'/> : <></>}
                                </div>
                                <div className="col-lg-7 action">
                                    <input ref={imageUser} type="file" className="image-user" accept=".jpg, .jpeg, .png"/>
                                    <div className="btns">
                                        <button onClick={handleClickSaveImage} className="btn-save">Save Picture</button>
                                        <button onClick={handleDeleteAvatar} className="btn-del">Delete</button>
                                    </div>
                                </div>
                            </div>
                            <div className='group'>
                                <label>Name <span style={{color : 'red', padding : '0 5px'}}>*</span></label>
                                <input type="text" className="form-control txt-name txt" />
                            </div>
                            <div className='group'>
                                <label>Date Of Birth</label>
                                <input type="date" className="form-control txt-date txt" />
                            </div>
                            <div className='group'>
                                <label>Location</label>
                                <input type="text" className="form-control txt-location txt" />
                            </div>
                            <div className='group'>
                                <label>Bio</label>
                                <textarea className="form-control txt-bio" rows="3"></textarea>
                            </div>
                            <div className='group' style={{display : 'flex', justifyContent : 'end'}}>
                                <button className='btn-save' onClick={handleChange}>Save Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProfilePage;