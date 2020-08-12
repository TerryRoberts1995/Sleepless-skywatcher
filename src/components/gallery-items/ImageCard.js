import React from 'react';

export default function ImageCard(props) {
    let counter = 1;
    const image = props.imageInfo.map(obj => {
        counter++
        const { name, url } = obj;

        return (
            <div key={counter} className="image-wrapper">
                <div className="image-url">
                    <img src={`${url}`} />
                </div>

                <div className="image-title">
                    <h2>{`${name}`}</h2>
                </div>
            </div>
        )
    })
    return <div className="main-image-container">{image}</div>
}