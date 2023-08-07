
import { useEffect, useState } from 'react';
import './wedsiteitem.scss'
import axios from 'axios';

function WedsiteItem({wed, active, currentUser}) {
    const [user, setUser] = useState()
    useEffect(() => {
        axios.get(`https://uwd-node.vercel.app/v1/user/get-user?id=${wed.user_id}`)
            .then (res => {
                setUser(res.data.currentUser._doc)
            })
    },[])

    const handleUpdateLike = () => {
        const likes = currentUser.likes
        if (likes.indexOf(wed._id) !== -1) {
            const arr = likes.filter(item => item !== wed._id)
            axios.put('https://uwd-node.vercel.app/v1/user/update-likes', {likes : arr}, {headers : {token :  'Bearer ' + JSON.parse(localStorage.getItem('current-user')).token}})
                .then (res => {
                    if (res.data.code == 200) {
                        axios.put('https://uwd-node.vercel.app/v1/wed/update-like', {id : wed._id, likes : wed.like - 1})
                        .then (res => {
                            if (res.data.code == 200) {
                                setTimeout(() => {window.location.reload()}, 1000)
                            }})
                    }
                })
        } else {
            likes.push(wed._id)
            axios.put('https://uwd-node.vercel.app/v1/user/update-likes', {likes : likes}, {headers : {token :  'Bearer ' + JSON.parse(localStorage.getItem('current-user')).token}})
                .then (res => {
                    if (res.data.code == 200) {
                        axios.put('https://uwd-node.vercel.app/v1/wed/update-like', {id : wed._id, likes : wed.like + 1})
                        .then (res => {
                            if (res.data.code == 200) {
                                setTimeout(() => {window.location.reload()}, 1000)
                            }})
                    }
                })
        }
    }
    const handleUpdateView = () => {
        axios.put('https://uwd-node.vercel.app/v1/wed/update-view', {id : wed._id, view : wed.view + 1})
            .then (res => {
                if (res.data.code == 200) {
                    setTimeout(() => {window.location.reload()}, 1000)
                }})
    }

    const handleDeleteWed = () => {
        axios.delete('https://uwd-node.vercel.app/v1/wed/delete-wedsite', { data: { id: wed._id } })
        .then (res => {
            console.log(res.data)
            if (res.data.code == 200) {
                setTimeout(() => {window.location.reload()}, 1000)
            }})
    }
    return (
        <div className='wedsiteitem col-lg-3'>
            <div className='col-lg-12 image'>
                <div className='box'></div>
                <img width={'100%'} src={wed.url_image} />
                <div className='info'>
                    <p className='title-wedsite'>{wed.title}</p>
                    <div>
                        {wed.url != '' ? <button className='btn-visit' onClick={() => handleUpdateView()}>
                            <a target='_blank' style={{color : 'black'}} href={wed.url}>
                                <i className="fa-solid fa-eye"></i>
                            </a>
                        </button>:<></>}
                        {(currentUser && user) ? 
                            currentUser._id == user._id ? 
                            (<button className='btn-visit' onClick={() => handleDeleteWed()}>
                                <i style={{fontSize : '17px', color : 'red'}} className="fa-solid fa-xmark"></i>
                                </button>) : <></> : ''
                        }
                    </div>
                </div>
            </div>
            <div className='col-lg-12 info-user'>
                <div className='logo'>
                    <img width={'100%'} src={user ? user.URL_Avatar : ''} />
                </div>
                <div className='user-name'>
                    {user ? user.name : ''}
                </div>
                <div className='analysis'>
                    <div className='like item'>
                        <i onClick={() => handleUpdateLike()} className={active == true ? "fa-solid fa-heart heart active" : "fa-solid fa-heart heart"}></i>
                        <span>{wed.like}</span>
                    </div>
                    <div className='view item'>
                        <i className="fa-regular fa-eye"></i>
                        <span>{wed.view}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WedsiteItem;