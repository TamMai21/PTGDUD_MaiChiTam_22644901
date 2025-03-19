import React from 'react'
import logo from '../assets/img/chefify.png'
import check from '../assets/img/check.png'
import avatar from '../assets/img/avatar.png'
import '../assets/Header.scss'

const Header = () => {
    return (
        <div className='header container d-flex'>
            <div className='left'>
                <div className='logo'>
                    <img src={logo} className='img' />
                    <input className='input' placeholder='Salad' />
                </div>
            </div>
            <div className='right'>
                <ul className='right-ul'>
                    <li className='li-item'>What to cook</li>
                    <li className='li-item'>Recipes</li>
                    <li className='li-item'>Ingredients</li>
                    <li className='li-item'>Occasions</li>
                    <li className='li-item'>About us</li>
                </ul>
                <div className='avt d-flex'>
                    <div className='receive-box'>
                        <img src={check} className='check' />
                        <p className='text'>Your Recipe Box</p>
                    </div>
                    <img src={avatar} className='avatar' />
                </div>
            </div>
        </div>
    )
}

export default Header