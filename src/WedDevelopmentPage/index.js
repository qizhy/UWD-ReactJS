
import { useEffect } from 'react';
import './weddevelopment.scss'
import WedsiteItem from './WedsiteItem';
import axios from 'axios';
import { useState } from 'react';

function WedDevelopment({user}) {

    const [weds, setWeds] = useState([])
    useEffect(() => {
        axios.get('https://uwd-node.vercel.app/v1/wed/get-all-wedsite')
            .then(res => {
                setWeds(res.data.weds)
            })
    }, [])

    return (
        <div id='wed-development'>
            <div className='title'>
                Wed UI Design
            </div>
            <div className='description'>
                Please share your wedsite, so everyone can see them
            </div>
            <div className='wedsites col-lg-12'>
                {weds.map((wed, index) => {
                    let liked = false;
                    if (user) {
                        user.likes.forEach(item => {
                            if (item == wed._id) {
                                liked = true
                            }
                        })
                    }
                    return <WedsiteItem key={index} wed={wed} active={liked} currentUser={user}/>
                })}
            </div>
        </div>
    );
}

export default WedDevelopment;