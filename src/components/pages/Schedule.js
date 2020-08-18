import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import 'react-calendar/dist/Calendar.css';

export default function Schedule() {

    const [apiEvent, setApiEventData] = useState([]);
    const [events, setEvents] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [choice, setChoice] = useState("");
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
        if (!isOpen) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }

        handleSelect(event)
    }

    const getEventData = () => {
        axios.get(`https://sleepless-api.herokuapp.com/events`, { withCredentials: true }
        )
            .then(res => {
                setApiEventData(res.data);
            })
            .catch(error => console.log("A request to your API has resulted in a failure. ", error));
    }

    const destructorEvent = () => {
        const dates = apiEvent.map(e => {
            return e.start
        })

        const allDates = dates.map(date => {
            return new Date(date);
        })
        setEvents(allDates);
    }

    useEffect(() => {
        getEventData()
        destructorEvent()

        if (choice === 'Invalid Date') {
            setStates()
        }
    }, [choice])

    const handleSelect = (event) => {
        const dateValue = new Date(event);
        setDay(dateValue.getDate());
        setMonth(dateValue.getMonth());
        setYear(dateValue.getFullYear());
        setChoice(dateValue.toString());
    }

    const setStates = () => {
        setChoice("");
    }

    return (
        <div className="calendar-container">
            <div className="calender">
                <Calendar
                    onChange={handleModalClose}
                    value={[choice]}
                    // defaultView="month"
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
                    </div>

                </Modal>
            </div>
        </div>
    )
}

