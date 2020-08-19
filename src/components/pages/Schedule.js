import React, { useState, useEffect } from 'react';
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

    const handleEventCheck = () => {
        let counter = 1;

        const allTitles = apiEvent.map(e => {

            if (new Date(e.date).toDateString() === choice) {
                console.log('date set');

                return <div className="title-container" key={counter++}> Event: {e.title}</div>
            }
        })

        const allTimes = apiEvent.map(e => {
            if (new Date(e.date).toDateString() === choice) {
                console.log('time set');

                return <div className="time-container" key={counter++}> Starts: {e.time}</div>
            }
        })

        setTime(allTimes);
        setTitle(allTitles);
    }

    const sendEvent = (event) => {
        event.preventDefault();

        console.log(event)
        axios.post("https://sleepless-api.herokuapp.com/events",
            buildForm(),
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get("access_token_cookie")}`,
                    'X-CSRF-TOKEN': `${Cookies.get("csrf_access_token")}`
                }, withCredentials: true
            })

            .then(res => {
                setIsOpen(false);
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
    }, [isOpen])

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

    return (
        <div className="calendar-container">
            <div className="calender">
                <Calendar
                    onChange={handleModalClose}
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
                            <button>Add Event</button>
                        </form>
                    </div>

                </Modal>
            </div>
        </div>
    )
}

