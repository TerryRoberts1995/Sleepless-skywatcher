import React from 'react';
import { A } from 'hookrouter';


export default function Navbar() {
    return (
        <div className="navbar-wrapper">
            <div className="logo-container">
                <h1>Sleepless Skywatcher</h1>
            </div>

            <div className="nav-link-wrapper">
                <div className="nav-link">
                    <A href="/">Home</A>
                </div>
                <div className="nav-link">
                    <A href="/schedule">Schedule</A>
                </div>
                <div className="nav-link">
                    <A href="/gallery">Gallery</A>
                </div>
                <div className="nav-link">
                    <A href="/contact">Contact</A>
                </div>
            </div>
        </div>
    )
}