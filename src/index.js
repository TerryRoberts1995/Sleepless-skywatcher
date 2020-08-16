import React from "react";
import ReactDOM from "react-dom";
import { useRoutes } from "hookrouter";
import Icons from './icons';
import "./styles/main.scss";
import routes from "./components/Navigation/routes";
import Navbar from './components/Navigation/Nav-bar';
import Footer from './components/Navigation/Footer';

function App() {
  Icons();
  const routeResult = useRoutes(routes);
  return (
    <div className="App">
      <Navbar />
      {routeResult}
      <Footer />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
