import React from 'react';
import '../assest/Content.scss';
import heroImg from '../assest/img/hero-cooking.jpg';
import saladImg from '../assest/img/salad-caprese.jpg';
import pastaImg from '../assest/img/spaghetti.jpg';
import lettuceImg from '../assest/img/lettuce.jpg';
import sushiImg from '../assest/img/sushi.jpg';
import steakImg from '../assest/img/steak.jpg';
import bakedImg from '../assest/img/baked-avocado.jpg';
import curryImg from '../assest/img/curry.jpg';
import lasagnaImg from '../assest/img/lasagna.jpg';
import stickyRiceImg from '../assest/img/sticky-rice.jpg';
import smoothieImg from '../assest/img/smoothie.jpg';
import latteImg from '../assest/img/latte.jpg';
import noodlesImg from '../assest/img/noodles.jpg';

const Content = () => {
    return (
        <div className="content px-3">

            {/* Hero Section */}
            <section className="hero">
                <img src={heroImg} alt="Cooking Hero" className="hero-img" />
                <div className="hero-text">
                    <h1>Salad Caprese</h1>
                    <p>Fresh, vibrant, and delicious. Try our new summer Salad Caprese with cherry tomatoes, basil, and fresh mozzarella.</p>
                    <button className="btn">Read Recipe</button>
                </div>
            </section>

            {/* This Summer Recipes */}
            <section className="summer-recipes">
                <h2>This Summer Recipes</h2>
                <p>We have all your Independence Day sweets covered.</p> {/* 👈 thêm dòng mô tả */}
                <div className="card-grid">
                    <img src={saladImg} alt="Salad" />
                    <img src={pastaImg} alt="Spaghetti" />
                    <img src={lettuceImg} alt="Lettuce Wrap" />
                    <img src={sushiImg} alt="Sushi Rolls" />
                </div>
            </section>

            {/* Recipes With Videos */}
            <section className="video-recipes">
                <h2>Recipes With Videos</h2>
                <p>Cooking Up Culinary Creations with Step-by-Step Videos.</p> {/* 👈 thêm dòng mô tả */}
                <div className="card-grid">
                    <img src={steakImg} alt="Steak" />
                    <img src={bakedImg} alt="Baked Avocado" />
                    <img src={curryImg} alt="Curry" />
                    <img src={lasagnaImg} alt="Lasagna" />
                </div>
            </section>


            {/* Editor's Pick */}
            <section className="editors-pick">
                <h2>Editor's Pick</h2>
                <div className="card-list">
                    <div className="card">
                        <img src={stickyRiceImg} alt="Sticky Rice" />
                        <h3>Stuffed Sticky Rice Ball</h3>
                        <p>By Jenny Wang</p>
                    </div>
                    <div className="card">
                        <img src={smoothieImg} alt="Smoothie" />
                        <h3>Strawberry Smoothie</h3>
                        <p>By Michelle Edwards</p>
                    </div>
                    <div className="card">
                        <img src={latteImg} alt="Latte" />
                        <h3>Latte Art</h3>
                        <p>By John Coffee</p>
                    </div>
                    <div className="card">
                        <img src={noodlesImg} alt="Fried Noodles" />
                        <h3>Butter Fried Noodles</h3>
                        <p>By Chef Anna</p>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Content;
