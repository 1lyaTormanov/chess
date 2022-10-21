import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './rootStyles.sass';
import {Provider} from "react-redux";
import {connect} from "./saga/connect";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <Provider store={connect}>
          <App />
      </Provider>
  </React.StrictMode>
);

reportWebVitals();
