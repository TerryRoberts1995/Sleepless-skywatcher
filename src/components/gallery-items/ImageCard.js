import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
export default function ImageCard(props) {
    let counter = 0;

    const handleClick = (event) => {
        console.log(event.target)
    }

    const image = props.imageInfo.map(obj => {
        counter++
        const { name, url, _id } = obj;

        const trueImageId = _id.$oid;

        return (
            <div key={counter + 1} id={trueImageId} className="image-wrapper" onClick={(event) => handleClick(event)}>
                <div className="image-url">
                    <img src={`${url}`} alt={`logo${counter}`} />
                </div>

                <div className="image-title" >
                    <h2>{`${name}`}</h2>
                    <button onClick={() => props.handleImageButton("delete", trueImageId)}><FontAwesomeIcon id="minus-btn" icon="minus-square" /></button>
                </div>
            </div>
        )
    })
    return <div className="main-image-container">{image}</div>
}