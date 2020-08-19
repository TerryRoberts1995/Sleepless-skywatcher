import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import CarouselCard from './CarouselCard'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function Carousel() {

    var settings = {
        dots: true,
        dotsClass: "slick-dots",
        autoplay: true,
        autoplaySpeed: 5000,
    };

    const renderImages = () => {
        return [
            <div>
                <img src='https://images.unsplash.com/photo-1456154875099-97a3a56074d3' alt="image-one" />

            </div>,
            <div>
                <img src="https://images.unsplash.com/photo-1543722530-d2c3201371e7" alt="image-two" />

            </div>,
            <div>
                <img src="https://images.unsplash.com/photo-1417577097439-425fb7dec05e" alt="image-three" />

            </div>,
            <div>
                <img src="https://images.unsplash.com/photo-1504333638930-c8787321eee0" alt="image-four" />
            </div>
        ]

    }

    return (
        <div className="container">
            <div className="floating-text">

                <div className="icon">

                </div>
                <div className="carousel-text">
                    <h3>A trip into the night sky</h3>
                </div>

            </div>

            <Slider {...settings}>
                {renderImages()}

            </Slider>
        </div>
    )
}