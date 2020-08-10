import React from 'react';
import Carousel from '../widgets/Carousel'

export default function Home() {
    return (
        <div className="homepage-container">
            <div className="carousel-wrapper">
                <Carousel />
            </div>

            <div className="content-body-wrapper">
                <div className="content-image">
                    <img src="https://images.unsplash.com/photo-1548124771-9f2040b66df8" />
                </div>

                <div className="content-description">
                    <p>Content Goes here!</p>
                </div>
            </div>
        </div>
    )
}
