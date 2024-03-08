import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ReactGA from "react-ga4";
import { BrowserRouter } from "react-router-dom";

if (process.env.REACT_APP_GA_TRACKING_ID) {
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);
}
 
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
 