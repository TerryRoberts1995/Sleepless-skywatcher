import React from 'react';
import Home from '../pages/Home';
import Schedule from '../pages/Schedule';
import Gallery from '../pages/Gallery';
import Contact from '../pages/Contact';

const routes = {
    "/": () => <Home />,
    "/schedule": () => <Schedule />,
    "/gallery": () => <Gallery />,
    "/contact": () => <Contact />
}

export default routes;
