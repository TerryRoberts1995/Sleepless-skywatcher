import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Contact() {
    return (
        <div className="contact-page-wrapper">

            <div className="title">
                Have a question?
            </div>

            <div className="contact-detail-wrapper">

                <div className="contact-link">
                    <h2>Instructor:  Jessica Wigley</h2>
                </div>

                <div className="contact-link">
                    <h2>Phone:  (210)-555-3983</h2>
                </div>

                <div className="contact-link">
                    <h2>Email: SleeplessSkywatcher@gmail.com</h2>
                </div>

                <div className="icons-wrapper">
                    <div className="icon">
                        <FontAwesomeIcon icon={["fab", "facebook"]} />
                    </div>

                    <div className="icon">
                        <FontAwesomeIcon icon={["fab", "instagram"]} />
                    </div>
                </div>
            </div>
        </div>
    )
}

