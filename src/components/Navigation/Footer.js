import React from 'react';
import { A } from 'hookrouter';


export default function Footer() {
    return (
        <div className="footer-wrapper">

            <div className="footer-link-wrapper">
                <div className="footer-nav-link">
                    <A className="link" href="/">Home</A>
                </div>
                <div className="footer-nav-link">
                    <A className="link" href="/schedule">Schedule</A>
                </div>
                <div className="footer-nav-link">
                    <A className="link" href="/gallery">Gallery</A>
                </div>
                <div className="footer-nav-link">
                    <A className="link" href="/contact">Contact</A>
                </div>
            </div>

            <div className="copy-right">
                Terry Roberts &#169; 2020
            </div>
        </div>
    )
}