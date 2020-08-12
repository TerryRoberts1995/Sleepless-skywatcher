import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageCard from '../gallery-items/ImageCard';

export default function Gallery() {
    const [image, setImageData] = useState([]);

    const getImageData = () => {
        axios.get("http://localhost:5000/api/images")
            .then(res => setImageData(res.data))
            .catch(error => console.log("A request to your API has resulted in a failure. ", error))
    }


    useEffect(() => {
        getImageData()
    }, [])

    return (
        <div className="gallery-main-container">
            <div className="image-view-wrapper">
                <div className="gallery-title">
                    <h1>Gallery</h1>
                </div>
                <ImageCard imageInfo={image} />
            </div>
        </div>)
}

