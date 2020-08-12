import React from "react";
import ReactDOM from "react-dom";
import { useRoutes } from "hookrouter";
import "./styles/main.scss";
import routes from "./components/Navigation/routes";
import Navbar from './components/Navigation/Nav-bar';

function App() {
  const routeResult = useRoutes(routes);
  return (
    <div className="App">
      <Navbar />
      {routeResult}
      {/* add a footer component */}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
