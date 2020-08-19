import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import 'react-calendar/dist/Calendar.css';

export default function Schedule() {

    const [apiEvent, setApiEventData] = useState([]);
    // const [events, setEvents] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [choice, setChoice] = useState("");
    const [title, setTitle] = useState("");
    const [trueChoice, setTrueChoice] = useState("");
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(0);
    const [day, setDay] = useState(0);

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

    function handleModalClose(event) {
        setTrueChoice(choice)

        if (!isOpen) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }

        handleSelect(event)
    }

    const handleEventCheck = () => {
        let counter = 1;
        const allTitles = apiEvent.map(e => {

            console.log(new Date(e.date).toDateString(), 'event') // Test
            console.log(choice, 'choice') // Test

            if (new Date(e.date).toDateString() === choice) {
                return <div key={counter++}>{e.title}</div>
            }
        })

        setTitle(allTitles);
    }

    const getEventData = () => {
        axios.get(`https://sleepless-api.herokuapp.com/events`, { withCredentials: true }
        )
            .then(res => {
                setApiEventData(res.data);
            })
            .catch(error => console.log("A request to your API has resulted in a failure. ", error));
    }

    // const destructorEvent = () => {
    //      setEvents(apiEvents);
    // }

    useEffect(() => {
        getEventData()
        handleEventCheck()


        if (choice === 'Invalid Date') {
            setStates()
        }
    }, [isOpen])

    const handleModalChange = (event) => {
        console.log(event.target.value)
    }

    const handleSelect = (event) => {
        const dateValue = new Date(event);
        setDay(dateValue.getDate());
        setMonth(dateValue.getMonth());
        setYear(dateValue.getFullYear());
        setChoice(dateValue.toDateString());
    }

    const setStates = () => {
        setChoice(trueChoice);
        setDay(0);
        setMonth(0);
        setYear(0);
    }



    // console.log(choice)
    return (
        <div className="calendar-container">
            <div className="calender">
                <Calendar
                    onChange={handleModalClose}
                    // onClickDay={handleEventCheck}
                    value={choice ? new Date(choice) : new Date()}
                    defaultView={'month'}
                    defaultActiveStartDate={new Date()}
                    view="month"
                    tileContent={'Click for Info...'}
                />
            </div>


            <div className="calender-modal">
                <Modal
                    isOpen={isOpen}
                    onRequestClose={handleModalClose}
                    style={customStyles}
                    ariaHideApp={false}
                >
                    <div className="modal-wrapper">
                        <div>{`${month + 1}/${day}/${year}`}</div>


                        <form className="add-delete-image-form" action="/images" type="submit">

                            <div className="form-input-wrapper">
                                <div className="add-input">
                                    <input className="modal-inputs" type="text" placeholder="Event Title" name="title" onChange={event => handleModalChange(event)} />
                                </div>

                                <div className="add-input">
                                    <input className="modal-inputs" type="time" placeholder="Event Time" name="time" onClick={(event) => console.log(event.target.value)} />
                                </div>
                            </div>
                            <div className="events-container">
                                {title}
                            </div>
                        </form>
                    </div>

                </Modal>
            </div>
        </div>
    )
}

