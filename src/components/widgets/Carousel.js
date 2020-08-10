import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function Carousel() {

    var settings = {
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    return (
        <div className="container">
            <Slider {...settings}>
                <div>
                    <img src='https://images.unsplash.com/photo-1456154875099-97a3a56074d3' alt="image-one" />
                </div>
                <div>
                    <img src="https://images.unsplash.com/photo-1543722530-d2c3201371e7" alt="image-two" />
                </div>
                <div>
                    <img src="https://images.unsplash.com/photo-1417577097439-425fb7dec05e" alt="image-three" />
                </div>
                <div>
                    <img src="https://images.unsplash.com/photo-1504333638930-c8787321eee0" alt="image-four" />
                </div>
            </Slider>
        </div>
    )
}