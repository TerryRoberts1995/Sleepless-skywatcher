import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function Carousel() {
    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);


    var settings = {
        dots: true,
        dotsClass: "slick-dots",
        autoplay: true,
        autoplaySpeed: 5000,
    };

    const getImages = () => {
        axios.get('https://sleepless-api.herokuapp.com/images', { withCredentials: true })
            .then(res => {
                setImages(res.data)
            })
            .catch(error => console.log(error));
    }

    const getUrls = () => {
        const allUrls = images.map(image => {
            return image.url;
        })

        setUrls(allUrls);
    }

    useEffect(() => {
        getImages();
        getUrls();
    }, [images])

    const renderImages = () => {
        const randomNumber = Math.floor(Math.random() * urls.length);
        return [
            <div>
                <img src={urls[0]} alt="i-one" />

            </div>,
            <div>
                <img src={urls[1]} alt="i-two" />

            </div>,
            <div>
                <img src={urls[2]} alt="i-three" />

            </div>,
            <div>
                <img src={urls[3]} alt="i-four" />
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