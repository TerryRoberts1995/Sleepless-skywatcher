import React from 'react';
import Home from '../pages/Home';
import Schedule from '../pages/Schedule';

const routes = {
    "/": () => <Home />,
    "/schedule": () => <Schedule />
}

export default routes;
