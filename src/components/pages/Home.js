import React from 'react';
import Carousel from '../widgets/Carousel'

export default function Home() {
    return (
        <div className="homepage-container">
            <div className="carousel-wrapper">
                <Carousel />
            </div>

            <div className="all-content">
                <div className="content-body-wrapper">
                    <div className="content-body">
                        <div className="content-image">
                            <img src="https://images.unsplash.com/photo-1548124771-9f2040b66df8" alt="content-one" />
                        </div>

                        <div className="content-description">
                            <p>Hello! My name is Jessica. I graduated from The University of Texas at Austin with a degree in Astronomy with minors in Museum Studies and Classical Civilization. I have worked with telescopes on UT's campus in Austin and McDonald Observatory in West Texas. I am currently working at Reimers Observatory in Dripping Springs when not using my own telescopes. I would love to bring the universe to you and explore the wonders of the night sky!</p>
                        </div>
                    </div>

                    <div className="body-middle-image">

                    </div>

                    <div className="content-body">
                        <div className="content-description">
                            <p>I am a also a photographer of all that is space related. If you like a particular object in the sky and want a photo ask me! I have different options that will work for you! If we don't catch an object for you, set up a notifications for when that object is back in the visible sky, that way we can get you that photo.</p>
                        </div>
                        <div className="content-image">
                            <img src="https://images.unsplash.com/photo-1540945573388-fb1aa7ecb444" alt="content-two" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
