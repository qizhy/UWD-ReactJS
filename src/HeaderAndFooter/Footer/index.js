
import './footer.scss'
import LogoBlack from './logoBlack.png'
import { useNavigate } from 'react-router-dom'
import Notification from '../../Notification'
import { useState } from 'react'

function Footer() {

    const navigate = useNavigate()
    const [notifi, setNotifi] = useState({status : 'none', message : '', isAuth : false})

    const handleClickSignOut = () => {
        localStorage.removeItem('current-user')
        setNotifi({status : 'none', message : ''})
        setTimeout(() => {setNotifi({status : 'success', message : 'Logout Successfully'})}, 50);
        setTimeout(() => {
            setNotifi({status : 'none', message : ''})
            setTimeout(() => {navigate('/')},500)
        }, 1500);
    }

    return (
        <>
            <div id='footer' className='col-lg-12'>
                <Notification status={notifi.status} message={notifi.message} isAuth={false} />
                <div className='logo-discription-icon-social item col-lg-2'>
                    <div className='logo col-lg-12 item'>
                        <img src={LogoBlack} height='100%'/>
                    </div>
                    <div className='item description col-lg-12'>
                    <p>UWD is a place where we can share our knowledge of UI UX design. To be a top designer</p>
                    </div>
                    <div className='icons'>
                        <i className="fa-brands fa-google"></i>
                        <i className="fa-brands fa-facebook"></i>
                        <i className="fa-brands fa-instagram"></i>
                        <i className="fa-brands fa-pinterest"></i>
                        <i className="fa-brands fa-youtube"></i>
                        <i className="fa-brands fa-twitter"></i>
                    </div>
                </div>

                <div className='col-lg-8 item other' >
                    <div className='for-designer col-lg-3'>
                        <p className='title'>For Designers</p>
                        <p className='line'>Home</p>
                        <p className='line'>Wed Development</p>
                        <p className='line'>Picture Collection</p>
                    </div>

                    <div className='for-user col-lg-3'>
                        <p className='title'>For User</p>
                        <p className='line'>Name : Vu Tien Duc</p>
                        <p className='line'>Edit Profile</p>
                        <p className='line'>Password</p>
                        <p className='line' onClick={handleClickSignOut}>Sign out</p>
                    </div>

                    <div className='wed-development col-lg-3'>
                        <p className='title'>Wed Development</p>
                        <p className='line'>Full Stack</p>
                        <p className='line'>Front End</p>
                        <p className='line'>Other</p>
                    </div>

                    <div className='picture-collection col-lg-3'>
                        <p className='title'>Picture Collection</p>
                        <p className='line'>Full Stack</p>
                        <p className='line'>Front End</p>
                        <p className='line'>Other</p>
                    </div>
                </div>
            </div>
            <div className='copyright col-lg-12'>
                © 2023 Wed UI Design. All rights reserved.
            </div>
        </>
    );
}

export default Footer;