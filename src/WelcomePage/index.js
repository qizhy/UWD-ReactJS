
import image from './welcome.png'
import whale from './whale.png'
import text from  './text.png'
import './welcome.scss'
import { useEffect, useRef, useState } from 'react'

function Welcome() {
    let top = true
    const intervalRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
          const whale = document.querySelector('.whale');
          const text = document.querySelector('.text');
      
          if (whale && text) {
            whale.style.right = '13%';
            whale.style.opacity = 1;
            text.style.left = '13%';
            text.style.opacity = 1;
      
            intervalRef.current = setInterval(() => {
              if (top) {
                whale.style.top = '15.5%';
                top = false;
              } else {
                whale.style.top = '14.5%';
                top = true;
              }
            }, 1500);
          }
        }, 100);
      
        return () => {
          clearInterval(intervalRef.current);
        };
      }, []);

      
    return (
        <div id="welcome" className="col-lg-12">
            <img src={image}  width='100%'/>
            <img src={whale} className='whale' width='32%' />
            <img src={text} className='text' width='32%' />
        </div>
    );
}

export default Welcome;