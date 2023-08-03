
import './formaddwedsite.scss'
import { useRef, useState } from 'react';
import Notification from '../../Notification'
import axios from 'axios';

function FormAddWedsite() {
    const imageUser = useRef()
    const [notifi, setNotifi] = useState({status : 'none', message : '', isAuth : true})
    const handleSubmit = () => {
        if (imageUser.current.files.length != 0) {
            const formData = new FormData();
            const file = imageUser.current.files[0]
            const title = document.querySelector('.txt-title').value
            const url = document.querySelector('.txt-url').value
            formData.append('image', file)
            formData.append('title', title)
            formData.append('url', url)
            axios.post('https://uwd-node.vercel.app/v1/wed/add-new-wedsite',formData, {headers : {token :  'Bearer ' + JSON.parse(localStorage.getItem('current-user')).token}})
                .then(res => {
                    if (res.data.code == 200) {
                        setNotifi({status : 'none', message : '', isAuth : true})
                        setTimeout(() => {setNotifi({status : 'success', message : 'Add Wedsite successfully',  isAuth : true})}, 50);
                        setTimeout(() => {
                            window.location.reload()
                        }, 1500);
                    } else {
                        setNotifi({status : 'none', message : ''})
                        setTimeout(() => {setNotifi({status : 'fail', message : 'Invalid login infomation', isAuth : true})}, 50);
                    }
            
                })
        } else {
            setNotifi({status : 'none', message : ''})
            setTimeout(() => {setNotifi({status : 'warning', message : "You haven't selected an image yet", isAuth : true})}, 50);
        }
    }
    return (
        <form onSubmit={() => handleSubmit()} id='fromaddwedsite'>
            <Notification status={notifi.status} message={notifi.message} isAuth={true} />
            <h2 className='title'><i className='bx bx-plus'></i> Add New Wedsite</h2>
            <div className='group'>
                <label>Title</label>
                <input type="text" class="form-control txt-title" placeholder="Title Of Wedsite"/>
            </div>
            <div className='group'>
                <label>URL</label>
                <input type="text" class="form-control txt-url" placeholder="URL Of Wedsite"/>
            </div>
            <div className='group'>
                <label>Image</label>
                <input ref={imageUser} type='file' accept=".jpg, .jpeg, .png"/>
            </div>
            <div className='group'>
                <button type="button" onClick={() => handleSubmit()} class="btn btn-primary">Add Wedsite</button>
            </div>
        </form>
    );
}

export default FormAddWedsite;