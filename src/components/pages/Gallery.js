import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import ImageCard from '../gallery-items/ImageCard';
import * as Cookies from 'js-cookie';

export default function Gallery() {
    const [image, setImageData] = useState([]);
    const [imgName, setImgName] = useState([]);
    const [imgUrl, setImgUrl] = useState([]);
    const [imgId, setImgId] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [submit, setSubmit] = useState("");
    const [status, setStatus] = useState("");


    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    };

    const addModal = (submitType) => {
        return (
            <form className="add-delete-image-form" action="/images" type="submit" onSubmit={submitAdd}>

                <input type="text" placeholder="URL" name="url" onChange={event => handleChange(event)} />
                <input type="text" placeholder="Title" name="name" onChange={event => handleChange(event)} />
                <button>Submit</button>

            </form>
        )
    }

    const deleteModal = () => {
        return (
            <form className="add-delete-image-form" action="/images" type="submit" onSubmit={submitDelete}>

                <div>Are you sure?</div>
                <button onClick={(event) => submitDelete(event)}>YES</button>

            </form>
        )
    }

    const submitDelete = (event) => {
        event.preventDefault();

        axios.delete(`http://localhost:5000/images/${imgId}`,
            buildForm(),
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get("access_token_cookie")}`,
                    'X-CSRF-TOKEN': `${Cookies.get("csrf_access_token")}`
                }, withCredentials: true
            })

            .then(res => {
                setStatus('Successful delete');
                setIsOpen(false);
            })
            .catch(error => setStatus('Unsuccessful delete'));
    }

    const submitAdd = (event) => {
        event.preventDefault();

        axios.post("http://localhost:5000/images",
            buildForm(),
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get("access_token_cookie")}`,
                    'X-CSRF-TOKEN': `${Cookies.get("csrf_access_token")}`
                }, withCredentials: true
            })

            .then(res => {
                setStatus('Successful request');
                setIsOpen(false);
            })
            .catch(error => setStatus('Unsuccessful request'));

    }
    const buildForm = () => {
        var formData = new FormData();

        formData.append("name", imgName);
        formData.append("url", imgUrl);

        return formData;

    }
    const handleChange = (event) => {
        if (event.target.name === "url") {
            setImgUrl(event.target.value);
        } else {
            setImgName(event.target.value);
        }
    }
    const getImageData = () => {

        axios.get("http://localhost:5000/images")
            .then(res => {
                setImageData(res.data);
                setSubmit("");

            })
            .catch(error => console.log("A request to your API has resulted in a failure. ", error))
    }

    const handleImageButton = (submitType, id) => {
        setIsOpen(true);

        if (submitType === 'add') {
            console.log('add modal')
            setSubmit(submitType)
        } else {
            console.log('delete modal')
            setSubmit(submitType)
            setImgId(id);
        }
    }

    function handleModalClose() {
        setIsOpen(false);
    }

    useEffect(() => {
        getImageData()
    }, [isOpen])

    return (
        <div className="gallery-main-container">
            <button className="btn-add btn" onClick={() => handleImageButton("add")}>Add</button>

            <Modal
                isOpen={isOpen}
                onRequestClose={handleModalClose}
                style={customStyles}
                ariaHideApp={false}
            >
                <div>{submit === 'add' ? <h1>Add</h1> : <h1>Delete</h1>}</div>
                {submit === "add" ? addModal() : deleteModal()}

            </Modal>


            <div className="image-view-wrapper">
                <div className="gallery-title">
                    <h1>Gallery</h1>
                </div>
                <ImageCard imageInfo={image} handleImageButton={handleImageButton} />
            </div>
        </div>)
}

