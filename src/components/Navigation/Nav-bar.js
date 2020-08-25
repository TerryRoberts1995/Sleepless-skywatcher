import React, { useState, useEffect } from 'react';
import { A } from 'hookrouter';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Navbar() {

    const useWindowSize = () => {

        const [windowSize, setWindowSize] = useState({
            width: undefined,
            height: undefined,
        });

        useEffect(() => {

            function handleResize() {

                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }

            window.addEventListener("resize", handleResize);

            handleResize();

            return () => window.removeEventListener("resize", handleResize);
        }, []);

        return windowSize;
    }


    const size = useWindowSize();

    return (
        <div className="navbar-wrapper">
            <div className="logo-container">
                <h1>Sleepless Skywatcher</h1>
            </div>

            <div className="nav-link-wrapper">

                <div className="mobile-nav-button">
                    <FontAwesomeIcon onClick={} icon="bars" />
                </div>

                <div className="nav-link">
                    <A className="link" href="/">Home</A>
                </div>
                <div className="nav-link">
                    <A className="link" href="/schedule">Schedule</A>
                </div>
                <div className="nav-link">
                    <A className="link" href="/gallery">Gallery</A>
                </div>
                <div className="nav-link">
                    <A className="link" href="/contact">Contact</A>
                </div>
            </div>
        </div>
    )
}