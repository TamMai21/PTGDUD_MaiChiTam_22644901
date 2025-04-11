import React from 'react';
import Header from '../components/Header'
import Content from '../components/Content'
import Footer from '../components/Footer'

function Homepage(props) {
    return (
        <div className='container'>
            <Header />
            <Content />
            <Footer />
        </div>
    );
}

export default Homepage;