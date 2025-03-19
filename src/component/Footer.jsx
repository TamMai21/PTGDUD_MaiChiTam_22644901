import React from 'react'
import '../assets/Footer.scss'
import logoWhite from '../assets/img/chefifywhite.png'


const Footer = () => {
  return (
    <div className='footer-container'>
      <div className="left">
        <div className="info">
          <p className="title">About us</p>
          <p className='content'>Mai Chi Tam - 22644901</p>
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
      </div>
    </div>
  )
}

export default Footer