import React from 'react';
import Header from './Header'
import Content from './Content'
import Footer from './Footer'

function BaiUINhaHang(props) {
    return (
        <div className='container'>
            <Header />
            <Content />
            <Footer />
        </div>
    );
}

export default BaiUINhaHang;