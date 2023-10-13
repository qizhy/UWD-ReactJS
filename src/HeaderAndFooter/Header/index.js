

import { Link } from 'react-router-dom';
import './header.scss'
import logoWhite from './logoWhite.png'
import { useNavigate } from 'react-router-dom'
import Notification from '../../Notification'
import {useEffect, useState} from 'react'
import defaultUser from '../../default-user.jpg'

function Header({user}) {
    const [currentUser, setCurrentUser] = useState()
    useEffect(() => {
        setCurrentUser(user)
    },[user])

    const handleOverMenu = (str) => {
        const subMenu = document.querySelector(`.${str}`)
        const subMenusItem = subMenu.getElementsByClassName('sub-menu-item')
        subMenu.style.height = `${subMenusItem.length * 41}px`
        subMenu.style.opacity = 1
    }

    const handleOutMenu = (str) => {
        const subMenu = document.querySelector(`.${str}`)
        subMenu.style.height = '0px'
        subMenu.style.opacity = 0
    }

    const navigate = useNavigate()
    const [notifi, setNotifi] = useState({status : 'none', message : '', isAuth : false})

    const handleClickSignOut = () => {
        localStorage.removeItem('current-user')
        handleOutUser()
        setNotifi({status : 'none', message : ''})
        setTimeout(() => {setNotifi({status : 'success', message : 'Logout Successfully'})}, 50);
        setTimeout(() => {
            setNotifi({status : 'none', message : ''})
            setTimeout(() => {navigate('/')},500)
        }, 1500);
    }

    const handleOverUser = () => {
        const area = document.querySelector('.profile-area')
        area.style.height = '320px'
        area.style.opacity = 1
    }

    const handleOutUser = () => {
        const area = document.querySelector('.profile-area')
        area.style.height = '0px'
        area.style.opacity = 0
    }

    return (<>
        <div id='header' className='col-lg-12'>
            <Notification status={notifi.status} message={notifi.message} isAuth={false} />
            <div className='logo-and-menus col-lg-5'>
                <div className='logo'>
                    <img src={logoWhite}  height='100%'/>
                </div>
                <div className='menus'>
                    <Link className='link' to='/home'><div className='menu-item'>Home</div></Link>
                    <Link className='link' to='/wed-ui-design'><div className='menu-item'>Applications</div></Link>
                    <div className='menu-item' onMouseOver={() => handleOverMenu('sub-pic')} onMouseOut={() => handleOutMenu('sub-pic')} >Other Apps<i className='bx bx-chevron-down'></i>
                        <div className='sub-menu-area sub-pic'>
                        <Link className='link' to='/master-english'><div className='sub-menu-item'>Master English</div></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='user-and-search col-lg-5'>
                <div className='search'>
                    <input type='text' className='txtsearch' placeholder='Search...'/>
                    <i className="fa-solid fa-magnifying-glass icon-search"></i>
                </div>
                <div className='image-user' onMouseOver={handleOverUser} onMouseOut={handleOutUser}>
                    <div style={{height : '100%', display :'flex', alignItems : 'center', overflow : 'hidden', borderRadius : '50%', height : '75%'}}>
                        {currentUser ? <img src={currentUser.URL_Avatar != '' ? currentUser.URL_Avatar  : defaultUser} height='100%'/> : <></>}
                    </div>
                    <div className='profile-area col-lg-12'>
                        <div className='image-area col-lg-12'>
                            <div className='image-user-profile'>
                            {currentUser ? <img src={currentUser.URL_Avatar != '' ? currentUser.URL_Avatar  : defaultUser} height='100%'/> : <></>}
                            </div>
                        </div>
                        <div className='col-lg-12 name'>
                            {currentUser ? currentUser.name : ''}
                        </div>
                        <div className='col-lg-12 option'>
                            <Link className='link' to='/account/general'>Edit Profile</Link>
                            <Link className='link' to='/wed-ui-design/add-new'>Add Wed Design</Link>
                        </div>                        
                        <div className='col-lg-12 cut-across'></div>
                        <div className='col-lg-12 option' onClick={handleClickSignOut}>
                            Sign out
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='box-header'></div>
        </>
    );
}

export default Header;