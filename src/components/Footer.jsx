import React from 'react'
import '../assest/Footer.scss'
import logoWhite from '../assest/img/chefifywhite.png'


const Footer = () => {
    return (
        <div className='footer-container'>
            <div className="left">
                <div className="info">
                    <p className="title">About us</p>
                    <p className='content'>Welcome to our website, a wonderful plae to explore and learn how to cook like a pro</p>
                    <div className="send">
                        <input type="text" placeholder='Enter your email' />
                        <button className='btn'>Send</button>
                    </div>
                </div>
                <div className="policy">
                    <img src={logoWhite} className='img' alt="" />
                    <div className="d-flex">
                        <p>2023 Chefify Company</p>
                        <p>Terms of Service | privacy policy</p>
                    </div>
                </div>
            </div>
            <div className="right row">
                <div className="col-6 left">
                    <div className="item">
                        <p className="title">Learn More</p>
                        <p>Our Cooks</p>
                        <p>See Our Features</p>
                        <p>FAQ</p>
                    </div>
                    <div className="item">
                        <p className="title">Shop</p>
                        <p>Gift Subscription</p>
                        <p>Send Us Feedback</p>
                    </div>
                </div>
                <div className="col-6 right">
                    <div className="item">
                        <p className="title">Recipes</p>
                        <p>What to Cook This Week</p>
                        <p>Pasta</p>
                        <p>Dinner</p>
                        <p>Healthy</p>
                        <p>Vegetarian</p>
                        <p>Vegan</p>
                        <p>Christmas</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer