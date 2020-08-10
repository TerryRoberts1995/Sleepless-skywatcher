import React from 'react';
import Carousel from '../widgets/Carousel'

export default function Home() {
    return (
        <div className="homepage-container">
            <div className="carousel-wrapper">
                <Carousel />
            </div>

            <div className="content-body-wrapper">
                <div className="page-content-wrapper">
                    <div className="content-image">
                        <h1>Image goes here!</h1>
                    </div>

                    <div className="content-description">
                        <p>Content Goes here!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

