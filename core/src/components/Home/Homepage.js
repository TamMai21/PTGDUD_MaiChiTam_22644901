import React from 'react';
import videoHompage from '../../assets/video-homepage3.mp4';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Homepage = (props) => {
    const account = useSelector(state => state.user.account)
    const navigate = useNavigate()

    const isAuthenticated = useSelector(state => state.user.isAuthenticated)

    console.log('isauthenticated: ', isAuthenticated, 'account: ', account);
    return (
        <div className='homepage-container'>
            <video autoPlay muted loop className=''>
                <source src={videoHompage} type='video/mp4' />
            </video>
            <div className='homepage-content'>
                <div className='title-1'>There's a better way to ask</div>
                <div className='title-2'>You don't want to make a boring form. And your audience won't answer one.</div>
                <div className='title-3'>
                    {!isAuthenticated ?
                        <button onClick={() => navigate('/login')}>Get's started. It's free</button>
                        :
                        <button onClick={() => navigate('/user')}>Start quiz now</button>
                    }

                </div>
            </div>
        </div>
    );
}

export default Homepage;