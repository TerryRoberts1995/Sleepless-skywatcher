import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import 'react-calendar/dist/Calendar.css';
import * as Cookies from 'js-cookie';

export default function Schedule() {

    const [apiEvent, setApiEventData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [choice, setChoice] = useState("");
    const [trueChoice, setTrueChoice] = useState("");
    const [title, setTitle] = useState("");
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(0);
    const [day, setDay] = useState(0);
    const [newTime, setNewTime] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [newDate, setNewDate] = useState("");
    const [contentTileDate, setContentTitleDate] = useState([]);
    const [time, setTime] = useState("");

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

    const handleDelete = (id) => {
        axios.delete(`https://sleepless-api.herokuapp.com/events/${id}`, { withCredentials: true })
            .then(res => console.log(res.data))
            .catch(error => console.log("An error has occured during your delete request.", error))
    }

    const handleEventCheck = () => {
        let counter = 1;

        const allTitles = apiEvent.map(e => {

            if (new Date(e.date).toDateString() === choice) {
                return (
                    <div className="title-container" key={counter++}>
                        <div className="event-list">
                            Event: {e.title}
                        </div>

                        <FontAwesomeIcon className="event-delete" icon="minus-square" onClick={() => handleDelete(e._id.$oid)} />
                    </div>)
            }
        });

        const allTimes = apiEvent.map(e => {
            if (new Date(e.date).toDateString() === choice) {
                return <div className="time-container" key={counter++}> Starts: {e.time}</div>
            }
        });

        const allDates = apiEvent.map(e => {
            return e.date
        });

        setContentTitleDate(allDates)
        setTime(allTimes);
        setTitle(allTitles);
    }

    const sendEvent = (event) => {
        event.preventDefault();

        axios.post("https://sleepless-api.herokuapp.com/events",
            buildForm(),
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get("access_token_cookie")}`,
                    'X-CSRF-TOKEN': `${Cookies.get("csrf_access_token")}`
                }, withCredentials: true
            })

            .then(res => {
            })
            .catch(error => console.log('You api request has failed', error));
    }

    const getEventData = () => {

        axios.get(`https://sleepless-api.herokuapp.com/events`, { withCredentials: true }
        )
            .then(res => {
                setApiEventData(res.data);
            })
            .catch(error => console.log("A request to your API has resulted in a failure. ", error));
    }

    useEffect(() => {
        getEventData()
        handleEventCheck()

        if (choice === 'Invalid Date') {
            setStates()
        }
    }, [apiEvent])

    const handleModalChange = (event) => {

        const trueDate = new Date(choice).toString();

        if (event.target.name === "title") {
            setNewTitle(event.target.value);
            setNewDate(trueDate);
        }
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

    const buildForm = () => {
        var formData = new FormData();

        formData.append("title", newTitle);
        formData.append("date", new Date(choice));
        formData.append("time", newTime);

        return formData;

    }

    const handleTime = (event) => {
        setNewTime(event.target.value);
        setTime(event.target.value);
    }

    const handleTiles = (props) => {
        let counter = 1;
        if (contentTileDate.length) {
            return contentTileDate.map(eventDate => {
                if (props.date.toString() === eventDate) {

                    return <div key={counter++} className="view-events">{apiEvent.map(title => {
                        if (props.date.toString() === title.date) {
                            return <div className="modal-title-display" key={counter++}>{title.title}</div>
                        } else {

                        }
                    })}</div>
                } else {
                    return null
                }
            })
        } else {
            return <div>No Data</div>
        }
    }

    return (
        <div className="calendar-container">
            <div className="calender">
                <Calendar
                    onChange={handleModalClose}
                    value={choice ? new Date(choice) : new Date()}
                    defaultView={'month'}
                    defaultActiveStartDate={new Date()}
                    tileContent={(props) => handleTiles(props)}
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
                        <div className="date-display">{`${month + 1}/${day}/${year}`}</div>


                        <form className="add-delete-image-form" action="/events" type="submit" onSubmit={sendEvent}>

                            <div className="form-input-wrapper">
                                <div className="add-input">
                                    <input className="modal-inputs" type="text" placeholder="Event Title" name="title" onChange={(event) => handleModalChange(event)} />
                                </div>

                                <div className="add-input">
                                    <input className="modal-inputs" type="time" placeholder="Event Time" name="time" onChange={(event) => { handleTime(event) }} />
                                </div>
                            </div>
                            <div className="events-container">
                                <div className="times">
                                    {time}
                                </div>

                                <div className="titles">
                                    {title}
                                </div>
                            </div>
                            <button className="add-event-btn">Add Event</button>
                        </form>
                    </div>

                </Modal>
            </div>
        </div>
    )
}

// First version complete